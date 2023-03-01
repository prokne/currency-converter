import Card from "./ui/Card";

import ConverterForm from "./components/ConverterForm";
import ConverterResult from "./components/ConverterResult";
import Stats from "./components/Stats";
import { useContext } from "react";

import classes from "./App.module.css";
import AppContext from "./store/app-context";

function App() {
  const ctx = useContext(AppContext);

  return (
    <div className={classes.content}>
      <Card>
        {ctx.isLoading && <p>Converter is getting ready, please wait.</p>}
        {!ctx.isLoading && <ConverterForm />}
        {ctx.isConverting ? <p>Converting ...</p> : <ConverterResult />}
        {ctx.isErr && <p className={classes.error}>{ctx.isErr}</p>}
        {ctx.stats && <Stats></Stats>}
      </Card>
    </div>
  );
}

export default App;
