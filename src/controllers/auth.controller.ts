import { AuthService } from "../services/auth.service";
import {Response, Request, NextFunction} from 'express'

export class AuthControler{
    static async register(req: Request, res: Response){
        try{
            const userData = req.body
            
            const newUser = await AuthService.register(userData)
            AuthService.register(userData)
            res.status(201).json({message:'User register successfully', newUser})
        }catch(error){
            res.status(409).json({message: 'Fallo al registrar al usuario ' + error})
        }
    }

    static async login(req: Request, res: Response, next: NextFunction){
        try{
            const userData = req.body
            
            const token = await AuthService.login(userData.email, userData.password)
            
            res.cookie('token', token, {
                maxAge: 60*60*1000, 
                httpOnly: true,
                secure: false, 
                sameSite: 'strict'
            })
            res.status(201).json({message:'Login successfully', token})
        }catch(error){
            next(error)
        }
    }

    static async logout(req: Request, res: Response, next: NextFunction){
        try {
            res.clearCookie('token')
            res.status(200).json({message:'Logout successfully'})
        } catch (error) {
            next(error)
        }
    }
}