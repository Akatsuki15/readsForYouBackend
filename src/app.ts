import express, {Response, Request} from 'express'
import authRouter from './routes/auth.routes'
import userRouter from './routes/user.routes'
import bookRouter from './routes/book.routes'
import genreRouter from './routes/genre.routes'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import morgan from 'morgan'

const app = express()

app.use(cors({
    origin: ['http://localhost:5173', 'https://readsforyoufront.onrender.com', '*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-type', 'Authorizacion']
}))

app.use(express.json())

app.use(helmet())
app.use(compression())
app.use(cookieParser())
app.use(morgan('tiny'))

const limiter = rateLimit({
    max: 100,
    windowMs: 1000 * 15 * 60 //15 minutos
})

app.use(limiter)

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/books', bookRouter)
app.use('/api/genres', genreRouter)

app.get('/', (req: Request, res: Response)=>{
    res.send('Bienvenido al backend (api)')
})

export default app