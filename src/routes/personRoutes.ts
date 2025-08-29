import { Router } from "express";
import * as personController from "../controllers/personController";

const personRouter = Router();

personRouter.get("/", personController.getPersons);
personRouter.get("/:id", personController.getPersonById);
personRouter.post("/", personController.createPerson);

export default personRouter;
