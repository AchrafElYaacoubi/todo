import argon2 from "argon2";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import { validLoginUser, validSignupUser } from "./utils/validUser.js";
import { User } from "./models/index.js";
import projectRoutes from './routes/project.js';
import todoRoutes from './routes/todo.js';

const PORT = 8000;
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Hello!" });
});

app.post("/signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!validSignupUser(email, password, username)) {
        return res.status(400).json({ error: "provide valid data" });
    }
    const hashPassword = await argon2.hash(password);
    const newUser = await User.create({ email, password: hashPassword, username });
    await newUser.save();

    const token = jwt.sign({ user: newUser.toJSON() }, process.env.SECRET_KEY);

    return res.status(200).json({
      user: newUser.toJSON(),
      token: token
    });
  } catch (error) {
    console.error("SIGNUP ERROR: ", error.message);
    return res.json({ error: "user name or email already taken" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validLoginUser(email, password)) {
      return res.status(400).json({ error: "provide valid data" });
    }

    const loginUser = await User.findOne({where: { email }});
    if(!loginUser) {
        return res.status(401).json({ error: "wrong credentials" });
    }
    // check password
    const isCorrectPassword = await argon2.verify(loginUser.password, password);
    if (isCorrectPassword) {
      const token = jwt.sign(
        { user: loginUser.toJSON() },
        process.env.SECRET_KEY
      );

      delete loginUser.password;

      return res.status(200).json({
        user: loginUser.toJSON(),
        token: token
      });
    } else {
      return res.status(401).json({ error: "wrong credentials" });
    }
  } catch (error) {
    console.error("LOGIN ERROR: ", error.message);
    return res.status(503).json({ error: "service unavailable" });
  }
});


app.use("/projects", projectRoutes);
app.use("/todos", todoRoutes);


app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});