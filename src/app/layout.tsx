import Sidebar from "@/components/AdminSidebar/AdminSidebar";
import "./globals.css";
import { AppWrapper } from "@/lib/context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
