import { NextFunction, Request, Response } from "express"

const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || 'pass'

export const isCreator = (req: Request, res: Response, next: NextFunction): any => {

    const idUser = req.user?.id
    const idCreatorBook = req.body.book.idCreator

    try{
        if(idUser === idCreatorBook) {
            next()
        }else{
            res.status(401).json({error: 'Access denied, no admin'})
        }
    }catch(error){
        res.status(401).json({error: 'Invalid token'})
    }

}