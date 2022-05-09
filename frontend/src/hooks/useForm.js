import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [formValues, setFormValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  // Reset form
  const reset = (newFormState = initialState) => setFormValues(newFormState);

  // Update input value
  const handleChange = ({ target }) => {
    const nameInputChange = target.name;
    const valueInputChange = target.value;

    setFormValues({
      ...formValues,
      [nameInputChange]: valueInputChange,
    });
  };

  // Validate form
  const validate = ({ target }) => {
    const field = target.name;
    const value = target.value;
    const pattern = new RegExp(/^[A-Za-z0-9\s]+$/g);

    if (!value.trim()) {
      setErrors({ [field]: 'El campo es requerido' });
    } else if (!pattern.test(value)) {
      setErrors({ [field]: 'El campo solo debe contener letras y numeros' });
    } else {
      setErrors({});
    }
  };

  // Handle write to input
  const handleKeyUp = (e) => validate(e);

  // Handle blur to input
  const handleBlur = ({ target }) => !target.value.trim() && setErrors({});

  return { formValues, errors, reset, handleChange, handleKeyUp, handleBlur };
};
