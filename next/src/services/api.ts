import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const BASE_URL = "http://localhost:3001";
const axiosInstance = axios.create({ baseURL: BASE_URL });

import type { User } from "@/app/admin/users/columns";

export const registerUser = async (data: User) => {
	return (await axiosInstance.post("users", data)).data;
};

export const useRegisterUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: User) => registerUser(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};

export const getUsers = async () => {
	return (await axiosInstance.get("users")).data.data;
};

export const useGetUsers = () => {
	return useQuery({
		queryKey: ["users"],
		queryFn: getUsers,
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
