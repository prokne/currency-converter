import "./App.css";
import Card from "./ui/Card";

import ConverterForm from "./components/ConverterForm";
import ConverterResult from "./components/ConverterResult";
import Stats from "./components/Stats";
import { useEffect, useState } from "react";
import { Result } from "./types/types";

function App() {
  const [currencies, setCurrencies] = useState<
    { shortcut: string; name: string }[]
  >([]);
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

        setCurrencies(data.data);
        setIsLoading(false);
      } catch (err: any) {
        setIsLoading(false);
        setIsErr(err.message || "Something wen");
      }
    }
    setIsLoading(true);
    getListOfCurrencies();
  }, []);

  function setConverterResultContent(result: Result) {
    setResult(result);
  }

  function errorHandler(error: string) {
    setIsErr(error);
  }

  return (
    <div className="content">
      <Card>
        {isLoading && <p>Converter is getting ready, please wait.</p>}
        {!isLoading && (
          <ConverterForm
            currencies={currencies}
            onGetResult={setConverterResultContent}
            onError={errorHandler}
          />
        )}
        <ConverterResult resultData={result} />
        {isErr && <p>{isErr}</p>}
        <Stats></Stats>
      </Card>
    </div>
  );
}

export default App;
