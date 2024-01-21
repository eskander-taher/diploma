import { Request } from "express";

export interface User {
	id?: Number;
	username: String;
	email: String;
	password: String;
	role?: String;
	verified?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IExpressRequestWithUser extends Request {
	user?: User;
}
