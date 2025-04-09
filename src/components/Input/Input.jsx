import inputStyles from "./Input.module.css";
const Input = ({
  label,
  type = "text",
  value,
  placeHolder = "",
  className,
  id,
  errorMessage,
  onChange,
  onKeyDown,
}) => {
  return (
    <div className={inputStyles.inputContainer}>
      {label && (
        <label htmlFor={id} className={inputStyles.label}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        className={`${inputStyles.input} ${className}`}
      />
      {errorMessage && (
        <p className={inputStyles.errorMessage}>{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
