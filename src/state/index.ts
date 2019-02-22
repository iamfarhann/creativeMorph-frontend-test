import { combineReducers } from 'redux';
import auth from './auth/reducer';
import programmer from './programmer/reducer';
import { ProgrammerState } from './programmer/types';
import { AuthState } from './auth/types';
export interface AppState {
  auth: AuthState;
  programmer: ProgrammerState;
}
const rootReducer = combineReducers<AppState>({
  auth,
  programmer,
});
export default rootReducer;
