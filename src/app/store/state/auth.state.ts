import { UserLogin } from "src/app/models/auth.models";
import { User } from "src/app/models/user.models";


export interface AuthState {
  isAuthenticated: boolean;
  user: User | UserLogin | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};
