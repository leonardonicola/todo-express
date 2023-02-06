import { Request, Response } from "express";
import { GetTasksService } from "../services/GetTasksService";

export class GetTaskController{
    async handle(req:Request, res: Response){

        const service = new GetTasksService()

        const result = await service.execute()

        return res.json(result)
    }
}