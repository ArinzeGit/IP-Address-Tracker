import { apiKey, baseUrl } from "./constants";
import { domainPattern, ipPattern } from "./regexPatterns";

const constructApiUrl = (input: string) => {
  let url = baseUrl;

  if (ipPattern.test(input)) {
    url += `?apiKey=${apiKey}&ipAddress=${input}`;
  } else if (domainPattern.test(input)) {
    url += `?apiKey=${apiKey}&domain=${input}`;
  }

  return url;
};

const callIpGeolocationApi = async (input: string) => {
  const apiUrl = constructApiUrl(input);

  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error; // Rethrow the error to propagate it to the caller
    });
};
export default callIpGeolocationApi;
