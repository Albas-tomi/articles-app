"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";
import useSWR from "swr";
import { fetcherWithToken } from "@/lib/swr/fetcher";

const SidebarItems = ({ item }: { item: any; key: number }) => {
  const pathname = usePathname();
  const token: any = Cookies.get("token");

  // Fetch data articles
  const {
    data: profile,
    error,
    isLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`, {
    fetcher: (url: string) => fetcherWithToken(url, token),
  });

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
