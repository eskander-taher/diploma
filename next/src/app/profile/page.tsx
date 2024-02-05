"use client";

import { useState, useEffect } from "react";
import axios from "axios"; // Or use `fetch` directly

export default function Profile() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const auth_token = localStorage.getItem("auth_token"); // Or retrieve from server-side storage
		setToken(auth_token);
		if (auth_token) {
			setIsLoggedIn(true);
		}
	}, []);

	// const fetchData = async (token) => {
	// 	try {
	// 		const response = await axios.get("/api/user/profile", {
	// 			headers: { Authorization: `Bearer ${token}` },
	// 		});
	// 		setProfileData(response.data);
	// 	} catch (error) {
	// 		console.error("Error fetching profile:", error);
	// 		// Handle errors gracefully (e.g., retry, redirect to login)
	// 	}
	// };

	return (
		<div>
			{isLoggedIn && token ? (
				<div>
					<h1>{token}</h1>
				</div>
			) : (
				<p>Please log in to view your profile.</p>
			)}
		</div>
	);
}
