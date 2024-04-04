import express from "express";
import mongoose from "mongoose";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import UserRoutes from "./Users/routes.js";
import session from "express-session";
import "dotenv/config";

const localDBConnection = 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(process.env.DB_CONNECTION_STRING || localDBConnection);
const app = express();
const port = process.env.PORT || 4000;
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));
app.use(express.json());
ModuleRoutes(app);
CourseRoutes(app);
UserRoutes(app);
Lab5(app);
Hello(app);
app.listen(port);
