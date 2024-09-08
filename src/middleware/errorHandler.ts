import { Request, Response, NextFunction } from "express";
import { ValidationError } from "joi";

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: "Validation Error",
      details: err.details.map((detail) => detail.message),
    });
  }

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Internal Server Error" : err.message;

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
