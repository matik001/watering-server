import { RequestHandler } from "express";
import { getDb } from "../configs/database";
import { Board } from "../entity/board";
import { BoardSleepHistory } from "../entity/boardSleepHistory";
import { Flower } from "../entity/flower";
import { WateringHistory } from "../entity/wateringHistory";
import { countSleepTime, countSleepTo, createBoard, getBoard } from "../services/boardService";

export const getBoardsInfo: RequestHandler = async (req, res, next) => {
  const boards = await getDb().getRepository(Board).find({
    relations:[
      'flowers'
    ]
  });

  const data = boards.map((board)=>{
    return {
      sleepTime: countSleepTime(board),
      ...board,
    };
  });
  console.log(`${new Date().toTimeString()} get boards info`)

  return res.status(200).json(data);
};

export const getBoardInfo: RequestHandler = async (req, res, next) => {
  const board = await getBoard(req.params.id as string);
  if(!board){
    return res.status(400).json({error: "Board doesn't exists!"});
  }
  console.log(`${new Date().toTimeString()} get board info`)
  
  return res.status(200).json({
    sleepTime: countSleepTime(board),
    ...board
  });
};


export const postCreateBoard: RequestHandler = async (req, res, next) => {
  const {name} = req.body;
  await createBoard(name);

  return res.status(201).json({
    "message": "Created board!"
  });
}


export const postGoToSleep: RequestHandler = async (req, res, next) => {
  const board = await getBoard(req.params.id as string);
  if(!board){
    return res.status(400).json({error: "Board doesn't exists!"});
  }
 
  board.sleepTo = countSleepTo(board);
  await getDb().getRepository(Board).save(board);
  const sleepTime = countSleepTime(board)
  await getDb().getRepository(BoardSleepHistory).save({
    board: board,
    howLong: sleepTime,
    time: new Date()

  } as BoardSleepHistory);
  console.log(`${new Date().toTimeString()} go to sleep`)

  return res.status(200).json({
    sleepTime: sleepTime,
  });
}
export const postWateredAll: RequestHandler = async (req, res, next) => {
  const board = await getBoard(req.params.id as string);
  if(!board){
    return res.status(400).json({error: "Board doesn't exists!"});
  }
 
  board.lastWatering = new Date(); 
  await getDb().getRepository(Board).save(board);
  const sleepTime = countSleepTime(board)
  for (const flower of board.flowers) {
    await getDb().getRepository(WateringHistory).save({
      flower: flower,
      howLong: flower.wateringTime,
      time: new Date(),
      wasSuccessful: true
    } as WateringHistory);
  } 
  console.log(`${new Date().toTimeString()} watered`)
  return res.status(200).json({});
}