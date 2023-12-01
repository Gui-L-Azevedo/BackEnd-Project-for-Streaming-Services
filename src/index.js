import express, { Router } from "express";
import bodyParser from "body-parser";
import { Movies, Auth, Shows, Uploads } from "./app/controllers/index.js";

const app = express();
const port = 27017;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/movies", Movies);
app.use("/auth", Auth);
app.use("/shows", Shows);
app.use("/uploads", Uploads);

console.log(`Servidor rodando no link: http://localhost:${port}`);
app.listen(port);
