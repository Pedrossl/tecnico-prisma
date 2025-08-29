import { Router } from "express";
import * as foodController from "../controllers/foodController";

const foodRoutes = Router();

foodRoutes.get("/", foodController.getFoods);
foodRoutes.get("/:id", foodController.getFoodById);
foodRoutes.post("/", foodController.createFood);

export default foodRoutes;
