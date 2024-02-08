"use client";

import { useState, useEffect } from "react";
import axios from "axios"; // Or use `fetch` directly

export default function Profile() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState<string | null>(null);

	const [role, setRole] = useState<string | null>("");

	useEffect(() => {
		const auth_token = localStorage.getItem("auth_token"); // Or retrieve from server-side storage
		const role = localStorage.getItem("role");
		setToken(auth_token);
		if (auth_token) {
			setIsLoggedIn(true);
			setRole(role);
		}
	}, []);

	return (
		<div>
			{isLoggedIn && token ? (
				<div>
					<h1>your access token is:</h1>
					<h2>{role} profile</h2>
					<p>{token}</p>
				</div>
			) : (
				<p>Please log in to view your profile.</p>
			)}
		</div>
	);
}
