import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const rale = Raleway({
	weight: ["400"],
	style: ["normal"],
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "CTech Weather App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={rale.className}>{children}</body>
		</html>
	);
}
