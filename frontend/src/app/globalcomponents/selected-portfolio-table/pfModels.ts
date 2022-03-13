export interface pfData {
  Symbol: string;
  Company: string;
  hisData: [{ Date: string; Var: string }];
}

export interface DialogData {
  uid: string | null;
  pfName: string;
  pfSymbols: string[];
}
