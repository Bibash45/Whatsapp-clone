import { sign } from "../utils/token.util.js";

export const generateToken = async (payload, expireIn, secret) => {
  let token = await sign(payload, expireIn, secret);
  return token;
};
