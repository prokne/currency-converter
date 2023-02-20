import { Currencies } from "../types/types";

const CurrencyOption: React.FC<{ currencies: Currencies; selected: string }> = (
  props
) => {
  return (
    <>
      (
      {props.currencies.map((currency) => {
        if (currency.shortcut === props.selected) {
          return (
            <option key={currency.shortcut} value={currency.shortcut} selected>
              {`${currency.shortcut} - ${currency.name}`}
            </option>
          );
        } else {
          return (
            <option key={currency.shortcut} value={currency.shortcut}>
              {`${currency.shortcut} - ${currency.name}`}
            </option>
          );
        }
      })}
    </>
  );
};

export default CurrencyOption;
