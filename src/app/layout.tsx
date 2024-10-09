import Sidebar from "@/components/AdminSidebar/AdminSidebar";
import "./globals.css";
import { AppWrapper } from "@/lib/context";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Articles</title>
      <meta name="description" content="A list of articles " />
      <body>
        <Toaster richColors position="top-center" />
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
