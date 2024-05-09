# Frontend Mentor - 'IP address tracker' solution

This is my solution to the ['IP address tracker' challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [My additional features](#my-additional-features)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own location marker on the map and information (IP address, location, timezone, and Internet Service Provider) on initial page load
- Search for any IP addresses or domains and see location marker on the map and information

### My additional features

Users are also able to:

- Receive an error message if they search with an empty search box
- Receive an error message if IP address or domain name searched is not formatted correctly
- Receive a `loading` message while waiting for data to be fetched and displayed
- Receive an error message if error occurs during data fetching process
- See the exact coordinates of the location on a popup if they click the map marker
- `Hide` (and show) the information display since it overlaps and obstructs map. This is especially useful for the `mobile design` where it overlaps almost entire map

### Screenshot

![IP Address Tracker Screenshot2](public/IP%20Address%20Tracker%20Screenshot2.PNG)
![IP Address Tracker Screenshot3](public/IP%20Address%20Tracker%20Screenshot3.PNG)
![IP Address Tracker Screenshot1](public/IP%20Address%20Tracker%20Screenshot1.PNG)

### Links

- Solution URL: View the GitHub repository [here](https://github.com/ArinzeGit/IP-Address-Tracker)
- Live Site URL: I have hosted the project on GitHub Pages [here]()

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- [Flexbox](https://www.w3.org/TR/css-flexbox-1/) - CSS web layout model
- CSS grid - CSS web layout model
- [TypeScript](https://www.typescriptlang.org/) - Programming language that extends JavaScript
- [React](https://react.dev/) - JavaScript library
- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- [Vite](https://vitejs.dev/) - React build tool with local development server
- [IP Geolocation API by IPify](https://geo.ipify.org/) - Web API for looking up IP address locations
- [LeafletJS](https://leafletjs.com/) - Library API for generating mobile-friendly interactive maps
- [React Leaflet](https://react-leaflet.js.org/) - Library that provides React components that wrap the [LeafletJS](https://leafletjs.com/) library

### What I learned

- I learned the concepts of `library APIs` using [LeafletJS](https://leafletjs.com/) and [React Leaflet](https://react-leaflet.js.org/). Before now, I was rather familiar with `web APIs` which allow interaction between web services or apps over the internet via HTTP requests. `Library APIs` on the other hand are provided by libraries or frameworks within a programming language, defining methods and functions for interacting with the functionalities provided by the library or framework. I made use of [React Leaflet](https://react-leaflet.js.org/) components like `<MapContainer>`, `<TileLayer>`, `<Marker>`, and `<Popup>`.

```js
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Ensure Leaflet CSS is imported

interface Props {
  latitude: number;
  longitude: number;
}

function MapComponent({ latitude, longitude }: Props) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      style={{ height: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          The coordinates of this position are <br /> {"{"}lat:{latitude}, lng:
          {longitude}
          {"}"}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;
```

- I learned to use the `useContext` hook along with the `createContext` function to pass data through my component tree without having to pass props down manually at every level. After creating context, I provide it to any deeply nested child by placing the `Provider` component higher up in the component tree to encompass the components that need access to the context. Functional components can then consume the context using the `useContext` hook. It provided me a cleaner and more concise way to handle shared state across my React app.

```js
//creating context in <App> component which is root component using createContext
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
```

```js
//Providing context to <SearchBar> component using <context.Provider>...</context.Provider>
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
        {!resultVisibility && <ViewButtton onClick={setResultVisibility} />}
      </div>
      {error && <ErrorMessage />}
      {loading && <LoadingMessage />}
      {!loading && (
        <MapComponent latitude={coordinates.lat} longitude={coordinates.lng} />
      )}
    </main>
    <footer className="attribution-container">
      <div className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="https://github.com/ArinzeGit" target="_blank">
          Arinze Owoh
        </a>.
      </div>
    </footer>
  </div>
);
```

```js
//consuming context in the <SearchBar> component using usecontext
const {
  setIpAddress,
  setLocation,
  setITimezone,
  setIsp,
  setCoordinates,
  setLoading,
  setError,
} = useContext(context);
```

- I learned to use the `useEffect` hook to perform side effects in functional components. `useEffect` allows you execute a function after any render or re-render of a component in the DOM. You can also specify dependencies for the effect so that the effect also runs when any dependencies change. The effect function can optionally return a cleanup function. This is used to perform any necessary cleanup, such as unsubscribing from subscriptions or clearing timers, when the component is unmounted or before it's re-rendered to prevent memory leaks. I used the `useEffect` hook in my `<App>` component to fetch IP address information of user when the `<App>` component is rendered, which is initial page load or page reload.

```js
// Fetch data when <App> component mounts
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
```

- I learned about `CSS variables` which are CSS custom properties typically defined within the `:root` pseudo-class selector. This selector matches the root element of the document which is typically the `<html>` element making the variables available globally throughout your CSS file.

```css
:root {
  --very-dark-gray: hsl(0, 0%, 17%);
  --dark-gray: hsl(0, 0%, 59%);
}
```

- I got a better understanding of `asynchronous functions`, and `promises`. `Asynchronous functions` return `promises` which are objects representing the eventual completion or failure of the asynchronous operation. Promises can be chained using `.then()` to handle success and `.catch()` to handle errors. I also learned that if I define a function to return an asynchronous function, then the parent function is effectively asynchronous itself and can catch errors re-thrown by the child function. I used `asynchronous functions` for data fetching.

```js
const callIpGeolocationApi = async (input: string) => {
  const apiUrl = constructApiUrl(input);

  return fetch(apiUrl) //fetch() is asynchronous so callIpGeolocationApi is effectively asynchronous
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error; // Rethrow the error to propagate it to the caller
    });
};
export default callIpGeolocationApi;
```

```js
const handleSubmission = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const validationResult = validateInput(inputValue);
  setInputFieldError(validationResult);
  if (!validationResult.content) {
    resetAllStates();
    callIpGeolocationApi(inputValue) //Parent function is called
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
        //Parent function catches any re-thrown error here
        setError(true);
        setLoading(false); // Set loading to false if there's an error
        console.error("Sorry, there was an error fetching data.", error);
      });
  }
};
```

- I learned to use the `flex-grow` and `flex-shrink` CSS properties. This has given me more understanding and control of `CSS Flexbox`

```css
.app {
  display: flex;
  flex-direction: column;
}

header {
  height: 280px;
  background-image: url(./assets/images/pattern-bg-desktop.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  padding: 29px;
  flex-shrink: 0;
}

main {
  height: 300px;
  flex-shrink: 0;
  flex-grow: 1;
  position: relative;
}
```

- I learned the difference between `CSS pseudo-classes` and `CSS pseudo-elements`. Pseudo-classes target elements based on their state, relationship to document or user interaction. They are denoted by a preceding colon like `:hover`, `:focus`, `:first-child`, and `:nth-child()`. Pseudo-elements target specific parts of an element's content or layout for independent styling. They are denoted by preceeding double colons like `::before`, `::after`, `::first-line`, and `::first-letter`.

```css
.result:not(:first-child)::before {
  position: absolute;
  content: "";
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 1px;
  height: 75px;
  background: black;
  opacity: 0.1;
}
```

### Continued development

- CSS Flexbox (flex-grow and flex-shrink)
- CSS variables
- React useState, UseEffect, useContext,
- Media queries
- Z-index
- Typescript
- API integration and Asynchronous operations

I found these techniques very useful. I will continue focusing on them in future projects to refine and perfect them.

### Useful resources

- [useContext In 2 Minutes - the React Hooks series](https://youtu.be/_HdrLsyAdJg?si=4Qvf8DUx2qTfhZtt) - This YouTube video helped me understand `useContext`. I'd recommend it to anyone still learning this concept.

## Author

- GitHub - [@ArinzeGit](https://github.com/ArinzeGit)
- Frontend Mentor - [@ArinzeGit](https://www.frontendmentor.io/profile/ArinzeGit)
- LinkedIn - [@Dennings-Owoh](https://www.linkedin.com/in/dennings-owoh-4839971b1/)
- Instagram - [@\_.arinze.\_](https://www.instagram.com/_.arinze._/)
- Twitter - [@Arinze98433402](https://twitter.com/Arinze98433402)
