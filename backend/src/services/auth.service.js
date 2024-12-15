import createHttpError from "http-errors";
import validator from "validator";
import { UserModel } from "../models/index.js";
import bcrypt from "bcrypt";
import { verify } from "../utils/token.util.js";


export const createUser = async (userData) => {
  const { name, email, picture, status, password } = userData;

  // check if fields are empty
  if (!name || !email || !password) {
    throw createHttpError.BadRequest("Please fill in all fields");
  }

  // check name length
  if (
    !validator.isLength(name, {
      min: 2,
      max: 16,
    })
  ) {
    throw createHttpError.BadRequest(
      "Name must be between 2 and 16 characters"
    );
  }

  // check status length
  if (status && status.length > 64) {
    throw createHttpError.BadRequest("Status must be less than 64 characters");
  }

  // check if email address is valid
  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest("Invalid email address");
  }

  // check if user already exist
  const checkDb = await UserModel.findOne({ email });
  if (checkDb) {
    throw createHttpError.Conflict(
      "Please try again with a different email address, this email already exist!!"
    );
  }

  // check password length
  if (!validator.isLength(password, { min: 6, max: 128 })) {
    throw createHttpError.BadRequest(
      "Please make sure your password is between 6 and 128 characters"
    );
  }

  // hash password ----->to be done in the user model

  // adding user to database
  const user = await new UserModel({
    name,
    email,
    picture,
    status,
    password,
  }).save();

  return user;
};

export const signUser = async (email, password) => {
  const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();

  // check if user exist
  if (!user) {
    throw createHttpError.NotFound("Invalid email");
  }

  // check if password is correct
  let passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    throw createHttpError.NotFound("Invalid password");
  }

  return user;
};

export const verifyToken = async (token, secret) => {
  let check = await verify(token, secret);
  return check;
};
