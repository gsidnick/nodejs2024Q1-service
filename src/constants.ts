import * as dotenv from 'dotenv';

dotenv.config();

export const DEFAULT_PORT = 8080;
export const PORT: number = Number(process.env.PORT) || DEFAULT_PORT;
