// Watch the toturia video of this form here: https://www.youtube.com/watch?v=oGq9o2BxlaI&t=1477s&ab_channel=WebDevEducation

"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


import { useUsers } from "@/services/api";

const formSchema = z.object({
	username: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(3),
});

export default function Signup() {
	const { registerUser } = useUsers();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	const handleSubmit = async (values: any) => {
		registerUser.mutate(values);
		form.reset();
	};

	return (
		<div className="flex flex-col mx-auto items-center justify-start py-20 max-w-4xl min-h-screen">
			{registerUser.isSuccess ? (
				<h1>verification email was sent to you email address</h1>
			) : (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="max-w-md w-full flex flex-col gap-4"
					>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input placeholder="Username" type="text" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Email address</FormLabel>
										<FormControl>
											<Input
												placeholder="Email address"
												type="email"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												placeholder="Password"
												type="password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>

						<Button type="submit" className="w-full">
							Submit
						</Button>
					</form>
				</Form>
			)}
		</div>
	);
}


