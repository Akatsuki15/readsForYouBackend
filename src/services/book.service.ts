import { HttpException } from "../exceptions/httpException"
import { prisma } from "../database/database"
import { Book } from "@prisma/client"

export class BookService{
    static async getById(id: number){
        const findBook = await prisma.book.findUnique(
            { where: {id}}
        )
        if(!findBook) throw new HttpException(404, 'Book not found')
        
        return findBook
    }

    static async getAll(title: string = ''){
        const books = await prisma.book.findMany({
            where: title ? {
                title: {
                    contains: title
                }
            } : {},
            orderBy: {
                createdAt: 'desc'
            },
            take: 100
        })

        return books
    }

    static async create(idUser: number, book: Book){
        return await prisma.book.create({
            data:{
                ...book,
                idUserCreator: idUser
            }
        })
    }

    static async update(id: number, book: Book){
        const findbook = prisma.book.findUnique({where: {id}})
        if(!findbook) throw new HttpException(404, 'Book not exist')
        return await prisma.book.update({
            where: {id},
            data:{
                ...book
            }
        })
    }

    static async delete(id: number){
        return prisma.book.delete({where: {id}})
    }

    static async rate(idUser: number, idBook: number, value: number){
        const findbook = prisma.book.findUnique({where: {id: idBook}})
        if(!findbook) throw new HttpException(404, 'Book not exists')

        if(value < 0 || value > 5) throw new HttpException(400, 'Rate value must be between 0 and 5')
        await prisma.rates.upsert({
            where: {
                idUser_idBook:{
                    idUser, idBook
                }
            },
            update: {
                value
            },
            create: {
                idUser, idBook, value
            }
        })
    }

    static async getRate(idBook: number){
        const ratingStats = await prisma.rates.aggregate({
            where: { idBook },
            _avg: { value: true},
            _count: { value: true}
        })

        return {
            totalRatings: ratingStats._count.value,
            averateRatings: ratingStats._avg.value?.toFixed(2)
        }
    }

    static async getMyRate(idUser: number, idBook: number){
        const findbook = prisma.book.findUnique({where: {id: idBook}})
        if(!findbook) throw new HttpException(404, 'Book not exists')

        await prisma.rates.findUnique({
            where: {
                idUser_idBook:{
                    idUser, idBook
                }
            },
            select: {value: true}
        })
    }
}