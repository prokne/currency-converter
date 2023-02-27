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
