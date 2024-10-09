"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const role = Cookies.get("role");
  const router = useRouter();

  useEffect(() => {
    if (role === "admin") {
      router.push("/admin/users");
    }
    if (role !== "admin" && role === "owner") {
      router.push("/dashboard");
    }
  }, [role]);

  return (
    <div className="h-screen flex justify-center items-center">
      <span className="loading text-blue-500 loading-infinity min-w-32"></span>
      <h1 className="text-3xl font-bold text-blue-500">Wait a second ...</h1>
    </div>
  );
}
