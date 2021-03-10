import { isObject } from "../utils";

function toCase(key, casing) {
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

function decamelizeArray(inputArray, casing) {
  return inputArray.map((value) => {
    if (Array.isArray(value)) {
      return decamelizeArray(value, casing);
    }

    if (isObject(value)) {
      return decamelize(value, casing);
    }

    return value;
  });
}

function decamelize(inputObject, casing = "snake") {
  if (Array.isArray(inputObject)) {
    return decamelizeArray(inputObject, casing);
  }

  if (!isObject(inputObject)) {
    return inputObject;
  }

  return Object.fromEntries(
    Object.entries(inputObject).map(([key, value]) => {
      if (isObject(value)) {
        return [toCase(key, casing), decamelize(value, casing)];
      }

      if (Array.isArray(value)) {
        return [toCase(key, casing), decamelizeArray(value)];
      }

      return [toCase(key, casing), value];
    })
  );
}

export default decamelize;
