import { Currencies } from "../types/types";

const CurrencyOption: React.FC<{ currencies: Currencies }> = (props) => {
  return (
    <>
      (
      {props.currencies.map((currency) => {
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
