import { Request, Response, NextFunction } from "express"
import { HttpException } from "../exceptions/httpException"
import { UserService } from "../services/user.service"

export class UserControler{
    static async profile(req: Request, res: Response, next: NextFunction){
        try {
            const email = req.user?.email
            if(!email) throw new HttpException(404, 'Email not found')
            const user = await UserService.getByEmail(email)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction){
        try{
            const user = await UserService.getAll()
            res.status(200).json(user)
        }catch(error){
            next(error)
        }
    } 
}