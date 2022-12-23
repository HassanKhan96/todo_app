import { sign } from "jsonwebtoken";

export const createAccessToken = async (data: {
  id: number;
  email: string;
}) => {
  const token = sign(data, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "1m",
  });
  return token;
};

export const createRefreshToken = async (data: {
  id: number;
  email: string;
}) => {
  const token = sign(data, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: "1d",
  });
  return token;
};
