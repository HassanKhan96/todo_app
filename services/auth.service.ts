import * as UserServices from "../services/user.service";
import { pool } from "../config/db.config";
import { UserDto } from "../interface/users/create.user.dto";
import { loginDto } from "../interface/auth/login.dto";
import { InternalServerError, NotFoundError } from "../utils/error";
import { comparePassword } from "../helpers/password.utils";
import * as JwtService from "../helpers/jwt.utils";

export const RegisterUser = async (userDto: UserDto) => {
  const newUser = await UserServices.createUser(userDto);
  const tokens = await createTokens(
    newUser.rows[0].id as number,
    newUser.rows[0].email
  );
  const { password, ...user } = newUser.rows[0];
  return { ...tokens, user };
};

export const LoginUser = async (loginDto: loginDto) => {
  const userExists = await UserServices.getUserByEmail(loginDto.email);
  if (userExists.rowCount === 0)
    throw new NotFoundError("Email or password is incorrect.");

  const decodePassword = await comparePassword(
    loginDto.password,
    userExists.rows[0].password
  );
  if (!decodePassword)
    throw new NotFoundError("Email or password is incorrect.");

  const lastLoginUpdate = await pool.query(
    "UPDATE users SET lastLogin = $1 WHERE id = $2",
    [new Date(), userExists.rows[0].id]
  );

  if (lastLoginUpdate.rows[0] > 0)
    throw new InternalServerError("Error occured during login.");

  const tokens = await createTokens(
    userExists.rows[0].id as number,
    userExists.rows[0].email
  );

  const { password, lastLogin, createdAt, ...user } = userExists.rows[0];

  return { ...tokens, user };
};

const createTokens = async (id: number, email: string) => {
  const accessToken = await JwtService.createAccessToken({
    id,
    email,
  });
  const refreshToken = await JwtService.createRefreshToken({
    id,
    email,
  });

  return { accessToken, refreshToken };
};
