import {
    TinderState,
    DogPhoto,
    SeenPhotoActionTypes,
    GetListPhotoActionTypes
  } from './types';
  import { element } from 'prop-types';
  
  const defaultState: TinderState = {
    photosArray: [],
    seenPhotosArray: [],
    loader: false,
    current:0
  };
  
  export default function tinder(state = defaultState, action: any) {
    switch (action.type) {
      case GetListPhotoActionTypes.GET_PHOTO_INIT:
        return {
          ...state,
          loader: action.payload.loader,
        };
      case GetListPhotoActionTypes.GET_PHOTO:
        return {
          ...state,
          loader: action.payload.loader,
          photosArray: action.payload.photosArray,
        };
      case SeenPhotoActionTypes.ADD_PHOTO:
        return {
          ...state,
          current: state.current+1,
          loader: action.payload.loader,
          seenPhotosArray: [
            ...state.seenPhotosArray,
            action.payload.seenPhotosArray,
          ],
        };
      default:
        return {
          ...state,
        };
    }
  }
  