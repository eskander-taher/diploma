import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const BASE_URL = "http://localhost:3001";
const axiosInstance = axios.create({ baseURL: BASE_URL });

import type { User } from "@/app/admin/users/columns";

export function useUsers() {
	const getUsers = useQuery({
		queryKey: ["users"],
		queryFn: () => axiosInstance.get("users").then((res) => res.data.data),
	});

	const registerUser = useMutation({
		mutationFn: (data) => axiosInstance.post("users", data).then((res) => res.data.data),
	})

	return { getUsers, registerUser };
}


export const loginUser = async (data: User) => {
	return (await axiosInstance.post("login", data)).data.data;
};
export const useLoginUser = () => {
	return useMutation({
		mutationFn: (data: any) => loginUser(data),
		onSuccess: (data) => {
			console.log(data);
		},
	});
};

export const updateUser = async (updatedUser: User) => {
	return await axiosInstance.patch(`admin/change-role/${updatedUser.id}`, updatedUser);
};
export const useUpdateUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: User) => updateUser(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};
