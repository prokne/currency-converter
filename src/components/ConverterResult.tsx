import { Result } from "../types/types";

const ConverterResult: React.FC<{ resultData: Result | null }> = (props) => {
  return (
    <div>
      {props.resultData && (
        <p>{`${props.resultData.amount} ${props.resultData.from} = ${props.resultData.result} ${props.resultData.to}`}</p>
      )}
    </div>
  );
};

export default ConverterResult;
