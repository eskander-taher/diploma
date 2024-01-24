import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit() {
		console.log(username, email, password);
	}

	return (
		<div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
			<h2 className="text-2xl font-semibold mb-4">Login</h2>
			<form>
				<div className="mb-4">
					<label
						htmlFor="email"
						className="block text-gray-700 text-sm font-semibold mb-2"
					>
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="password"
						className="block text-gray-700 text-sm font-semibold mb-2"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				<button
					type="button"
					onClick={handleSubmit}
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
				>
					Submit
				</button>
			</form>
			<p className="mt-4 text-sm">
				Don't have an account?{" "}
				<Link to="/register" className="text-blue-500 hover:underline">
					Register here
				</Link>
			</p>
		</div>
	);
}
