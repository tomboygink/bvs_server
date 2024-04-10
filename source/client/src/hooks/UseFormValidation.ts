import { useState, useCallback, ChangeEvent, ReactNode } from "react";
import { SelectChangeEvent } from "@mui/material";
interface FormValues {
  [key: string]: string;
}
export const useFormValidation = () => {
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isInValidInput, setIsInValidInput] = useState({});

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = event.target;

    const name = target.name;
    const value = target.value;
    const form = target.closest("form");

    setValues({ ...values, [name]: value });
    setErrors({
      ...errors,
      [name]: target.validationMessage,
    });
    setIsValid(form ? form.checkValidity() : false);

    target.validationMessage
      ? setIsInValidInput({ ...isInValidInput, [name]: true })
      : setIsInValidInput({ ...isInValidInput, [name]: false });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const resetForm = useCallback(
    (
      newValues = {},
      newErrors = {},
      newIsInvalidInput = {},
      newIsValid = false
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsInValidInput(newIsInvalidInput);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    handleSelectChange,
    errors,
    isValid,
    isInValidInput,
    resetForm,
  };
};
