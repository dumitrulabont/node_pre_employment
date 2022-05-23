import fs from "fs";
import {ISong} from './ISong'

export let songs: ISong[] = [];

export const changeValueOfSongs = (newSongs : ISong[]) => {
  songs = newSongs
}
export const readSongsFromFile = () => {
    fs.readFile('./songsData.json','utf-8',(err,data)=> {
      if(err){
        console.error(err)
      }
      else {
        songs = JSON.parse(data.toString());

      }
    })
  };
  
export  const writeSongsToFile = () => {
    fs.writeFile('./songsData.json', JSON.stringify(songs), (err)=> {
      if(err) {
        console.error(err);
      }
    });
  };

