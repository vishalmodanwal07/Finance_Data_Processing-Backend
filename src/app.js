import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalLimiter } from "./middlewares/rateLimiter.middleware.js";


const app = express();

//basic configuration
app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({
    extended : true,
    limit : "16kb"
}));
app.use(cookieParser());

//cors configuration
app.use(cors({
 origin : process.env.CORS_ORIGIN,
 credentials : true,
 methods : ["GET" ,"POST" , "PUT" , "PATCH" , "DELETE" , "OPTIONS"],
 allowedHeaders : ["Content-Type" , "Authorization"]
}));


app.use(function (req, res, next) {
  console.log(req.method + " " + req.url);
  next();
});

app.use(globalLimiter);

//import the routes

import healthCheckRouter from "./routes/healthCheck.routes.js";
import authRouter from "./routes/auth.routes.js";





app.use("/api/v1/healthcheck" , healthCheckRouter);
app.use("/api/v1/auth" , authRouter);


//global error handler
app.use((err, req, res, next) => {
 return res
 .status(err.statusCode || 500)
 .json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || []
  });
});

export default app;