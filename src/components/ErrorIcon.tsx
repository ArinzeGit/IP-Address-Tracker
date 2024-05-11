import ErrorIconSrc from "../assets/images/icon-error.svg";
import styles from "./ErrorIcon.module.css";

const ErrorIcon = () => {
  return (
    <img className={styles["error-icon"]} src={ErrorIconSrc} alt="Error icon" />
  );
};

export default ErrorIcon;
