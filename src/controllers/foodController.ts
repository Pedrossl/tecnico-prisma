import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

export const getFoods = async (req: Request, res: Response) => {
  const foods = await prisma.food.findMany();
  res.json(foods);
};

export const createFood = async (req: Request, res: Response) => {
  const { name, price } = req.body;
  const food = await prisma.food.create({ data: { name, price } });
  res.status(201).json(food);
};
