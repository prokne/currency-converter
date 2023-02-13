import "./App.css";
import Card from "./ui/Card";

import ConverterForm from "./components/ConverterForm";
import ConverterResult from "./components/ConverterResult";
import { useEffect, useState } from "react";

//Add error handling
//General type for currency list
//Loading state

function App() {
  const [currencies, setCurrencies] = useState<
    { shortcut: string; name: string }[]
  >([]);

  useEffect(() => {
    async function getListOfCurrencies() {
      const response = await fetch("http://localhost:3000/");
      const data = await response.json();
      setCurrencies(data);
    }
    getListOfCurrencies();
  }, []);

  return (
    <div className="content">
      <Card>
        <ConverterForm currencies={currencies} />
        <ConverterResult />
      </Card>
    </div>
  );
}

export default App;
