import { GenreController } from "@/controllers/genre.controller";
import { isAuthenticate } from "@/middlewares/auth.middleware";
import { ValidationMiddleware } from "@/middlewares/validation.middleware";
import { genreValidation } from "@/middlewares/validators.middleware";
import { Router } from "express";

const router = Router();

router.get("/", isAuthenticate, GenreController.getAll);
 router.get("/:id", isAuthenticate, GenreController.getById);
router.post("/", isAuthenticate, genreValidation, ValidationMiddleware, GenreController.create);
router.put("/:id", isAuthenticate, genreValidation, ValidationMiddleware, GenreController.update);
router.delete("/:id",isAuthenticate, GenreController.delete); 

export default router;