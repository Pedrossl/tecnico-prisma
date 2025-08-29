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

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await prisma.order.findUnique({
    where: { id: Number(id) },
    include: { person: true, food: true },
  });
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: "Order not found" });
  }
};
