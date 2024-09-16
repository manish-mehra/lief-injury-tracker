import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import ApolloWrapper from "./ApolloWrapper"
import { AntdRegistry } from '@ant-design/nextjs-registry'

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
              <AntdRegistry>{children}</AntdRegistry>
            </UserProvider>
          </ApolloWrapper>
        </body>
      </html>
  )
}
