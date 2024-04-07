export interface BackendRole {
	id: number;
	name: string;
}

export interface TransformedObjRoles {
	[name:string]: BackendRole;
}