import { ISong } from "./ISong";

export const searchSongs = (songsToSend: ISong[], searchParam: string) => {
  //if there were no search params return all songs
  if (!searchParam) {
    return songsToSend;
  }
  console.log(searchParam);
  let songsToReturn = [];
  songsToReturn = songsToSend.filter((item: any) => {

    return (
      item.name.toLowerCase().includes(searchParam) ||
      item.album.toLowerCase().includes(searchParam) ||
      item.artist.toLowerCase().includes(searchParam) ||
      item.genre.toLowerCase().includes(searchParam)
    );
  });
  //res.send(songsToReturn);
  return songsToReturn;
};

///////////

export const filterSongs = (songsToSend: ISong[], filterBy: string) => {
  //filter by genere only

  if (!filterBy) {
    return songsToSend;
  }
  let songsToReturn = [];
  songsToReturn = songsToSend.filter((item: any) => {

    return item.genre.toLowerCase() == filterBy?.toString().toLowerCase();
  });
  return songsToReturn;
};
///////////

export const sortSongs = (songsToSend: ISong[], sortBy: string ) => {
  if (!sortBy) {
    //default sorting will be "artistAZ"
    sortBy = "artistAZ"
    //return songsToSend;
  }
  let songsToReturn: ISong[] = [];
  switch (sortBy) {
    case "artistAZ":
      //sort
      songsToReturn = [...songsToSend].sort((a: any, b: any) => {
        if (a.artist < b.artist) return -1;
        if (a.artist > b.artist) return 1;
        return 0;
      });
      break;
    case "artistZA":
      songsToReturn = [...songsToSend].sort((a: any, b: any) => {
        if (a.artist > b.artist) return -1;
        if (a.artist < b.artist) return 1;
        return 0;
      });
      break;
    case "albumAZ":
      songsToReturn = [...songsToSend].sort((a: any, b: any) => {
        if (a.album < b.album) return -1;
        if (a.album > b.album) return 1;
        return 0;
      });
      break;
    case "albumZA":
      songsToReturn = [...songsToSend].sort((a: any, b: any) => {
        if (a.album > b.album) return -1;
        if (a.album < b.album) return 1;
        return 0;
      });
      break;
    default:
      return songsToSend;
      break;
  }
  return songsToReturn;
};
