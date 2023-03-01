import React, { useState, useEffect } from "react";
import { appContextObj, Result, Statistics, Currencies } from "../types/types";

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
  isLoading: true,
  isConverting: false,
  resultHandler: (result: Result) => {},
  statsHandler: (stats: Statistics) => {},
  errorHandler: (error: string) => {},
  currenciesHandler: (currencies: Currencies) => {},
  isConvertingHandler: (isConverting: boolean) => {},
});

//AppContext component
export const AppContextProvider: React.FC<{ children?: React.ReactNode }> = (
  props
) => {
  const [currencies, setCurrencies] = useState<Currencies>([]);
  const [stats, setStats] = useState<Statistics | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [isErr, setIsErr] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isConverting, setIsConverting] = useState<boolean>(false);

  //Fetches available currencies for populating select inputs and statistics only on the first render cycle
  useEffect(() => {
    async function getListOfCurrencies() {
      try {
        const response = await fetch("http://localhost:3000/currencies");
        const data = await response.json();

        if (data.error) {
          setIsErr(data.error);
          throw new Error(data.error);
        }

        setCurrencies(data.data.currencies);
        setStats(data.data.stats);
        setIsLoading(false);
      } catch (err: any) {
        setIsLoading(false);
        setIsErr(err.message || "Something went wrong");
      }
    }
    setIsLoading(true);
    getListOfCurrencies();
  }, []);

  //Functions for state changes
  function currenciesHandler(currencies: Currencies) {
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

  function isCovertingHandler(isConverting: boolean) {
    setIsConverting(isConverting);
  }

  //Context value object
  const contextValue: appContextObj = {
    currencies: currencies,
    result: result,
    stats: stats,
    isErr: isErr,
    isConverting: isConverting,
    resultHandler: resultHandler,
    errorHandler: errorHandler,
    statsHandler: statsHandler,
    isConvertingHandler: isCovertingHandler,
    currenciesHandler: currenciesHandler,
    isLoading: isLoading,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
