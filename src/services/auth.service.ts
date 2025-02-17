import { HttpException } from "../exceptions/httpException";
import { prisma } from "../database/database"
import { User } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || 'pass'

export class AuthService{
    static async register(user: User){
        const findUser = await prisma.user.findUnique({where: {email: user.email}})
        if(findUser) throw new Error(`${user.email} already exists`)

        const passwordEncrypted = await bcrypt.hash(user.password, 10)
        user.password=''

        return await prisma.user.create({
            data:{
                ...user,
                password: passwordEncrypted
            },
            omit:{
                password: true
            }
        })
    }
    
    static async login(email: string, password: string){
        const findUser = await prisma.user.findUnique({where: {email}})
        if(!findUser) throw new HttpException(401, 'Invalid user or password')

        const isPasswordCorrect = await bcrypt.compare(password, findUser.password)
        if(!isPasswordCorrect) throw new HttpException(401, 'Invalid user or password')

        const token = jwt.sign(
            {id: findUser.id, email: findUser.email}, 
            TOKEN_PASSWORD, 
            {expiresIn: "1h"}
        )

        return token
    }
}