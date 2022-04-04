import { Router } from "express";
import { body } from "express-validator";
import { getBoardInfo, getBoardsInfo, postCreateBoard, postGoToSleep, postWateredAll } from "../controllers/boardController";
import validatorMiddleware from "../middleware/validatorMiddleware";

const boardRouter = Router();
boardRouter.get("/boards", getBoardsInfo);
boardRouter.get("/board/:id", getBoardInfo);
boardRouter.post("/board",[
    body('name')
        .isString().withMessage("name must be string")
        .notEmpty({ignore_whitespace: true}).withMessage("name cannot be empty")
        .trim(),
], validatorMiddleware, postCreateBoard);
boardRouter.post("/board/:id/go-sleep", postGoToSleep);
boardRouter.post("/board/:id/watered-all", postWateredAll);

export default boardRouter;