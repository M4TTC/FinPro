export interface pfData {
  Symbol: string;
  Company: string;
  hisData: [{ Date: string; Var: string }];
}

export interface DialogData {
  username: string | null;
  pfName: string;
  pfSymbols: string[];
}
