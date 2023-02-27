export type Result = {
  amount: string;
  to: string;
  from: string;
  result: number;
};

export type Currencies = {
  shortcut: string;
  name: string;
}[];

export type Statistics = {
  mostPopularDestinationCurrencies: string[];
  totalAmount: number;
  totalNumberOfRequests: number;
};

export type appContextObj = {
  currencies: { shortcut: string; name: string }[];
  result: Result | null;
  stats: Statistics | null;
  isErr: string | null;
  resultHandler: (result: Result) => void;
  statsHandler: (stats: Statistics) => void;
  errorHandler: (error: string) => void;
  currenciesHandler: (currencies: { shortcut: string; name: string }[]) => void;
};
