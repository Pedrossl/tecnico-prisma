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

export const getPersonById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const person = await prisma.person.findUnique({
    where: { id: Number(id) },
  });
  if (person) {
    res.json(person);
  } else {
    res.status(404).json({ error: "Person not found" });
  }
};
