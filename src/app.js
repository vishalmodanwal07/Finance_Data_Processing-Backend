import express from "express";
import cors from "cors";

const app = express();

//basic configuration
app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({
    extended : true,
    limit : "16kb"
}));

//cors configuration
app.use(cors({
 origin : process.env.CORS_ORIGIN,
 credentials : true,
 methods : ["GET" ,"POST" , "PUT" , "PATCH" , "DELETE" , "OPTIONS"],
 allowedHeaders : ["Content-Type" , "Authorization"]
}));

//import the routes

import healthCheckRouter from "./routes/healthCheck.routes.js";
import authRouter from "./routes/auth.routes.js"


app.use("/api/v1/healthcheck" , healthCheckRouter);
app.use("/api/v1/auth" , authRouter);


app.get("/" , (req, res)=>{
      res.send("app is running");
})

export default app;