import { Request, Response, NextFunction } from "express";
import BookModel from "../models/Book";

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await BookModel.getAll();
    res.json(books);
  } catch (err) {
    next(err);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const book = await BookModel.getBookWithScore(parseInt(id));
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    await BookModel.create({ name });
    res.status(201).send();
  } catch (err) {
    next(err);
  }
};
