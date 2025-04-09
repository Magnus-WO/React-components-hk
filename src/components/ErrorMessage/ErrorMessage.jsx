import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ errorLogo, message }) => {
  return (
    <div className={styles.errorContainer}>
      <span className={styles.errorLogo}>{errorLogo}</span>
      <p className={styles.errorText}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
