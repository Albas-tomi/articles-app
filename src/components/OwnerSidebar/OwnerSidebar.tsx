"use client";
import React from "react";
import { BiUser } from "react-icons/bi";
import { GiArtificialHive } from "react-icons/gi";
import SidebarItems from "./SidebarItems";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const items = [
  {
    role: "owner",
    href: "/profile",
    icon: <CgProfile />,
    name: "Profile",
  },
  {
    role: "owner",
    href: "/dashboard",
    icon: <MdDashboard />,
    name: "Dashboard",
  },
];

const OwnerSidebar = () => {
  const router = useRouter();
  const role = Cookies.get("role");

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("username");
    router.refresh();
  };

  return (
    <div className="min-w-52 z-30 bg-white overflow-x-hidden fixed overflow-y-auto  min-h-screen border-r-indigo-300 shadow-md  text-black flex justify-between py-7 flex-col gap-3 items-center">
      <div className="mt-1 mb-3 flex w-full flex-col justify-start items-center  ">
        <Image
          src="/images/logo.svg"
          className="py-3"
          alt="logo"
          width={100}
          height={100}
        />
        {/* admin */}
        {items.map((item, index) => (
          <SidebarItems item={item} key={index} />
        ))}
      </div>
      <div className="w-full">
        <button
          onClick={() => handleLogout()}
          className="btn btn-ghost mb-4 w-full"
        >
          {" "}
          Logout{" "}
        </button>
      </div>
    </div>
  );
};

export default OwnerSidebar;
