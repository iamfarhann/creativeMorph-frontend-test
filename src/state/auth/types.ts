export interface AuthState {
  loader: boolean;
  auth: string;
}
export interface Payload {
  loader: boolean;
  auth?: string;
}
export interface Action {
  payload: Payload;
  type: string;
}
// ACTION TYPES
export enum AuthActionTypes {
  AUTH_INIT = 'AUTH_INIT',
  AUTH_SUCCESSFUL = 'AUTH_SUCCESSFUL',
  AUTH_FAILURE = 'AUTH_FAILURE',
  AUTH_CLEAR_STATE = 'AUTH_CLEAR_STATE',
}
