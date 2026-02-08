function initFieldValue(value) {
  const field = {};
  // init value for this value
  //because it's the basic value to start
  let valueAfterCapitalize = value.toCapitalize();
  const values = [
    "ObjectId",
    "String",
    "Number",
    "Date",
    "Binary",
    "Array",
    "Boolean",
    "Bool",
    "UUID",
  ];

  if (!values.includes(valueAfterCapitalize)) throw new Error(); // throw here error

  if (valueAfterCapitalize == "Bool") valueAfterCapitalize = "Boolean";

  field.type = valueAfterCapitalize;

  const initField = {
    field: function getField() {
      return field;
    },

    required: function requiredRule() {
      field.required = true;
      return this;
    },

    min: function minRule(value) {
      field.minLength = value;
      return this;
    },

    max: function maxRule(value) {
      field.maxLength = value;
      return this;
    },

    refRule: function refRule(modelName) {
      field.ref = modelName;
      return this;
    },

    defaultRule: function defaultRule(value) {
      field.default = value;
      return this;
    },

    unique: function uniqueRule() {
      field.unique = true;
      return this;
    },

    trim: function trimRule() {
      field.trim = true;
      return this;
    },
  };
  return initField;
}

export { initFieldValue };
