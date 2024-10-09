"use client";
import { fetcherWithToken } from "@/lib/swr/fetcher";
import React from "react";
import useSWR from "swr";

import Cookies from "js-cookie";

const ProfilePage = () => {
  const token: any = Cookies.get("token");
  // Fetch data articles
  const {
    data: profile,
    error,
    isLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`, {
    fetcher: (url: string) => fetcherWithToken(url, token),
  });

  console.log(profile);

  if (error) {
    return (
      <div className="text-red-600 text-xl h-full  flex justify-center items-center">
        Error fetching data
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-xl h-full  flex justify-center items-center">
        <span className="loading text-blue-500 loading-infinity min-w-16"></span>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-start pt-14 h-full">
      <h1 className="text-2xl font-bold pl-3">Profile</h1>
      <div className="my-3 flex pl-8 items-center gap-3">
        <span className="text-2xl rounded-full w-14 h-14 p-9 flex justify-center items-center my-3 bg-green-700 text-white font-bold">
          {profile?.username.toUpperCase().slice(0, 1)}
        </span>
        <div className="flex flex-col gap-1">
          <p
            className={`badge badge-${
              profile?.role === "admin" ? "accent" : "secondary"
            }`}
          >
            {profile?.role}
          </p>
          <p className="text-lg font-bold">
            {profile?.username} ({profile?.first_name} {profile?.last_name})
          </p>
          <p className="text-base text-gray-500">{profile?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
