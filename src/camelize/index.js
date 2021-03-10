import { isObject } from "../utils";

function toCamelCase(key) {
  return key
    .split(/-|_|\./)
    .map((word, i, array) => {
      // in case of camel or pascal case there will be only one item
      if (array.length === 1) {
        return `${word[0].toLowerCase()}${word.substring(1)}`;
      }

      const casedWord = word.toLowerCase();

      if (i) {
        return `${casedWord[0].toUpperCase()}${casedWord.substring(1)}`;
      }

      return casedWord;
    })
    .join("");
}

function camelizeArray(inputArray) {
  return inputArray.map((value) => {
    if (Array.isArray(value)) {
      return camelizeArray(value);
    }

    if (isObject(value)) {
      return camelize(value);
    }

    return value;
  });
}

function camelize(inputObject) {
  if (Array.isArray(inputObject)) {
    return camelizeArray(inputObject);
  }

  if (!isObject(inputObject)) {
    return inputObject;
  }

  return Object.fromEntries(
    Object.entries(inputObject).map(([key, value]) => {
      if (isObject(value)) {
        return [toCamelCase(key), camelize(value)];
      }

      if (Array.isArray(value)) {
        return [toCamelCase(key), camelizeArray(value)];
      }

      return [toCamelCase(key), value];
    })
  );
}

export default camelize;
