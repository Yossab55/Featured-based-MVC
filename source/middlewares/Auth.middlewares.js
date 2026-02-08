//+ in the name of cross
import { JWT } from "../source/interface/JWT.js";
import { jwtConfig } from "../config/JWT.config.js";
// import { AppError } from "../source/error/AppError.js";
import { UNAUTHORIZED } from "../utils/constants/ResponseCode.js";
import { appError } from "../error/app.error.js";
import { getStack } from "../utils/helpers.js";

async function requiredAuth(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    const tokenDecoded = await JWT.verifyToken(token, jwtConfig.secret);
    req.user = { id: tokenDecoded.id };
    return next();
  }
  throw appError.unauthorized(token, "http://test", getStack());
}
export { requiredAuth };

async function isUserLoggedIn(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    try {
      const tokenDecoded = await verify(token, jwtConfig.secret);
      req.locals.user = { id: tokenDecoded.id };
      return next();
    } catch (error) {
      req.locals.user = null;
      return next();
    }
  } else {
    req.locals.user = null;
    return next();
  }
}

export { isUserLoggedIn };
