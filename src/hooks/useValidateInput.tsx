import { ChangeEvent, useState } from "react";

function useValidateInput(
  validateValue: (input: string) => boolean,
  initialValue: string
) {
  const [isTouched, setIsTouched] = useState<boolean>();
  const [enteredValue, setEnteredValue] = useState<string>(initialValue);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    setEnteredValue(event.target.value);
  }

  function blurHandler() {
    setIsTouched(true);

    //Edits user input for better UX and to round entered amount and checks if entered amount is greater than 0
    const enteredAmountToNumber = +enteredValue;
    const roundedNumber = enteredAmountToNumber.toFixed(2);
    setEnteredValue("" + roundedNumber);
  }
  return {
    hasError,
    blurHandler,
    value: enteredValue,
    changeHandler,
  };
}

export default useValidateInput;
