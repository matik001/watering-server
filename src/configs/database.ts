import { join } from "path";
import {Connection, createConnection, Entity, getConnectionOptions} from "typeorm";
import ENV_KEYS from "./envKeys";



import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: ENV_KEYS.TYPEORM_CONNECTION,
    host: ENV_KEYS.TYPEORM_HOST,
    port: ENV_KEYS.TYPEORM_PORT,
    username: ENV_KEYS.TYPEORM_USERNAME,
    password: ENV_KEYS.TYPEORM_PASSWORD,
    database: ENV_KEYS.TYPEORM_DATABASE,
    entities: [
        './src/entity/*'
    ],
    migrations: [
        './src/migrations/*'
    ], 
    synchronize: false,
    logging: false,
})

AppDataSource.initialize()
    .then(async () => {
        // if(ENV_KEYS.IS_PRODUCTION)
        //     await AppDataSource.runMigrations();
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
export const getDb = ()=>{
    return AppDataSource!;
}
    
