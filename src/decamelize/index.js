import { isObject } from "../utils";

const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]*$/;

function toCase(key, { casing, excludeMixedCasing }) {
  if (excludeMixedCasing && !ALPHANUMERIC_REGEX.test(key)) {
    return key;
  }

  const separator =
    {
      upper: "_",
      snake: "_",
      dot: ".",
      kebab: "-",
      pascal: "",
    }[casing] || "_";

  const newKey = key
    .split("")
    .reduce((result, char, i, array) => {
      if (casing === "pascal") {
        return i ? [...result, char] : [char.toUpperCase()];
      }

      if (/[A-Z]/.test(char) && !/[A-Z]/.test(array[i - 1])) {
        return [...result, `${separator}${char.toLowerCase()}`];
      }

      return [...result, char];
    }, [])
    .join("");

  return casing === "upper" ? newKey.toUpperCase() : newKey;
}

function decamelizeArray(inputArray, options) {
  return inputArray.map((value) => {
    if (Array.isArray(value)) {
      return decamelizeArray(value, options);
    }

    if (isObject(value)) {
      return decamelize(value, options);
    }

    return value;
  });
}

function decamelize(inputObject, inputOptions) {
  const defaultOptions = { casing: "snake", excludeMixedCasing: false };
  const options = isObject(inputOptions) ? { ...defaultOptions, ...inputOptions } : defaultOptions;

  if (Array.isArray(inputObject)) {
    return decamelizeArray(inputObject, options);
  }

  if (!isObject(inputObject)) {
    return inputObject;
  }

  return Object.fromEntries(
    Object.entries(inputObject).map(([key, value]) => {
      if (isObject(value)) {
        return [toCase(key, options), decamelize(value, options)];
      }

      if (Array.isArray(value)) {
        return [toCase(key, options), decamelizeArray(value, options)];
      }

      return [toCase(key, options), value];
    })
  );
}

export default decamelize;
