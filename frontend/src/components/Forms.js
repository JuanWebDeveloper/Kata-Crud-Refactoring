import { useForm } from '../hooks/useForm';

export const Forms = ({ inputName, placeholder, button, onSubmit, valueToEdit = '' }) => {
  const { formValues, errors, reset, handleChange, handleKeyUp, handleBlur } = useForm({
    [inputName]: valueToEdit,
  });

  const { [inputName]: value } = formValues;

  return (
    <>
      <form className='form' onSubmit={(e) => onSubmit(e, formValues, reset)}>
        <input
          type='text'
          className={`${errors[inputName] && 'active'}`}
          name={inputName}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
          autoComplete='off'
        />
        <button type='submit' className={`button ${errors[inputName] && 'disabled'} ${!value.trim() && 'disabled'}`}>
          {button}
        </button>
      </form>
      <div className={`form-errors ${errors[inputName] && 'active'}`}>
        <h2>{errors[inputName]}</h2>
      </div>
    </>
  );
};
