import express from "express";
import issuesRoutes from "./routes/issues.routes";

const app = express();

app.use(express.json());

app.use("/issues", issuesRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
