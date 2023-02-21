import { ChangeEvent, useState } from "react";

//Hook for input validation
//It validates input according to the validation function which is
//passed to the hook
function useValidateInput(
  validateValue: (input: string) => boolean,
  initialValue: string
) {
  const [enteredValue, setEnteredValue] = useState<string>(initialValue);

  const valueIsValid = validateValue(enteredValue);

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    setEnteredValue(event.target.value);
  }

  function blurHandler() {
    //Edits user input for better UX and to round entered amount and checks if entered amount is greater than 0
    const enteredAmountToNumber = +enteredValue;
    const roundedNumber = enteredAmountToNumber.toFixed(2);
    setEnteredValue("" + roundedNumber);
  }
  return {
    valueIsValid,
    blurHandler,
    value: enteredValue,
    changeHandler,
  };
}

export default useValidateInput;
