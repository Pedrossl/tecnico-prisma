import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

export const getPersons = async (req: Request, res: Response) => {
  const persons = await prisma.person.findMany();
  res.json(persons);
};

export const createPerson = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const person = await prisma.person.create({
    data: { name, email },
  });
  res.json(person);
};
