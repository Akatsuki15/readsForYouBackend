import { Router } from "express"
import { UserControler } from "../controllers/user.controller"
import { isAuthenticate } from "../middlewares/auth.middleware"

const router = Router()

router.get('/profile', isAuthenticate, UserControler.profile)
router.get('/', isAuthenticate, UserControler.getAll)

export default router