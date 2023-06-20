import express from 'express';
import HelloController from './controllers/hello-controller.js';
import UserController from "./controllers/users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./controllers/users/auth-controller.js";
import cors from 'cors'
import session from "express-session";
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/tuiter");
const app = express()
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/tuiter'
mongoose.connect(CONNECTION_STRING);
app.use(
  session({
    secret: "nikhilk",
    resave: false,
    saveUninitialized: true,
  })
 );
 
 app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
 );
 
app.use(express.json());
AuthController(app)
HelloController(app)
UserController(app)
TuitsController(app)


app.listen(process.env.PORT || 4000);