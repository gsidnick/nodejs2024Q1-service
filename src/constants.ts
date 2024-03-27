import * as dotenv from 'dotenv';

dotenv.config();

export const DEFAULT_PORT = 8080;
export const DEFAULT_SALT = 10;
export const DEFAULT_SECRET_KEY = 'secret123123';
export const DEFAULT_SECRET_REFRESH_KEY = 'secret123123';
export const DEFAULT_EXPIRE_TIME = '1h';
export const DEFAULT_REFRESH_EXPIRE_TIME = '24h';

export const PORT: number = Number(process.env.PORT) || DEFAULT_PORT;
export const SALT: number = Number(process.env.CRYPT_SALT) || DEFAULT_SALT;
export const SECRET_KEY =
  String(process.env.JWT_SECRET_KEY) || DEFAULT_SECRET_KEY;
export const SECRET_REFRESH_KEY =
  String(process.env.JWT_SECRET_REFRESH_KEY) || DEFAULT_SECRET_REFRESH_KEY;
export const EXPIRE_TIME =
  String(process.env.TOKEN_EXPIRE_TIME) || DEFAULT_EXPIRE_TIME;
export const REFRESH_EXPIRE_TIME =
  String(process.env.TOKEN_REFRESH_EXPIRE_TIME) || DEFAULT_REFRESH_EXPIRE_TIME;
