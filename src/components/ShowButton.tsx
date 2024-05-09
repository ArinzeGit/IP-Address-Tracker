import { Dispatch, SetStateAction } from "react";
import "./ShowHideButton.css";

interface Props {
  onClick: Dispatch<SetStateAction<boolean>>;
}

const ShowButtton = ({ onClick }: Props) => {
  return (
    <button
      className="show-button"
      onClick={() => onClick((prevState) => !prevState)}
    />
  );
};

export default ShowButtton;
