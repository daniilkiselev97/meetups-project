import { User } from "src/shared/models/user.models";

export interface AuthState {
	user: User | null;
	token: string | null;
	isAuth: boolean;
}

