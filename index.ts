import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import dbConnection from "./src/config/db.config";
import routes from "./src/routes/index.routes";
configDotenv();
const app = express();
const PORT= process.env.PORT;
app.use(cors());
app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes );
app.listen(PORT,()=>{
    console.log("Server started on port ", PORT);
    dbConnection();
})
app.get('/',(req, res)=>{
    res.status(200).json({message:"welcome to points be"});
})
