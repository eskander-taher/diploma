"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Nav() {
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const auth_token = localStorage.getItem("auth_token"); // Or retrieve from server-side storage
		setToken(auth_token);
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("auth_token"); // Clear the token from localStorage
		setToken(null); // Update the component state
		// Optionally, redirect to a login page or other appropriate route
		window.location.href = "/"; // Example redirection
	};

	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<Link href="/" legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							Home
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href="/sign-up" legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							Sign Up
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href="/sign-in" legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							Sign In
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link href="/admin" legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							Admin
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				{token && (
					<>
						<NavigationMenuItem>
							<Link href="/profile" legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Profile
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<button onClick={handleLogout}>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Logout
								</NavigationMenuLink>
							</button>
						</NavigationMenuItem>
					</>
				)}
				<div>
					<ModeToggle />
				</div>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
