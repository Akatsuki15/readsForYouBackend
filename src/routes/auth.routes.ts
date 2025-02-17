import { Router } from "express";
import { AuthControler } from "../controllers/auth.controller";
import { loginValidation, registerValidation } from '../middlewares/validators.middleware'
import { ValidationMiddleware } from '../middlewares/validation.middleware'

const router = Router()

router.post('/register', registerValidation, ValidationMiddleware, AuthControler.register)
router.post('/login', loginValidation, ValidationMiddleware, AuthControler.login)
router.post('/logout', loginValidation, ValidationMiddleware, AuthControler.logout)

export default router