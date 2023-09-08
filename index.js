import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import clientRoutes from "./routes/clientRoutes.js"
import { connectDB } from "./db.js";
import { errorHandler } from "./middlewares/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.text({ type: "text/xml" }));
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use("/api/users", userRoutes);
app.use("/api/client", clientRoutes);
app.get("/api/policy", async (req, res) => {
  res.sendFile(path.join(__dirname, "server", "index.html"));
});

app.use(errorHandler);
connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server started at ${PORT}`)))
  .catch((err) => console.log(err));
