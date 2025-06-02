import {config} from 'dotenv';

config();

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || 3307;
export const DB_USER = process.env.DB_USER || 'dbgustavo';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'messi12';
export const DB_DATABASE = process.env.DB_DATABASE || 'dollarstore_ACT';

export const PORT2 = process.env.PORT2 || 3000;
export const DB_HOST2 = process.env.DB_HOST2 || 'localhost';
export const DB_PORT2 = process.env.DB_PORT2 || 3307;
export const DB_USER2 = process.env.DB_USER2 || 'dbgustavo';
export const DB_PASSWORD2 = process.env.DB_PASSWORD2 || 'messi12';
export const DB_DATABASE2 = process.env.DB_DATABASE2 || 'dollarstore_ACT_datamart';




//export const PORT = process.env.PORT;
//export const DB_HOST = process.env.DB_HOST;
//export const DB_PORT = process.env.DB_PORT;
//export const DB_USER = process.env.DB_USER;
//export const DB_PASSWORD = process.env.DB_PASSWORD;
//export const DB_DATABASE = process.env.DB_DATABASE;