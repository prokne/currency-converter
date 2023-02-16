import "./App.css";
import Card from "./ui/Card";

import ConverterForm from "./components/ConverterForm";
import ConverterResult from "./components/ConverterResult";
import { useEffect, useState } from "react";

function App() {
  const [currencies, setCurrencies] = useState<
    { shortcut: string; name: string }[]
  >([]);
  const [isErr, setIsErr] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getListOfCurrencies() {
      try {
        const response = await fetch("http://localhost:3000/");

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

  console.log(isLoading);

  return (
    <div className="content">
      <Card>
        {isLoading && <p>Converter is getting ready, please wait.</p>}
        {!isLoading && <ConverterForm currencies={currencies} />}
        <ConverterResult />
        {isErr && <p>{isErr}</p>}
      </Card>
    </div>
  );
}

export default App;
