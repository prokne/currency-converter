import React, { useState } from "react";
import { appContextObj, Result, Statistics } from "../types/types";

export const AppContext = React.createContext<appContextObj>({
  currencies: [{ shortcut: "", name: "" }],
  result: {
    amount: "",
    to: "",
    from: "",
    result: 0,
  },
  stats: {
    mostPopularDestinationCurrencies: [],
    totalAmount: 0,
    totalNumberOfRequests: 0,
  },
  isErr: "",
  resultHandler: (result: Result) => {},
  statsHandler: (stats: Statistics) => {},
  errorHandler: (error: string) => {},
  currenciesHandler: (currencies: { shortcut: string; name: string }[]) => {},
});

const AppContextProvider: React.FC<{ children?: React.ReactNode }> = (
  props
) => {
  const [currencies, setCurrencies] = useState<
    { shortcut: string; name: string }[]
  >([]);
  const [stats, setStats] = useState<Statistics | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [isErr, setIsErr] = useState<string | null>(null);

  function currenciesHandler(currencies: { shortcut: string; name: string }[]) {
    setCurrencies(currencies);
  }

  function resultHandler(result: Result) {
    setResult(result);
  }

  function errorHandler(error: string) {
    setIsErr(error);
  }

  function statsHandler(stats: Statistics) {
    setStats(stats);
  }

  const contextValue: appContextObj = {
    currencies: currencies,
    result: result,
    stats: stats,
    isErr: isErr,
    resultHandler: resultHandler,
    errorHandler: errorHandler,
    statsHandler: statsHandler,
    currenciesHandler: currenciesHandler,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
