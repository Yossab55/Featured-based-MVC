import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/JWT.config.js";

const sign = makeItPromisify(jwt.sign);
const verify = makeItPromisify(jwt.verify);

const options = {
  expiresIn: jwtConfig.expire,
};

const JWT = Object.create(jwt);
JWT.createToken = async function createToken(payload) {
  return await sign(payload, jwtConfig.secret, options);
};

// verify is also used to decodeToken
JWT.verifyToken = async function verifyToken(token, secret, params) {
  return await verify(token, secret, params);
};

export { JWT };
