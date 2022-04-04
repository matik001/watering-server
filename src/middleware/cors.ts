import { NextFunction, Request, Response } from "express";

const allowCorsMiddleware = (req:Request, res:Response, next:NextFunction)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
}

export default allowCorsMiddleware;