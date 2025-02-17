import { HttpException } from "@/exceptions/httpException";
import { BookService } from "@/services/book.service";
import { NextFunction, Request, Response } from "express";

export class BookController{
    static async getById(req: Request, res: Response, next: NextFunction){
        try {
            const id = Number.parseInt(req.params.id)
            const book = await BookService.getById(id)
            res.status(200).json(book)
        } catch (error) {
            next(error)
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction){
        try{
            const { title } = req.query;
            const book = await BookService.getAll(title as string)
            res.status(200).json(book)
        }catch(error){
            next(error)
        }
    }
    
    static async create(req: Request, res: Response, next: NextFunction){
        try {
            const bookData = req.body
            const idUser = 1
                //TODO validar el body
                const newbook = await BookService.create(idUser, bookData)
            res.status(200).json({message:'Book save successfully', newbook})
        } catch (error) {
            next(error)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction){
        try {
            const bookData = req.body
            const id = Number.parseInt(req.params.id)
            
            const updatebook = await BookService.update(id, bookData)
            res.status(200).json({message:'Book save successfully', updatebook})
        } catch (error) {
            next(error)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction){
        try {
            const id = Number.parseInt(req.params.id)
            
            const deletedbook = await BookService.delete(id)
            res.status(200).json({message:'Book save successfully', deletedbook})
        } catch (error) {
            next(error)
        }
    }

    static async rate(req: Request, res: Response, next: NextFunction){
        try {
            const id = Number.parseInt(req.params.id)
            const {value} = req.body
            const userId = req.user?.id
            
            if (!userId) throw new HttpException(400, "User creator ID is required");

            await BookService.rate(userId, id, value)
            res.status(200).json({message:'book rate successfully'})
        } catch (error) {
            next(error)
        }
    }

    static async getRate(req: Request, res: Response, next: NextFunction){
        try {
            const id = Number.parseInt(req.params.id)
            
            const book = await BookService.getRate(id)
            res.status(200).json({message:'Book rate successfully', book})
        } catch (error) {
            next(error)
        }
    }

    static async getMyRate(req: Request, res: Response, next: NextFunction){
        try {
            const id = Number.parseInt(req.params.id)
            const idUser = req.user?.id

            if (!idUser) throw new HttpException(400, "User creator ID is required");
            
            const book = await BookService.getMyRate(idUser, id)
            res.status(200).json({message:'Book rate successfully', book})
        } catch (error) {
            next(error)
        }
    }
}