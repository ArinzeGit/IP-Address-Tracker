import { Dispatch, SetStateAction } from "react";
import styles from "./ShowHideButton.module.css";

interface Props {
  onClick: Dispatch<SetStateAction<boolean>>;
}

const ShowButtton = ({ onClick }: Props) => {
  return (
    <button
      className={styles["show-button"]}
      type="button"
      onClick={() => onClick((prevState) => !prevState)}
    >
      <span className={styles["visually-hidden"]}>Show results</span>
    </button>
  );
};

export default ShowButtton;
