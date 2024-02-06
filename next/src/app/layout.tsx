import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import Nav from "@/components/nav";
const inter = Inter({ subsets: ["latin"] });

import ThemeProvider from "@/components/theme-provider";
import ReactQueryProvider from "@/components/react-query-provider";

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
				<main className="relative flex flex-col min-h-screen">
					<div className="flex-grow flex-1">
						{/* The theme provider is causing a warning, after search found someone said on production goes */}
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							<Nav />
							<ReactQueryProvider>{children}</ReactQueryProvider>
						</ThemeProvider>
					</div>
				</main>
			</body>
		</html>
	);
}
