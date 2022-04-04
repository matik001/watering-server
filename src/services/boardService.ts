import { getDb } from "../configs/database";
import { Board } from "../entity/board";
import { Flower } from "../entity/flower";
import boardRouter from "../routes/boardRouter";

export const getBoard = async (id:string)=>{
    const board_id = parseInt(id);
    if(isNaN(board_id))
        return null;
    const board = await getDb().getRepository(Board).findOne({
      where:{
        id: board_id,
      },
      relations:[
        'flowers'
      ]
    });
    if(!board){
        return null;
    }
    return board;
}
export const countSleepTime = (board:Board)=>{
    const nextWateringTime = board.lastWatering.getTime()+24*3600*1000;
    const now = new Date().getTime();
    const waitingTime = nextWateringTime - now;
    let sleepTime = 0;
    if(waitingTime > 0){
      sleepTime = Math.floor(Math.min(waitingTime, board.maxSleepTime*1000)/1000);
    }
    return sleepTime;
}
export const countSleepTo = (board:Board)=>{
    const sleepSec = countSleepTime(board);
    const nowSec = Math.floor(new Date().getTime()/1000);
    return new Date((nowSec+sleepSec)*1000)
}
export const createBoard = async (name:string)=>{
  const lastWatering = new Date(0);
  const board = {
    flowers: [
      {
        wateringTime: 10
      } as Flower,
      {
        wateringTime: 10
      } as Flower,
      {
        wateringTime: 10
      } as Flower,
      {
        wateringTime: 10
      } as Flower,
      
    ],
    lastWatering: lastWatering,
    name: name,
    maxSleepTime: 60,
  } as Board;
  return await getDb().getRepository(Board).save(board);
}