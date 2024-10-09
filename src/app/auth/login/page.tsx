"use client";
import CustomInput from "@/components/Input/CustomInput";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const getDataProfile = async (token: string) => {
    if (token) {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          Cookies.set("role", res.data.role);
          Cookies.set("username", res.data.username);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
        {
          username: e.target.username.value,
          password: e.target.password.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        alert("Login berhasil");
        Cookies.set("token", res.data.access, { expires: 4 });
        getDataProfile(res.data.access);
        router.push("/");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 min-h-screen flex justify-center items-center p-5">
      <div className="bg-slate-50/50 p-6 rounded  w-full  max-w-[480px]">
        <h1 className="text-gray-700 font-bold mb-6 text-center text-2xl ">
          Sign in to your account
        </h1>

        <form onSubmit={handleLogin} className="w-full">
          <CustomInput
            type="text"
            placeholder="Username"
            label="Username"
            name="username"
            id="username"
          />
          <div className="relative w-full items-center justify-between mb-5">
            <CustomInput
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              label="Your password"
              name="password"
              id="password"
            />
            {!showPassword ? (
              <FaEye
                onClick={() => setShowPassword(true)}
                className="absolute z-10 top-[55%] right-5 translate-x-1 cursor-pointer"
              />
            ) : (
              <FaEyeSlash
                onClick={() => setShowPassword(false)}
                className="absolute z-10 top-[55%] right-5 translate-x-1 cursor-pointer"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-gradient-to-br from-blue-300 to-blue-500 text-white rounded-lg cursor-pointer text-md font-semibold transition-all duration-500 hover:bg-blue-300"
          >
            {loading ? (
              <span className="loading loading-spinner text-white loading-sm"></span>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
        <p className="text-center mt-5 text-base text-gray-700 ">
          Don&apos;t have an account yet?{" "}
          <Link href="/registrasi" className="text-blue-500 cursor-not-allowed">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
