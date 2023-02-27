import Card from "./ui/Card";

import ConverterForm from "./components/ConverterForm";
import ConverterResult from "./components/ConverterResult";
import Stats from "./components/Stats";
import { useEffect, useState } from "react";
import { Result, Statistics } from "./types/types";

import classes from "./App.module.css";

function App() {
  const [currencies, setCurrencies] = useState<
    { shortcut: string; name: string }[]
  >([]);
  const [stats, setStats] = useState<Statistics | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [isErr, setIsErr] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  function resultHandler(result: Result) {
    setResult(result);
  }

  function errorHandler(error: string) {
    setIsErr(error);
  }

  function statsHandler(stats: Statistics) {
    setStats(stats);
  }

  return (
    <div className={classes.content}>
      <Card>
        {isLoading && <p>Converter is getting ready, please wait.</p>}
        {!isLoading && (
          <ConverterForm
            currencies={currencies}
            onGetResult={resultHandler}
            onError={errorHandler}
            onGetStats={statsHandler}
          />
        )}
        <ConverterResult resultData={result} />
        {isErr && <p className={classes.error}>{isErr}</p>}
        {stats && <Stats stats={stats}></Stats>}
      </Card>
    </div>
  );
}

export default App;
