export function isObject(input) {
  return typeof input === "object" && !Array.isArray(input) && input != null;
}
