import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import ApolloWrapper from "./ApolloWrapper";

export const metadata: Metadata = {
  title: "Injury Tracker - Lief",
  description: "",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">      
        <body>
          <ApolloWrapper>
            <UserProvider>
              {children}
            </UserProvider>
          </ApolloWrapper>
        </body>
      </html>
  )
}
