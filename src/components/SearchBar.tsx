import { ChangeEvent, FormEvent, useContext, useState } from "react";
import styles from "./SearchBar.module.css";
import validateInput from "../utils/validateInput";
import ErrorIcon from "./ErrorIcon";
import callIpGeolocationApi from "../utils/callIpGeolocationApi";
import { context } from "../App";

interface InputFieldErrorProps {
  content?: string;
}

const SearchBar = () => {
  const {
    setIpAddress,
    setLocation,
    setITimezone,
    setIsp,
    setCoordinates,
    setLoading,
    setError,
  } = useContext(context);

  const resetAllStates = () => {
    setIpAddress("");
    setLocation("");
    setITimezone("");
    setIsp("");
    setCoordinates({ lat: 0, lng: 0 });
    setError(false);
    setLoading(true);
  };

  const [inputValue, setInputValue] = useState("");
  const [inputFieldError, setInputFieldError] = useState<InputFieldErrorProps>(
    {}
  );

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  const handleSubmission = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationResult = validateInput(inputValue);
    setInputFieldError(validationResult);
    if (!validationResult.content) {
      resetAllStates();
      callIpGeolocationApi(inputValue)
        .then((data) => {
          setIpAddress(data.ip);
          setLocation(
            `${data.location.city}, ${data.location.region} ${data.location.postalCode}`
          );
          setITimezone(`UTC ${data.location.timezone}`);
          setIsp(data.isp);
          setCoordinates({
            lat: data.location.lat,
            lng: data.location.lng,
          });
          setLoading(false);
          console.log(data);
        })
        .catch((error) => {
          setError(true);
          setLoading(false); // Set loading to false if there's an error
          console.error("Sorry, there was an error fetching data.", error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmission} className={styles.form}>
      <div className={styles["input-container"]}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search for any IP address or domain"
          onChange={handleInput}
        />
        {inputFieldError.content && <ErrorIcon />}
        {inputFieldError.content && (
          <p className={styles.error}>{inputFieldError.content}</p>
        )}
      </div>
      <button type="submit" className={styles.button}>
        <span className={styles["visually-hidden"]}>Search</span>
      </button>
    </form>
  );
};

export default SearchBar;
