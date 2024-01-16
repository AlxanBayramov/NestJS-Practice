import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


@Injectable()
export class ValidateCustomerMiddleware implements NestMiddleware {
    use(req:Request,res:Response,next:NextFunction){
        const {authorization} = req.headers
        if(!authorization) throw  new HttpException('User not authed',HttpStatus.FORBIDDEN)
        // if(!authorization) return res.status(403).send({error:'not auth'})
        if(authorization=='123')  next()
        else throw  new HttpException('Invalid token', HttpStatus.FORBIDDEN)
       
    }
}