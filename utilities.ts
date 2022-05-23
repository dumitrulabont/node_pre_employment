import { ISong } from "./ISong";

export const removeASong = (songToDelete: ISong, songs : ISong[]): ISong[] => {
  //CHEKC IF EXISTS
  const tempSongs = songs.filter((item: any) => {
    return item.id !== songToDelete.id;
  });
console.log(tempSongs.length != songs.length);

  return tempSongs;
};

export const changeSong = (modifiedSong: ISong, songs : ISong[]): ISong[] => {
  const tempSongs = songs.map((item: any) => {
    return item.id == modifiedSong.id ? { ...item, ...modifiedSong } : item;
  });
  return tempSongs;
};
