import { User } from "src/app/models/user.models";

export interface AuthState {
	user: User | null;
	token: string | null;
	isAuth: boolean;
}