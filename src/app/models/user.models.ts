export interface User  {
  id: number;
  email: string;
  password: string;
  roles: UserRoles;
}

export interface UserRoles {
	isUser: boolean;
	isAdmin: boolean;
}

export interface UserBackend {
  id: number;
  email: string;
  password: string;
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