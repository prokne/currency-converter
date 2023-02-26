import { Result } from "../types/types";

import classes from "./ConverterResult.module.css";

const ConverterResult: React.FC<{ resultData: Result | null }> = (props) => {
  return (
    <div className={classes.result}>
      {props.resultData && (
        <p>{`${props.resultData.amount} ${props.resultData.from} = ${props.resultData.result} ${props.resultData.to}`}</p>
      )}
    </div>
  );
};

export default ConverterResult;
