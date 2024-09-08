import express from "express";
import { index, show, store } from "../controllers/bookController";
import { validate } from "../middleware/validation";
import { createBookSchema } from "../validators/bookValidator";

const router = express.Router();

router.get("/", validate(createBookSchema), index);
router.get("/:id", show);
router.post("/", store);

export default router;
