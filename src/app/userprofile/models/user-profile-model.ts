export interface UserPortfolioList {
  username: any;
  pflist: PfList[];
}

export interface PfList {
  pfname: string;
  symbols: string[];
}
