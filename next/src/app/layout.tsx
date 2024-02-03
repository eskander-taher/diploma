import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "../components/NavBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "УУТиТ | СМУ",
	description: "a heaven for young scientists",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={cn("relative h-full font-sans antialiased", inter.className)}>
				{/* The theme provider is causing a warning, maybe on production the error ith go */}
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<NavBar />
					<main className="relative flex flex-col min-h-screen">
						<div className="flex-grow flex-1">{children}</div>
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
