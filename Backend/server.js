import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import RouteIndex from "./routes/index.js";
import RouteUser from "./routes/users.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit:"30mb" , extended: true}))

app.use(cors())


app.use("/movie", RouteIndex)
app.use("/user", RouteUser )

const PORT = process.env.PORT

mongoose.set('strictQuery', false);

mongoose.connect(process.env.CONNECTION_URL , { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    app.listen(PORT, () => {
        console.log(`Express is listening on Port ${PORT} and connected to db`)
    })
}).catch((error) =>{
    console.log(error.message)
})


