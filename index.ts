import express from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
var cors = require("cors");
import fs from "fs";
import { ISong } from "./ISong";
import { addSong, getSongById, getSongs,  updateSong, deleteSong } from "./routes";
import { readSongsFromFile } from "./read-write";



const PORT: number = parseInt(process?.env?.PORT_HTTP_SERVER_NODE || "3001");
// const PORT : number = parseInt('3002');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


//routes
// app.get("/", (req: Request, res: Response) => {
//   res.send("WORKS");
// });
app.get("/getSongs", getSongs);
app.get("/getSongById/:id", getSongById);

app.post("/addSong", addSong);
app.put("/updateSong", updateSong);
app.delete("/deleteSong", deleteSong);

app.listen(PORT, () => {
  //when server opens read data from file into songs array of ISongs
  readSongsFromFile();
  console.log(`a pornit serverul pe portul: ${PORT}`);
  // console.log(process?.env)
});

//
