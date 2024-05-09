import { Dispatch, SetStateAction } from "react";
import "./ShowHideButton.css";

interface Props {
  onClick: Dispatch<SetStateAction<boolean>>;
}

const HideButtton = ({ onClick }: Props) => {
  return (
    <button
      className="hide-button"
      onClick={() => onClick((prevState) => !prevState)}
    />
  );
};

export default HideButtton;
