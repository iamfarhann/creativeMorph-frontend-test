import { Dispatch } from 'redux';
import { Payload, AuthActionTypes } from './types';

const auth = (dataPayload: Payload) => {
  return (dispatch: Dispatch) => {
    const initialPayload: Payload = {
      loader: true,
    };
    dispatch(requestInit(initialPayload));
    // call any backend api here ...

    // now we call another dispatcher...
    const apiPayload: Payload = {
      loader: false,
      auth: 'user authenticated successfully',
    };
    dispatch(success(apiPayload));
  };
  function requestInit(payload: Payload) {
    return { type: AuthActionTypes.AUTH_INIT, payload };
  }
  function success(payload: Payload) {
    return { type: AuthActionTypes.AUTH_SUCCESSFUL, payload };
  }
  function failure(payload: Payload) {
    return { type: AuthActionTypes.AUTH_FAILURE, payload };
  }
};
export default { auth };
