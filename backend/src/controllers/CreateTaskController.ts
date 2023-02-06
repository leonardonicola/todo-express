import { Request, Response } from "express";
import { CreateTaskService } from "../services/CreateTaskService";

export class CreateTaskController{
    async handle(req:Request, res: Response){
        const {name, done} = req.body
        
        const service = new CreateTaskService()
        
        const result = await service.execute({name, done})

        return res.json(result)
    }
}