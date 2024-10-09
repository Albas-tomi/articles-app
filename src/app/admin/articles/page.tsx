"use client";
import { fetcherWithToken } from "@/lib/swr/fetcher";
import React from "react";
import { MdDelete, MdEditRoad } from "react-icons/md";
import useSWR from "swr";
import Cookies from "js-cookie";
import Image from "next/image";
import { BsEye } from "react-icons/bs";

const AdminArticles = () => {
  const token: any = Cookies.get("token");
  // Fetch data articles
  const {
    data: articles,
    error,
    isLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles`, {
    fetcher: (url: string) => fetcherWithToken(url, token),
  });

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
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {articles?.data?.map((article: any, index: number) => (
            <tr key={article.id}>
              <th>{index + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <Image
                        alt="article image"
                        width={100}
                        height={100}
                        src={article.image}
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td className="line-clamp-5 my-2 max-w-[250px]">
                {article.title}
              </td>
              <td className="max-w-[250px]  ">
                <span className="badge line-clamp-1  badge-ghost badge-sm">
                  {article.description}
                </span>
              </td>
              <th>
                <div
                  className={`badge py-3 ${
                    article.status === "pending"
                      ? "bg-yellow-500 text-white "
                      : "accent"
                  }`}
                >
                  {article.status}
                </div>
              </th>
              <td className="">
                <button className="btn h-full p-0 btn-link text-black">
                  <MdDelete className="text-xl" />
                </button>
                <button className="btn mx-2 p-0 btn-link text-black">
                  <MdEditRoad className="text-xl" />
                </button>
                <button className="btn p-0 btn-link text-black">
                  <BsEye className="text-xl text-blue-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminArticles;
