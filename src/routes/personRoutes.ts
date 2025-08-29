import { Router } from "express";
import { createPerson, getPersons } from "../controllers/personController.ts";

const personRouter = Router();

personRouter.get("/", getPersons);
personRouter.post("/", createPerson);

export default personRouter;
