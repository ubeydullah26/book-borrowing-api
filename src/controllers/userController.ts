import { Request, Response, NextFunction } from "express";
import UserModel from "../models/User";

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModel.getAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await UserModel.getUserWithBooks(parseInt(id));
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
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
    await UserModel.create({ name });
    res.status(201).send();
  } catch (err) {
    next(err);
  }
};

export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.id);
    const bookId = parseInt(req.params.bookId);

    const borrow = await UserModel.borrowBook(userId, bookId);

    if (!borrow) {
      res
        .status(400)
        .json({ error: "Book is already borrowed or not available" });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const returnBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.id);
    const bookId = parseInt(req.params.bookId);
    const { score } = req.body;

    if (typeof score !== "number" || score < 0 || score > 10) {
      return res.status(400).json({
        error: "Invalid score. Score must be a number between 0 and 10",
      });
    }

    const returned = await UserModel.returnBook(userId, bookId, score);

    if (!returned) {
      res.status(400).json({
        error: "Book was not borrowed by this user.",
      });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
