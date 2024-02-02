import { Request } from "express";

export interface User {
	id?: number;
	username: string;
	email: string;
	password: string;
	role?: string;
	verified?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}


export interface IExpressRequestWithUser extends Request {
	user?: User;
}
