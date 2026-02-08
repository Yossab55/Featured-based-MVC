// In the name of Cross +
import joi from "joi";

const joiTypes = {
  getObject: function getObject(schema) {
    return joi.object(schema);
  },

  getString: function getString() {
    return joi.string();
  },

  getNumber: function getNumber() {
    return joi.number();
  },

  getBoolean: function getBoolean() {
    return joi.boolean();
  },

  getDate: function getDate() {
    return joi.date();
  },

  getEmail: function getEmail() {
    return joi.string().email();
  },

  getBinary: function getBinary() {
    return joi.binary();
  },

  getArray: function getArray() {
    return joi.array();
  },

  getDate: function getDate() {
    return joi.date();
  },

  getRef: function reference(column) {
    return joi.ref(column);
  },
};

export { joiTypes };
