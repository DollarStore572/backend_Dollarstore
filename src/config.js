import {config} from 'dotenv';

config();


export const PORT = process.env.PORT || 3001;
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || 3307;
export const DB_USER = process.env.DB_USER || 'dbgustavo';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'messi12';
export const DB_DATABASE = process.env.DB_DATABASE || 'dollarstore_act';




//export const PORT = process.env.PORT;
//export const DB_HOST = process.env.DB_HOST;
//export const DB_PORT = process.env.DB_PORT;
//export const DB_USER = process.env.DB_USER;
//export const DB_PASSWORD = process.env.DB_PASSWORD;
//export const DB_DATABASE = process.env.DB_DATABASE;