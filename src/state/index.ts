import { combineReducers } from 'redux';
import auth from './auth/reducer';
import { AuthState } from './auth/types';
export interface AppState {
  auth: AuthState;
}
const rootReducer = combineReducers<AppState>({
  auth,
});
export default rootReducer;
