import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex  min-h-screen">
      {/* Sidebar */}
      <div className="min-w-52 z-9999 ">
        <AdminSidebar />
      </div>
      {/* Konten Utama */}
      <div className="flex-1 p-4 ">{children}</div>
    </div>
  );
};

export default HomeLayout;
