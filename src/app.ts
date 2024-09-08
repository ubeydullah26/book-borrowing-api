import express from "express";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", userRoutes);
app.use("/books", bookRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
