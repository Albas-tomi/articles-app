"use client";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import useSWR from "swr";
import Cookies from "js-cookie";
import { fetcherWithToken } from "@/lib/swr/fetcher";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { IoIosEye } from "react-icons/io";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";

const DetailArticle = () => {
  const { articleId } = useParams();
  const token: any = Cookies.get("token");
  // Fetch data articles
  const {
    data: articles,
    error,
    isLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles`, {
    fetcher: (url: string) => fetcherWithToken(url, token),
    revalidateOnFocus: false, // Tidak melakukan revalidasi saat tab mendapatkan fokus
    revalidateOnReconnect: true, // Melakukan revalidasi saat koneksi internet kembali
    refreshInterval: 60000, // Revalidasi setiap 60 detik (1 menit)
    dedupingInterval: 2000, // Mencegah permintaan ganda dalam 2 detik
    errorRetryCount: 3, // Jumlah percobaan maksimum jika shouldRetryOnError true
  });

  const dataDisplay = articles?.data.filter(
    (article: any) => article.id == articleId
  );

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
    <>
      {dataDisplay?.map((article: any) => (
        <div className="card flex flex-col">
          <figure>
            <Image
              className="w-[500px] rounded-md"
              src={article?.image}
              alt="Album"
              width={200}
              height={200}
            />
          </figure>
          <div className="flex justify-center items-center mx-auto gap-10 my-2">
            <span className="flex items-center gap-2 justify-center">
              <FaHeart className="text-red-600 text-xl" />
              {article?.like}
            </span>
            <span className="flex items-center gap-2 justify-center">
              <CiShare2 className="text-blue-600 text-xl" />
              {article?.share}
            </span>
            <span className="flex items-center gap-2 justify-center">
              <IoIosEye className="text-xl" />
              {article?.viewer}
            </span>
            <p className="text-xs text-gray-500">{formatDate(article?.date)}</p>
          </div>
          <div className="card-body">
            <h2 className="card-title">
              {article?.title}
              <Link
                className="text-sm text-blue-600"
                href={`${article.source_url}`}
                target="_blank"
              >
                Detail Source
              </Link>
            </h2>
            <p className="text-gray-500">{article?.description}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default DetailArticle;
