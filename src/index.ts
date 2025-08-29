import express from "express";
import personRouter from "./routes/personRoutes.ts";

const app = express();
app.use(express.json());

app.use("/persons", personRouter);
// app.use("/foods", foodRoutes);
// app.use("/orders", orderRoutes);

app.listen(3000, () => console.log("🚀 API running at http://localhost:3000"));
