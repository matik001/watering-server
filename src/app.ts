import "reflect-metadata";

import express, {Express} from 'express';

import ENV_KEYS from './configs/envKeys';
import allowCorsMiddleware from "./middleware/cors";
import boardRouter from "./routes/boardRouter";
import { AppDataSource } from "./configs/database";
console.log(`Running in ${ENV_KEYS.IS_PRODUCTION ? 'production' : 'development'}`);

const app = express();

app.use(express.json());
// app.use(express.urlencoded({
//   extended: true
// }));
app.use(allowCorsMiddleware);
app.use(express.static('./static'));

// app.use(catch404);
// app.use(catch403);
// app.use(catch500);

app.use(boardRouter);

const start = async ()=>{
  try {
    app.listen(ENV_KEYS.PORT);
  } catch (error) {
    console.log(error);    
  }
}


start();

