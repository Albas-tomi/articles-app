"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";

const SidebarItems = ({ item }: { item: any; key: number }) => {
  const pathname = usePathname();
  const token: any = Cookies.get("token");

  return (
    <div
      key={item.href}
      className={` flex rounded-md flex-col justify-start items-start px-1  w-full`}
    >
      <Link
        className={`${
          pathname === item.href ? "bg-blue-500 text-white" : ""
        } flex pl-8  py-2 my-1 hover:text-white rounded-md hover:bg-gray-500 transition-all  duration-300 w-full items-center gap-2 text-base text-start`}
        href={item.href}
      >
        {item.icon} {item.name}
      </Link>
    </div>
  );
};

export default SidebarItems;
