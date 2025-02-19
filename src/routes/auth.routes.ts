import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { loginValidation, registerValidation } from '../middlewares/validators.middleware'
import { ValidationMiddleware } from '../middlewares/validation.middleware'

const router = Router()

router.post('/register', registerValidation, ValidationMiddleware, AuthController.register)
router.post('/login', loginValidation, ValidationMiddleware, AuthController.login)
router.post('/logout', loginValidation, ValidationMiddleware, AuthController.logout)
router.get('/user', AuthController.getAuthenticatedUser);

export default router