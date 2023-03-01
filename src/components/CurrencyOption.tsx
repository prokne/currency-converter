import { useContext } from "react";
import AppContext from "../store/app-context";

//Creates option elemenets based on array of currencies recieved from backend
const CurrencyOption: React.FC = () => {
  const ctx = useContext(AppContext);
  return (
    <>
      (
      {ctx.currencies.map((currency) => {
        return (
          <option key={currency.shortcut} value={currency.shortcut}>
            {`${currency.shortcut} - ${currency.name}`}
          </option>
        );
      })}
    </>
  );
};

export default CurrencyOption;
