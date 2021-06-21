import * as dotenv from 'dotenv';
dotenv.config();

if (
  !process.env.PORT ||
  !process.env.DATABASE_URL ||
  !process.env.DATABASE_USER ||
  !process.env.DATABASE_PASS ||
  !process.env.DATABASE_NAME
) {
  process.exit(1);
}

/**
 * service port number
 * @type {number}
 */
export const PORT: number = parseInt(process.env.PORT as string, 10);

/**
 * mongodb database url
 * @type {string}
 */
export const DATABASE_URL = `${process.env.DATABASE_DEFAULT}${process.env.DATABASE_URL}`;

/**
 * mongodb database user
 * @type {string}
 */
export const DATABASE_USER: string = process.env.DATABASE_USER as string;

/**
 * mongodb database user password
 * @type {string}
 */
export const DATABASE_PASS: string = process.env.DATABASE_PASS as string;

/**
 * mongodb database name
 * @type {string}
 */
export const DATABASE_NAME: string = process.env.DATABASE_NAME as string;
