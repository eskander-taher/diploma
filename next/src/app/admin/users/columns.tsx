"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import axios from "axios";

export type User = {
	id: number;
	username: string;
	email: string;
	password: string;
	role: "USER" | "ADMIN" | "MODERATOR";
	verified?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
};

async function changeUserRole(userId: any, newRole: any) {
	try {
		const response = await axios.patch(`http://localhost:3001/admin/change-role/${userId}`, {
			role: newRole,
		});

		// Assuming the server responds with JSON data
		const responseData = response.data;

		// Handle the response as needed
		console.log(responseData);
	} catch (error: any) {
		// Handle errors
		console.error("Error changing user role:", error);

		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.error("Response data:", error.response.data);
			console.error("Response status:", error.response.status);
		} else if (error.request) {
			// The request was made but no response was received
			console.error("No response received from the server");
		} else {
			// Something happened in setting up the request that triggered an Error
			console.error("Error setting up the request:", error.message);
		}
	}
}

import { useUpdateUser } from "@/services/api";

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: "username",
		header: "Username",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "verified",
		header: "Email Verified",
	},
	{
		accessorKey: "role",
		header: "Role",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const user = row.original;
			const updateUserMutaion = useUpdateUser();
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Change user role</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => updateUserMutaion.mutate({ ...user, role: "ADMIN" })}
						>
							Admin
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => updateUserMutaion.mutate({ ...user, role: "MODERATOR" })}
						>
							Moderator
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => updateUserMutaion.mutate({ ...user, role: "USER" })}
						>
							User
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
