import { AuthState, Payload } from '../../state/auth/types';

export interface Props {
  auth: AuthState;
  authenticate: (payload: Payload) => void;
}
export interface State extends AuthState {}
