import {Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config();

let client;

export const pgClient = ()  =>{
    if(!client){
        client = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT),
        });
    }
    return client;
}