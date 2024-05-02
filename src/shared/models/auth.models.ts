import { User } from "./user.models";

export interface IsAuth {
	isAuth: boolean;
}

export interface UserLogin {
	email: string;
	password: string;
}

export interface UserRegistration {
	email: string;
	password: string;
}

export interface AuthToken {
	token: string;
}

export interface UserInfo {
	user: User;
	token: string;
}

export interface UserRegistrationData {
	email: string | null;
	password: string | null;
	fio: string | null;
}


