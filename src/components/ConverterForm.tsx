import React, { ChangeEvent, useState } from "react";
import classes from "./ConverterForm.module.css";

const ConverterForm: React.FC<{
  currencies: { shortcut: string; name: string }[];
}> = (props) => {
  const [enteredAmount, setEnteredAmount] = useState<string>("1");

  function amountChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setEnteredAmount(event.target.value);
  }

  //Edits user input for better UX and to round entered amount
  function amountBlurHandler() {
    const enteredAmountToNumber = +enteredAmount;
    const roundedNumber = enteredAmountToNumber.toFixed(2);
    setEnteredAmount("" + roundedNumber);
  }

  return (
    <form>
      <div className={classes.form_content}>
        <label htmlFor="amount">Amount</label>
        <input
          type="text"
          id="amount"
          value={enteredAmount}
          onBlur={amountBlurHandler}
          onChange={amountChangeHandler}
        />
      </div>
      <div className={classes.form_content}>
        <label htmlFor="currency">From</label>
        <select id="currency">
          {props.currencies.map((currency) => (
            <option key={currency.shortcut} value={currency.shortcut}>
              {`${currency.shortcut} - ${currency.name}`}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.form_content}>
        <label htmlFor="destination-currency">To</label>
        <select id="destination-currency">
          {props.currencies.map((currency) => (
            <option key={currency.shortcut} value={currency.shortcut}>
              {`${currency.shortcut} - ${currency.name}`}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.btn_section}>
        <button>Convert</button>
      </div>
    </form>
  );
};

export default ConverterForm;
