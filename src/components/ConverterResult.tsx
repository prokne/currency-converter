import { useContext } from "react";
import AppContext from "../store/app-context";

import classes from "./ConverterResult.module.css";

//Renders result of conversion only if result object is available
const ConverterResult: React.FC = () => {
  const ctx = useContext(AppContext);
  return (
    <div className={classes.result}>
      {ctx.result && (
        <p>{`${ctx.result.amount} ${ctx.result.from} = ${ctx.result.result} ${ctx.result.to}`}</p>
      )}
    </div>
  );
};

export default ConverterResult;
