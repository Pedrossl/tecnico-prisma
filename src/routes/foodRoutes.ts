import { Router } from "express";
import { createPerson, getPersons } from "../controllers/personController.ts";

const foodRoutes = Router();

foodRoutes.get("/", getPersons);
foodRoutes.post("/", createPerson);

export default foodRoutes;
