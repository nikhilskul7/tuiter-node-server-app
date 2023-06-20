import express from 'express';
import HelloController from './controllers/hello-controller.js';
import UserController from "./controllers/users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./controllers/users/auth-controller.js";
import cors from 'cors'
import session from "express-session";
import mongoose from "mongoose";

const options = {
  connectTimeoutMS: 30000, // Increase the timeout value (in milliseconds)
};

const app = express()
app.set("trust proxy",1);
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/tuiter'
mongoose.connect(CONNECTION_STRING, options);
const db = mongoose.connection;
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});
app.use(
  session({
    secret: "nikhilk",
    resave: false,
    proxy:true,
    saveUninitialized: false,
    cookie:{
      sameSite:"none",
      secure:true,
    },
  })
 );
 app.use(cors({
  origin: ["https://a5--famous-dodol-bacd67.netlify.app", "http://localhost:3000", "https://a6--famous-dodol-bacd67.netlify.app"],
  methods: ["GET", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
}));

 app.use((req, res, next) => {
  const allowedOrigins = [ "https://a5--famous-dodol-bacd67.netlify.app","http://localhost:3000","https://a6--famous-dodol-bacd67.netlify.app"];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
  }
  

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, OPTIONS");

  res.header("Access-Control-Allow-Credentials", "true");

  res.header("Cache-Control", "no-cache, no-store, must-revalidate");

  next();
});

app.use(express.json());
AuthController(app)
HelloController(app)
UserController(app)
TuitsController(app)


app.listen(process.env.PORT || 4000);