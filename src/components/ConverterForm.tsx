import React, { ChangeEvent, FormEvent, useState } from "react";
import { Currencies, Result, Statistics } from "../types/types";
import CurrencyOption from "./CurrencyOption";
import useValidateInput from "../hooks/useValidateInput";

import classes from "./ConverterForm.module.css";

const initialFromCurrency = "USD";
const initialToCurrency = "EUR";

const ConverterForm: React.FC<{
  currencies: Currencies;
  onGetResult: (result: Result) => void;
  onError: (error: string) => void;
  onGetStats: (stats: Statistics) => void;
}> = (props) => {
  const {
    blurHandler: amountBlurHandler,
    changeHandler: amountChangeHandler,
    valueIsValid: amountIsValid,
    value: enteredAmount,
  } = useValidateInput(validateAmount, "1.00");

  const [fromCurrencyValue, setFromCurrencyValue] =
    useState<string>(initialFromCurrency);
  const [toCurrencyValue, setToCurrencyValue] =
    useState<string>(initialToCurrency);

  const areCurrenciesValid = fromCurrencyValue !== toCurrencyValue;
  const isFormValid = amountIsValid && areCurrenciesValid;

  function validateAmount(input: string): boolean {
    return +input > 0;
  }

  function fromCurrencyChangeHandler(event: ChangeEvent<HTMLSelectElement>) {
    setFromCurrencyValue(event.target.value);
  }

  function toCurrencyChangeHandler(event: ChangeEvent<HTMLSelectElement>) {
    setToCurrencyValue(event.target.value);
  }

  //Submits the form to the backend
  async function submitHandler(event: FormEvent) {
    event.preventDefault();
    props.onError("");

    const data = {
      amount: +enteredAmount,
      from: fromCurrencyValue,
      to: toCurrencyValue,
    };

    try {
      const response = await fetch("http://localhost:3000/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const awaitedResponse = await response.json();
      console.log(awaitedResponse.data);

      if (awaitedResponse.error) {
        throw new Error(awaitedResponse.error || "Something went wrong");
      }
      props.onGetResult(awaitedResponse.data.result);
      props.onGetStats(awaitedResponse.data.stats);
    } catch (error: any) {
      props.onError(error.message);
    }
  }

  const inputErrorStyle = amountIsValid ? "" : classes.form_error;
  const selectErrorStyle = areCurrenciesValid ? "" : classes.form_error;

  return (
    <form onSubmit={submitHandler}>
      <div>
        <div className={classes.form_content}>
          <label htmlFor="amount">Amount</label>
          <input
            className={inputErrorStyle}
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
            defaultValue={initialFromCurrency}
            className={selectErrorStyle}
            onChange={fromCurrencyChangeHandler}
          >
            <CurrencyOption currencies={props.currencies}></CurrencyOption>
          </select>
        </div>
        <div className={classes.form_content}>
          <label htmlFor="to-currency">To</label>
          <select
            id="to-currency"
            className={selectErrorStyle}
            defaultValue={initialToCurrency}
            onChange={toCurrencyChangeHandler}
          >
            <CurrencyOption currencies={props.currencies}></CurrencyOption>
          </select>
        </div>
      </div>
      <div>
        <div className={classes.form_content}>
          {!amountIsValid && (
            <p className={classes.form_error_message}>
              Entered amount must be greater than 0
            </p>
          )}
        </div>
        <div className={classes.form_content}>
          {!areCurrenciesValid && (
            <p className={classes.form_error_message}>
              Initial currency and destination currency must differ
            </p>
          )}
        </div>
      </div>
      <div className={classes.btn_section}>
        <button disabled={!isFormValid}>Convert</button>
      </div>
    </form>
  );
};

export default ConverterForm;
