export interface User  {
  id: number;
  email: string;
  rolesObj: UserRoles;
	rolesArr: UserBackendRoleItem[];
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
	roles: UserBackendRoleItem[];
}

export interface UserBackendRoleItem {
	UserRole: UserBackendRole;
  createdAt: Date;
  id: number;
  name: string;
  updatedAt: Date;

}

export interface UserBackendRole {
	createdAt: Date;
  updatedAt: Date;
  id: number;
  roleId: number;
  userId: number
}

export interface UserUpdateObj {
	id: number;
	email: string;
	password: string | null;
	fio: string;
	newRole: string;
}

export interface UserBackendUpdate {
	id: number;
	email: string;
	password: string;
	fio: string;
}

export interface UserBackendUpdateRole {
	name: string;
	userId: number;
}



