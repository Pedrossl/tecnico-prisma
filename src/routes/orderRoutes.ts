import { Router } from "express";
import * as orderController from "../controllers/orderController";

const orderRoutes = Router();

orderRoutes.get("/", orderController.getOrders);
orderRoutes.get("/:id", orderController.getOrderById);
orderRoutes.post("/", orderController.createOrder);

export default orderRoutes;
