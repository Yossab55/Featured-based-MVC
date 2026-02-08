import env from "../utils/helpers.js";

const maxAge = (function getMilleSeconds() {
  const days = parseInt(env("JWT_EXPIRES"));
  const convertToMilleSeconds = 24 * 60 * 60 * 1000;
  const minusOneHour = 60 * 60 * 1000;
  const time = days * convertToMilleSeconds - minusOneHour;
  return time;
})();

export const cookieConfig = {
  httpOnly: true,
  maxAge,
};

export const cookieRemoveConfig = {
  httpOnly: true,
  maxAge: 1,
};
