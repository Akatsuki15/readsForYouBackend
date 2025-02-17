import { isAuthenticate } from "../middlewares/auth.middleware";
import { BookController } from "../controllers/book.controller";
import { Router } from "express";
import { bookValidation, rateValidation } from "../middlewares/validators.middleware";
import { ValidationMiddleware } from "../middlewares/validation.middleware";

const router = Router()

router.get('/', isAuthenticate, BookController.getAll)
router.get('/:id', isAuthenticate, BookController.getById)
//POST Añadir una oferta nueva localhost:3000/api/bookts/  {body}
router.post('/', isAuthenticate, bookValidation, ValidationMiddleware, BookController.create)
//DELETE Borrar una oferta localhost:3000/api/bookts/XXXX
router.delete('/:id', isAuthenticate, BookController.delete)
//PUT Modificar una oferta localhost:3000/api/bookts/XXXXXX  {body}
router.put('/:id', isAuthenticate, bookValidation, ValidationMiddleware, BookController.update)

//Calificamos una oferta x  {body}
router.post('/:id/rate/', isAuthenticate, rateValidation, ValidationMiddleware, BookController.rate)
// Vemos que calificacion (total) se le ha dado a una oferta
router.get('/:id/rate/', isAuthenticate, BookController.getRate)
router.get('/:id/myRate/', isAuthenticate, BookController.getMyRate)

export default router