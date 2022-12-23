import { hash, compare } from "bcrypt";
import { InternalServerError } from "../utils/error";

export const hashPassword = async (password: string) => {
  try {
    const hashPass = await hash(password, 10);
    return hashPass;
  } catch (error) {
    throw new InternalServerError("Internal server error");
  }
};

export const comparePassword = async (password: string, hash: string) => {
  const decodedPassword = await compare(password, hash);
  return decodedPassword;
};
