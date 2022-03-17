from pymongo import MongoClient
import pandas as pd
import numpy as np
from arch import arch_model
from scipy.stats import norm
from scipy import random
from datetime import date
import yfinance as yf
import schedule
import time


def job():

    client = MongoClient(
        "mongodb+srv://jakec:PvGzi123@jakelearningpath.06pfv.mongodb.net/Finana?retryWrites=true&w=majority")
    db = client.get_database('Finana')
    # get Collections
    clcttl = db.tickerslist  # tickers list
    clct = db.findata  # the data

    # Assign todat's date
    tdate = date.today().strftime('%Y%m%d')

    def symbolIsExist(s):
        if clct.find_one({'Symbol': s}) != None:
            return True
        else:
            return False

    def tDateIsExist(s, td):
        for i in clct.find_one({"Symbol": s})['HisData'][-1:]:
            if i['Date'] == td:
                return True
            else:
                return False

    def cal_var(s):
        print('We are going to compute {} today\'s Var'.format(s))

        msft = yf.Ticker(s)
        df = msft.history(period="max")
        df.drop(columns=['Open', 'High', 'Low', 'Volume',
                'Dividends', 'Stock Splits'], inplace=True)
        df = df[::-1].reindex()
        df.reset_index(inplace=True)
        df['Log_Return'] = np.log(df["Close"]/df["Close"].shift(-1))*100
        df.dropna(inplace=True)

        print('Start to calculate the GARCH-MCS VAR')
        am = arch_model(df['Log_Return'], mean='zero')
        res = am.fit(disp=0)

        omega = res.params[0]
        alpha = res.params[1]
        beta = res.params[2]
        df['GVol'] = np.nan

        df.loc[(len(df)-64), 'GVol'] = df.loc[(len(df) - 63)                                              :(len(df)-1), "Log_Return"].std()

        for i in range(0, (len(df)-62-2)):
            df.loc[(len(df)-64-1)-i, ['GVol']] = (
                omega + (
                    alpha *
                    (df.loc[(len(df)-64)-i, 'Log_Return']) ** 2) + (
                    beta *
                    (df.loc[(len(df)-64)-i, 'GVol']))**2
            ) ** (1/2)

        df.dropna(inplace=True)

        ranum = [random.uniform(0, 1) for i in range(1, 500000)]
        ranumppf = norm.ppf(ranum)
        mcs = df.loc[0, 'Close'] * np.exp(
            (df.loc[0, 'GVol']*ranumppf) -
            (
                (df.loc[0, 'GVol']**2)
                / 2)
        )
        # Compute MCS return & VaR
        mcs_ret = np.log(mcs/df.loc[0, 'Close'])
        var = (0-np.percentile(mcs_ret, 0.05))
        var = str(var.round(4))
        print('{0} today\'s VaR is {1}'.format(s, var))
        return var

    def upd_var(s, td, tv):
        print('We are going to update today\'s doc.')
        clct.update_one(
            {"Symbol": s},
            {"$push": {"HisData":
                       {"Date": td, "Var": tv}
                       },
             }
        )

    def crt_new_doc(s, c, td, tv):
        print('We are going to create a new doc for this company.')

        new_var_data = {
            "Symbol": s,
            "Company": c,
            "HisData": [
                {"Date": td,
                 "Var": tv
                 }
            ],
        }

        clct.insert_one(new_var_data)

    # start to check if today's var is exist.
    for x in clcttl.find():
        param_s = x['Symbol']
        param_c = x['Name']
        param_td = tdate
        print('START TO PROCESS {0}, TODAY is {1}'.format(param_s, param_td))
        # if symbol does not exist in the DB, we would create a new document for the ticker.
        if not symbolIsExist(param_s):
            param_tv = cal_var(param_s)
            crt_new_doc(param_s, param_c, param_td, param_tv)

        # if symbol exists and today's date doesn't exist, but today's var does not exist, we would update the doc for the ticker.
        elif symbolIsExist(param_s) and (not tDateIsExist(param_s, tdate)):
            param_tv = cal_var(param_s)
            upd_var(param_s, param_td, param_tv)

        # if symbol today'date and var are exist, we do nothing.
        elif symbolIsExist(param_s) and tDateIsExist(param_s, tdate):
            print('Today\'s VaR is exist.')


schedule.every().day.at("08:30").do(job)

while True:
    schedule.run_pending()
    print('Job is Scheduled')
    time.sleep(1)
