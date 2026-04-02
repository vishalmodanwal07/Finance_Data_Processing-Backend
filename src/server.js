import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/dbConnection.js";

dotenv.config({
    path: "./.env"
});

const port = process.env.PORT || 3000;

connectDB()
.then(()=>{
    app.listen(port , ()=>{
    console.log(`app is up and running on port : http://localhost:${port} `);
});
})
.catch((err) => {
    console.log("MongoDB connection error" , err);
    process.exit(1);
})



