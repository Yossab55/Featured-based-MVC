import { cookieConfig, cookieRemoveConfig } from "../config/Cookie.config.js";

function createCookie(res, content) {
  res.cookie("token", content, cookieConfig);
}

function deleteCookie(res) {
  res.cookie("token", null, cookieRemoveConfig);
}

export { createCookie, deleteCookie };
