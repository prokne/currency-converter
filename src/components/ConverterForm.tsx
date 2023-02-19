import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import classes from "./ConverterForm.module.css";
import { Result } from "../types/types";

//REFACTOR VALIDATION

const ConverterForm: React.FC<{
  currencies: { shortcut: string; name: string }[];
  onGetResult: (result: Result) => void;
}> = (props) => {
  const [enteredAmount, setEnteredAmount] = useState<string>("1.00");
  const [isError, setIsError] = useState<string | null>(null);

  const fromCurrencyRef = useRef<HTMLSelectElement>(null);
  const toCurrencyRef = useRef<HTMLSelectElement>(null);

  //Takes care of two way binding of the amount input
  function amountChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setEnteredAmount(event.target.value);
  }

  //Edits user input for better UX and to round entered amount and checks if entered amount is greater than 0
  function amountBlurHandler() {
    const enteredAmountToNumber = +enteredAmount;

    if (enteredAmountToNumber < 0) {
      setIsError("Entered amount must be greater than 0");
      return;
    }
    const roundedNumber = enteredAmountToNumber.toFixed(2);
    setEnteredAmount("" + roundedNumber);
  }

  function fromCurrencyChangeHandler(event: ChangeEvent<HTMLSelectElement>) {
    if (event.target.value === toCurrencyRef.current?.value) {
      setIsError(
        "The destination currency must differ from the initial currency"
      );
    } else {
      setIsError(null);
    }
  }

  function toCurrencyChangeHandler(event: ChangeEvent<HTMLSelectElement>) {
    if (event.target.value === fromCurrencyRef.current?.value) {
      setIsError(
        "The destination currency must differ from the initial currency"
      );
    } else {
      setIsError(null);
    }
  }

  //Submits the form to the backend
  async function submitHandler(event: FormEvent) {
    event.preventDefault();
    setIsError(null);

    //Form cannot be submitted if the initial currency and the destination currency is the same
    if (fromCurrencyRef.current?.value === toCurrencyRef.current?.value) {
      setIsError(
        "The destination currency must differ from the initial currency"
      );
      return;
    }

    const data = {
      amount: enteredAmount,
      from: fromCurrencyRef.current?.value,
      to: toCurrencyRef.current?.value,
    };

    try {
      const response = await fetch("http://localhost:3000/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const awaitedResult: Result = await response.json();
      props.onGetResult(awaitedResult);
    } catch (error: any) {
      setIsError(error.message || "Something went wrong");
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.form_content}>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          value={enteredAmount}
          onBlur={amountBlurHandler}
          onChange={amountChangeHandler}
        />
      </div>
      <div className={classes.form_content}>
        <label htmlFor="from-currency">From</label>
        <select
          id="from-currency"
          ref={fromCurrencyRef}
          onChange={fromCurrencyChangeHandler}
        >
          {props.currencies.map((currency) => (
            <option key={currency.shortcut} value={currency.shortcut}>
              {`${currency.shortcut} - ${currency.name}`}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.form_content}>
        <label htmlFor="to-currency">To</label>
        <select
          id="to-currency"
          ref={toCurrencyRef}
          onChange={toCurrencyChangeHandler}
        >
          {props.currencies.map((currency) => (
            <option key={currency.shortcut} value={currency.shortcut}>
              {`${currency.shortcut} - ${currency.name}`}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.btn_section}>
        <button disabled={isError?.includes("")}>Convert</button>
      </div>
      {isError && <p>{isError}</p>}
    </form>
  );
};

export default ConverterForm;
