import {
    TinderState,
    DogPhoto,
    SeenPhotoActionTypes,
    GetListPhotoActionTypes
  } from './types';
  import { Dispatch } from 'redux';
  import {
    getPhotosList,
  } from './photosArray';
  
  const GetPhotos = () => {
    return async (dispatch: Dispatch) => {
      const payload = {
        loader: true,
      };
      dispatch(requestInit(payload));
      const photosArray = await getPhotosList();
      const successPayload = {
        loader: false,
        photosArray,
      };
      dispatch(requestSuccess(successPayload));
    };
    function requestInit(payload: any) {
      return { type: GetListPhotoActionTypes.GET_PHOTO_INIT, payload };
    }
    function requestSuccess(payload: any) {
      return { type: GetListPhotoActionTypes.GET_PHOTO, payload };
    }
  };
  const AddPhoto = (url: string,status: boolean) => {
    return (dispatch: Dispatch) => {
      const payload = {
        loader: true,
      };
      dispatch(requestInit(payload));
      const newObject:DogPhoto = {
          photoLink:url,
          LikedOrDisliked:status
      }
      const successPayload = {
        loader: false,
        seenPhotosArray: newObject
      };
      dispatch(requestSuccess(successPayload));
    };
    function requestInit(payload: any) {
      return { type: GetListPhotoActionTypes.GET_PHOTO_INIT, payload };
    }
    function requestSuccess(payload: any) {
      return { type: SeenPhotoActionTypes.ADD_PHOTO, payload };
    }
  };
  
  export default { GetPhotos, AddPhoto};
  