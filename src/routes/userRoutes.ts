import express from "express";
import {
  index,
  show,
  store,
  borrowBook,
  returnBook,
} from "../controllers/userController";
import { validate } from "../middleware/validation";
import {
  createUserSchema,
  returnBookSchema,
} from "../validators/userValidator";

const router = express.Router();

router.get("/", index);
router.get("/:id", show);
router.post("/", validate(createUserSchema), store);
router.post("/:id/borrow/:bookId", borrowBook);
router.post("/:id/return/:bookId", validate(returnBookSchema), returnBook);

export default router;
