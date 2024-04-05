export interface User  {
  id: number;
  email: string;
  password: string;
  roles: UserRoles;
}


export interface MeetupBackendUser {
	id: number;
	email: string;
	password: string;
	fio: string;
}

export interface UserRoles {
	isUser: boolean;
	isAdmin: boolean;
}

export interface UserAuthBackend {
  id: number;
  email: string;
  password: string;
  roles: UserBackendAuthRoleItem[];
}

export interface UserBackendAuthRoleItem {
  UserRole: UserBackendAuthRole;
  createdAt: Date;
  id: number;
  name: string;
  updatedAt: Date;
}

export interface UserBackendAuthRole {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  roleId: number;
  userId: number
}

export interface UserBackend {
	id: number;
  email: string;
  password: string;
  fio: string;
}