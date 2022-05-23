import express from "express";
import { Request, Response } from "express";
import { ISong } from "./ISong";
import {
  songs,
  readSongsFromFile,
  writeSongsToFile,
  changeValueOfSongs,
} from "./read-write";
import { filterSongs, searchSongs, sortSongs } from "./searchUtilities";
import { changeSong, removeASong } from "./utilities";
const { randomUUID } = require("crypto");

//GET
export const getSongs = (req: Request, res: Response) => {
  let songsToSend = songs;
  ///
  const searchParam = req.query.search ? req.query.search.toString().toLowerCase() : "";
  const filterBy = req.query.filterBy ? req.query.filterBy.toString() : "";
  const sortBy = req.query.sortBy ? req.query.sortBy.toString() : "";
  ///
  //apply search, filter, sort
  songsToSend = searchSongs(songsToSend, searchParam);
  songsToSend = filterSongs(songsToSend, filterBy);
  songsToSend = sortSongs(songsToSend, sortBy);
  res.send(songsToSend);
};

export const getSongById = (req: Request, res: Response) => {
  const id = req.params.id;

  const songByID = songs.find((song) => {
    return song.id === id;
  });
  res.send(songByID);
};

////
//POST
export const addSong = (req: Request, res: Response) => {
  const newSong = req.body;
  //add an id
  newSong.id = randomUUID();

  //
  // console.log(newSong);
  songs.push(newSong);
  //after modifing the array update the file
  writeSongsToFile();
  res.send(newSong);
};

//UPDATE

export const updateSong = (req: Request, res: Response) => {
  const modifiedSong = req.body;
  //changeValuePfSongs changes the songs array
  //with the values returnd from changeSong
  changeValueOfSongs(changeSong(modifiedSong, songs));
  //update in file
  writeSongsToFile();
  res.send(`Song update succesfuly`);
};
//DELETE

export const deleteSong = (req: Request, res: Response) => {
  const songToDelete = req.body;
  let tempSongs = removeASong(songToDelete, songs);

  if (tempSongs.length == songs.length) {
    console.log("Won't delete");

    res.status(404);
    res.send("Could not delete");
  } else {
    console.log("Will delete");
    
    changeValueOfSongs(tempSongs);
    //update the file
    writeSongsToFile();
    res.send("Deleted");
    // res.send(`Song with id ${songToDelete.id} have been deleted`);
  }
};

////
