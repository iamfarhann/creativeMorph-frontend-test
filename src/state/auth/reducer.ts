import { AuthActionTypes, AuthState } from './types';
const defaultState: AuthState = {
  loader: false,
  auth: '',
};

export default function authenticationReducer(state = defaultState, action: any) {
  switch (action.type) {
    case AuthActionTypes.AUTH_INIT:
      return {
        ...state,
        loader: action.payload.loader,
      };
    case AuthActionTypes.AUTH_SUCCESSFUL:
      return {
        ...state,
        loader: action.payload.loader,
        auth: action.payload.auth,
      };
    case AuthActionTypes.AUTH_FAILURE:
      return {
        ...state,
        loader: action.payload.loader,
        auth: action.payload.auth,
      };
    case AuthActionTypes.AUTH_CLEAR_STATE:
      return {
        ...state,
        loader: action.payload.loader,
        auth: action.payload.auth,
      };
    default:
      return {
        ...state,
      };
  }
}
