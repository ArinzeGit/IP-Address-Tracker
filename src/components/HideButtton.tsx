import { Dispatch, SetStateAction } from "react";
import styles from "./ShowHideButton.module.css";

interface Props {
  onClick: Dispatch<SetStateAction<boolean>>;
}

const HideButtton = ({ onClick }: Props) => {
  return (
    <button
      className={styles["hide-button"]}
      type="button"
      onClick={() => onClick((prevState) => !prevState)}
    >
      <span className={styles["visually-hidden"]}>Hide results</span>
    </button>
  );
};

export default HideButtton;
