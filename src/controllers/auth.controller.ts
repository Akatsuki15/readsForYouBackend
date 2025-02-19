import { AuthService } from "../services/auth.service";
import {Response, Request, NextFunction} from 'express'
import jwt from "jsonwebtoken";

const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || 'pass'

export class AuthController{
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

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = req.body
            console.log('looo',userData.email, userData.password)
            const { token, user } = await AuthService.login(userData.email, userData.password)
            //TODO inyectar cookie al cliente
            console.log(token, user)

            res.cookie('token', token, {
                maxAge: 60 * 60 * 1000 * 3, 
                httpOnly: true, 
                secure: process.env.COOKIE_SECURE ? process.env.COOKIE_SECURE === "true" : true,
                sameSite: 'strict', 

            })
            res.status(201).json({ message: 'Login successfully:', user })
        } catch (error) {
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

    static async getAuthenticatedUser (req: Request, res: Response, next: NextFunction){
        try {
            const token = req.cookies.token;
            if (!token)  res.status(401).json({ message: "No autenticado" });
            const decoded = jwt.verify(token, TOKEN_PASSWORD);
            res.status(200).json(decoded)
        } catch (error) {
            next(error)
        }
    };
}