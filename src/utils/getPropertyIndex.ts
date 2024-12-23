type JsonObject = { [key: string]: any };

function getPropertyIndex<JsonObject>(obj: object, propertyName: string): number | undefined {
  const keys = Object.keys(obj);
  return keys.indexOf(propertyName);
}

export { getPropertyIndex};