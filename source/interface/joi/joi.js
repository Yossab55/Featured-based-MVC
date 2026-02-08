// In the name of cross +
import { joiTypes } from "./joiTypes.js";
import { validationJoiOptions } from "../../config/Joi.config.js";
import { appError } from "../../error/app.error.js";
import { getStack } from "../../utils/helpers.js";
// What I really need is to interface the mySchema!!

function initSchema(dataType) {
  // this args is for Object mySchema
  var args = Array.from(arguments).slice(1);
  const value = joiTypes[`get${dataType.toCapitalize()}`].call(null, ...args);
  if (!value)
    throw appError.custom(
      "Joi error Data Type",
      dataType,
      "http://test",
      getStack(),
    );
  const joiInterface = {
    mySchema: value,
    minimum: function minimum(number) {
      this.mySchema = this.mySchema.min(number);
      return this;
    },

    maximum: function maximum(number) {
      this.mySchema = this.mySchema.max(number);
      return this;
    },

    addLength: function addLength(number) {
      this.mySchema.length(number);
      return this;
    },

    addItems: function addItems() {
      const addItems = Array.from(arguments);

      this.mySchema = this.mySchema.items(...addItems);
      return this;
    },

    addRequired: function addRequired() {
      this.mySchema = this.mySchema.required();
      return this;
    },

    addDefault: function addDefault(value) {
      this.mySchema = this.mySchema.default(value);
      return this;
    },
    /**
     *
     * @param  filed: could be number, date or joi.ref("column")
     * @returns
     */
    addGreater: function addGreater(filed) {
      this.mySchema = this.mySchema.greater(filed);
      return this;
    },

    getSchema: function getSchema() {
      return this.mySchema;
    },

    getDescribe: function getDescribe() {
      return this.mySchema.describe();
    },

    getSyncValidator: function getSyncValidator() {
      //this will not work in syncValidation because there is no binding
      const mySchema = this.mySchema;
      return function syncValidate(payload) {
        return mySchema.validate(payload, validationJoiOptions);
      };
    },

    getAsyncValidator: function getAsyncValidator() {
      const mySchema = this.mySchema;
      return async function asyncValidate(payload) {
        return await mySchema.validateAsync(payload, validationJoiOptions);
      };
    },

    getUpdateSyncValidator: function getUpdateSyncValidator() {
      const schemaWithoutRequired = deleteAllRequiredProp(this);
      //when you update you need at least one field to update
      const schema = schemaWithoutRequired.minimum(1).getSchema();
      return function updateSyncValidator(payload) {
        return schema.validate(payload, validationJoiOptions);
      };
    },

    getUpdateAsyncValidator: function getUpdateAsyncValidator() {
      const schemaWithoutRequired = deleteAllRequiredProp(this);
      const schema = schemaWithoutRequired.minimum(1).getSchema();
      return async function asyncValidate(payload) {
        return await schema.validateAsync(payload, validationJoiOptions);
      };
    },
  };

  return joiInterface;
}

function deleteAllRequiredProp(model, depth = 5) {
  const terms = "$_terms";
  const temp = "$_temp";
  const ruleset = "ruleset";
  const flags = "_flags";
  const presence = "presence";

  let bigSchema;
  if (model.mySchema) bigSchema = model.mySchema;
  else bigSchema = model;

  if (depth == 0)
    appError.custom(
      "Schema was to be big we reached depth 5",
      model,
      "http://test",
      getStack(),
    );
  if (bigSchema.type == "object") {
    const schemas = bigSchema[terms].keys;
    for (const prop in schemas) {
      const schemaObject = schemas[prop].schema;

      if (schemaObject.type == "object" || schemaObject.type == "array") {
        deleteAllRequiredProp(schemaObject, --depth);
      }

      if (schemaObject[flags]) {
        delete schemaObject[flags][presence];
      }
    }
  }

  if (bigSchema.type == "array") {
    const schemas = bigSchema[terms].items;
    for (const prop of schemas) {
      const schemaObject = prop;

      if (schemaObject.type == "object" || schemaObject.type == "array") {
        deleteAllRequiredProp(schemaObject, --depth);
      }

      if (schemaObject[flags]) {
        delete schemaObject[flags][presence];
        schemaObject[temp][ruleset] = null;
      }
    }
  }

  // here is a check if the object itself has required on not
  if (bigSchema.type !== "array" || bigSchema.type !== "object") {
    if (bigSchema[flags]) {
      delete bigSchema[flags][presence];
      bigSchema[temp][ruleset] = null;
    }
  }

  if (model.mySchema) {
    model.mySchema = bigSchema;
    return model;
  }

  return bigSchema;
}
export { initSchema, deleteAllRequiredProp };
