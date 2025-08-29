import { Router } from "express";
import { createOrder, getOrders } from "../controllers/orderController";

const orderRoutes = Router();

orderRoutes.get("/", getOrders);
orderRoutes.post("/", createOrder);

export default orderRoutes;
