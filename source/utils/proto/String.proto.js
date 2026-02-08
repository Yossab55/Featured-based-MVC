String.prototype.toCapitalize = function toCapitalize() {
  const value = this.toString();
  if (value == undefined) {
    return "";
  }

  return value[0].toUpperCase() + value.slice(1);
};

String.prototype.toSnakeCase = function toSnakeCase() {
  const value = this.toString();
  const ACode = 65;
  const ZCode = 90;
  let result = value;
  if (value == undefined) return "";
  for (let i = 0; i < value.length; i++) {
    const charCode = value[i].charCodeAt();
    const isNumber = Number(value[i]) == value[i];
    if ((charCode >= ACode && charCode <= ZCode) || isNumber) {
      const firstPart = value.slice(0, i);
      const secondPart = value.slice(i + 1);
      result = `${firstPart}_${value[i].toLocaleLowerCase()}${secondPart}`;
      break;
    }
  }
  return result;
};

console.log("hello".toSnakeCase());
