import { Store, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer, { AppState } from '../state';
interface InitialAppState {}
const initialState: InitialAppState = {};
export default function configureStore(): Store<AppState> {
  const store: Store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  return store;
}
