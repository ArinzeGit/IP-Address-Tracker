import { domainPattern, ipPattern } from "./regexPatterns";

interface inputFieldErrorProps {
  content?: string;
}

const validateInput = (input: string) => {
  const error: inputFieldErrorProps = {};

  if (input === "") {
    error.content = "Search nothing, find nothing";
  } else if (!ipPattern.test(input) && !domainPattern.test(input)) {
    error.content = "Invalid IP address or domain";
  }

  return error;
};

export default validateInput;
