import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import "./App.css";
import Heading from "./components/Heading";
import MapComponent from "./components/MapComponent";
import ResultDisplay from "./components/ResultDisplay";
import SearchBar from "./components/SearchBar";
import ErrorMessage from "./components/ErrorMessage";
import { apiKey, baseUrl } from "./utils/constants";
import HideButtton from "./components/HideButtton";
import ShowButtton from "./components/ShowButton";
import LoadingMessage from "./components/LoadingMessage";

interface ContextValue {
  setIpAddress: Dispatch<SetStateAction<string>>;
  setLocation: Dispatch<SetStateAction<string>>;
  setITimezone: Dispatch<SetStateAction<string>>;
  setIsp: Dispatch<SetStateAction<string>>;
  setCoordinates: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<boolean>>;
}

export const context = createContext<ContextValue>({} as ContextValue);

const App = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [location, setLocation] = useState("");
  const [timezone, setITimezone] = useState("");
  const [isp, setIsp] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [resultVisibility, setResultVisibility] = useState(true);

  // Fetch data when component mounts
  useEffect(() => {
    fetch(`${baseUrl}?apiKey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setIpAddress(data.ip);
        setLocation(
          `${data.location.city}, ${data.location.region} ${data.location.postalCode}`
        );
        setITimezone(`UTC ${data.location.timezone}`);
        setIsp(data.isp);
        setCoordinates({ lat: data.location.lat, lng: data.location.lng });
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        setError(true);
        setLoading(false); // Set loading to false if there's an error
        console.error("Sorry, there was an error fetching data.", error);
      });
  }, []);

  return (
    <div className="app">
      <header>
        <Heading text="IP Address Tracker" />
        <context.Provider
          value={{
            setIpAddress,
            setLocation,
            setITimezone,
            setIsp,
            setCoordinates,
            setLoading,
            setError,
          }}
        >
          <SearchBar />
        </context.Provider>
      </header>
      <main>
        <div className="result-display-container">
          {resultVisibility && (
            <ResultDisplay
              ipAddress={ipAddress}
              location={location}
              timezone={timezone}
              isp={isp}
            />
          )}
          {resultVisibility && <HideButtton onClick={setResultVisibility} />}
          {!resultVisibility && <ShowButtton onClick={setResultVisibility} />}
        </div>
        {error && <ErrorMessage />}
        {loading && <LoadingMessage />}
        {!loading && (
          <MapComponent
            latitude={coordinates.lat}
            longitude={coordinates.lng}
          />
        )}
      </main>
      <footer className="attribution-container">
        <div className="attribution">
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
            Frontend Mentor
          </a>
          . Coded by{" "}
          <a href="https://github.com/ArinzeGit" target="_blank">
            Arinze Owoh
          </a>
          .
        </div>
      </footer>
    </div>
  );
};

export default App;
