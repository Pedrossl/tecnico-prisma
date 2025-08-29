import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

export const getOrders = async (req: Request, res: Response) => {
  const orders = await prisma.order.findMany({
    include: { person: true, food: true },
  });
  res.json(orders);
};

export const createOrder = async (req: Request, res: Response) => {
  const { personId, foodId, quantity } = req.body;
  const order = await prisma.order.create({
    data: { personId, foodId, quantity },
  });
  res.status(201).json(order);
};
