import { combineReducers } from 'redux';
import auth from './auth/reducer';
import programmer from './programmer/reducer';
import tinder from './tinder/reducer';
import { ProgrammerState } from './programmer/types';
import { AuthState } from './auth/types';
import { TinderState } from './tinder/types';
export interface AppState {
  auth: AuthState;
  programmer: ProgrammerState;
  tinder: TinderState
}
const rootReducer = combineReducers<AppState>({
  auth,
  programmer,
  tinder,
});
export default rootReducer;
