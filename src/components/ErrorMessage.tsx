import styles from "./ErrorMessage.module.css";
const ErrorMessage = () => {
  return (
    <div className={styles["error-message"]}>
      Sorry, there was an error fetching data.
    </div>
  );
};

export default ErrorMessage;
