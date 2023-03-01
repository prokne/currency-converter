import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import CurrencyOption from "./CurrencyOption";
import useValidateInput from "../hooks/useValidateInput";

import classes from "./ConverterForm.module.css";
import AppContext from "../store/app-context";

const initialFromCurrency = "USD";
const initialToCurrency = "EUR";

//Creates converter form
const ConverterForm: React.FC = () => {
  const ctx = useContext(AppContext);

  //Hook for entered amount validation
  const {
    blurHandler: amountBlurHandler,
    changeHandler: amountChangeHandler,
    valueIsValid: amountIsValid,
    value: enteredAmount,
  } = useValidateInput(validateAmount, "1.00");

  //States for select inputs
  const [fromCurrencyValue, setFromCurrencyValue] =
    useState<string>(initialFromCurrency);
  const [toCurrencyValue, setToCurrencyValue] =
    useState<string>(initialToCurrency);

  //Validation select inputs
  const areCurrenciesValid = fromCurrencyValue !== toCurrencyValue;

  //Validating form as a whole
  const isFormValid = amountIsValid && areCurrenciesValid;

  //Validation function for entered amount validation hook
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
    ctx.errorHandler("");
    ctx.isConvertingHandler(true);

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

      //Update result and stat states to re-render
      ctx.resultHandler(awaitedResponse.data.result);
      ctx.statsHandler(awaitedResponse.data.stats);
      ctx.isConvertingHandler(false);
    } catch (error: any) {
      ctx.errorHandler(error.message);
      ctx.isConvertingHandler(false);
    }
  }

  //Error classes to style form inputs
  const inputErrorStyle = amountIsValid ? "" : classes.form_error;
  const selectErrorStyle = areCurrenciesValid ? "" : classes.form_error;

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.row}>
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
            <CurrencyOption></CurrencyOption>
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
            <CurrencyOption></CurrencyOption>
          </select>
        </div>
      </div>

      <div className={classes.row}>
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
