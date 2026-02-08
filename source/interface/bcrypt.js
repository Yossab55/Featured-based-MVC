import bcrypt from "bcrypt";
import { bcryptConfig } from "../config/bcrypt.config.js";

const Bcrypt = Object.create(bcrypt);

const saltRounds = bcryptConfig.salt_rounds;

const salt = await Bcrypt.genSalt(saltRounds);

Bcrypt.hashIt = async function hashIt(text) {
  const hashedText = await this.hash(text, salt);
  return hashedText;
};

Bcrypt.compareBoth = async function compareBoth(plainText, hashed) {
  const result = await this.compare(plainText, hashed);
  return result;
};

export { Bcrypt };
