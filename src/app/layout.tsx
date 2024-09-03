import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" href="/favicon.ico" type="image/x-icon" />
				{/* TODO: add space grotesk font from google fonts  */}
				<link
					href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
				<link rel="apple-touch-icon" href="/images/swapfast-icon.jpg" />
				<meta name="theme-color" content="#000000" />
			</head>
			<body className="leap-ui dark">{children}</body>
		</html>
	);
}
