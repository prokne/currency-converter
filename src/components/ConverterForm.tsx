import React, { ChangeEvent, FormEvent, useState } from "react";
import classes from "./ConverterForm.module.css";
import { Currencies, Result } from "../types/types";
import CurrencyOption from "./CurrencyOption";
import useValidateInput from "../hooks/useValidateInput";

//REFACTOR VALIDATION

const initialFromCurrency = "USD";
const initialToCurrency = "EUR";

const ConverterForm: React.FC<{
  currencies: Currencies;
  onGetResult: (result: Result) => void;
}> = (props) => {
  const {
    blurHandler: amountBlurHandler,
    changeHandler: amountChangeHandler,
    hasError: amountHasError,
    value: enteredAmount,
  } = useValidateInput(validateAmount, "1.00");

  const [fromCurrencyValue, setFromCurrencyValue] =
    useState<string>(initialFromCurrency);
  const [toCurrencyValue, setToCurrencyValue] =
    useState<string>(initialToCurrency);

  function validateAmount(input: string): boolean {
    return +input >= 0;
  }

  const areCurrenciesValid = fromCurrencyValue !== toCurrencyValue;
  const isFormValid = !amountHasError && areCurrenciesValid;

  function fromCurrencyChangeHandler(event: ChangeEvent<HTMLSelectElement>) {
    setFromCurrencyValue(event.target.value);
  }

  function toCurrencyChangeHandler(event: ChangeEvent<HTMLSelectElement>) {
    setToCurrencyValue(event.target.value);
  }

  //Submits the form to the backend
  async function submitHandler(event: FormEvent) {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    const data = {
      amount: enteredAmount,
      from: fromCurrencyValue,
      to: toCurrencyValue,
    };

    try {
      const response = await fetch("http://localhost:3000/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const awaitedResult = await response.json();
      props.onGetResult(awaitedResult.data);
    } catch (error: any) {
      //setIsError(error.message || "Something went wrong");
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
        {amountHasError && <p>Entered amount must be greater than 0</p>}
      </div>
      <div className={classes.form_content}>
        <label htmlFor="from-currency">From</label>
        <select id="from-currency" onChange={fromCurrencyChangeHandler}>
          <CurrencyOption
            currencies={props.currencies}
            selected={initialFromCurrency}
          ></CurrencyOption>
        </select>
        {!areCurrenciesValid && (
          <p>Initial currency and destination currency must differ</p>
        )}
      </div>
      <div className={classes.form_content}>
        <label htmlFor="to-currency">To</label>
        <select id="to-currency" onChange={toCurrencyChangeHandler}>
          <CurrencyOption
            currencies={props.currencies}
            selected={initialToCurrency}
          ></CurrencyOption>
        </select>
      </div>
      <div className={classes.btn_section}>
        <button disabled={!isFormValid}>Convert</button>
      </div>
      {/* {isError && <p>{isError}</p>} */}
    </form>
  );
};

export default ConverterForm;
