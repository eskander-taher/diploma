import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Nav from "../components/Nav";
const inter = Inter({ subsets: ["latin"] });

import Provider from "@/utils/Providers";

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
				{/* The theme provider is causing a warning, after search found someone said on production goes */}
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Nav />
					<main className="relative flex flex-col min-h-screen">
						<div className="flex-grow flex-1">
							<Provider>{children}</Provider>
						</div>
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
