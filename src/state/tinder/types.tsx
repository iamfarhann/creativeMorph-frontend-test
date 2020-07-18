export interface TinderState {
    photosArray: DogPhoto[];
    seenPhotosArray: DogPhoto[];
    loader: boolean;
    current: number;
  }
  
  export interface DogPhoto {
    photoLink:string,
    LikedOrDisliked:boolean
  }
  
  export enum SeenPhotoActionTypes {
    ADD_PHOTO = 'ADD_PHOTO',
  }
  export enum GetListPhotoActionTypes {
    GET_PHOTO_INIT = 'GET_PHOTO_INIT',
    GET_PHOTO = 'GET_PHOTO',
  }
