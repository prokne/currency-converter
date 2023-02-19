import "./App.css";
import Card from "./ui/Card";

import ConverterForm from "./components/ConverterForm";
import ConverterResult from "./components/ConverterResult";
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

        if (!response.ok) {
          throw new Error(
            "Could not fetch data (status code: " + response.status + ")"
          );
        } else {
          const data = await response.json();

          if (data.error) {
            setIsErr(data.error);
          } else {
            setCurrencies(data.data);
          }
          setIsLoading(false);
        }
      } catch (err: any) {
        setIsLoading(false);
        setIsErr(err.message);
      }
    }
    setIsLoading(true);
    getListOfCurrencies();
  }, []);

  function setConverterResultContent(result: Result) {
    setResult(result);
  }

  return (
    <div className="content">
      <Card>
        {isLoading && <p>Converter is getting ready, please wait.</p>}
        {!isLoading && (
          <ConverterForm
            currencies={currencies}
            onGetResult={setConverterResultContent}
          />
        )}
        <ConverterResult resultData={result} />
        {isErr && <p>{isErr}</p>}
      </Card>
    </div>
  );
}

export default App;
