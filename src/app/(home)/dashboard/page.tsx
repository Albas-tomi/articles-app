"use client";
import { dataDummy } from "@/utils/dummy";
import Pagination from "@/components/Pagination/Pagination";
import { useState } from "react";
import ArticleCard from "./_components/ArticleCard";
import useSWR from "swr";
import { fetcherWithToken } from "@/lib/swr/fetcher";
import Cookies from "js-cookie";
import { getStaticArticles } from "@/utils/api";

const token: any = Cookies.get("token");

// const getDataArticles = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     // menyimpan cache request
//     cache: "force-cache", // Force revalidation melakukan request untuk memperbarui konten
//     next: {
//       revalidate: 750, // Revalidate setiap 750 detik untuk pembaruan konten
//     },
//   });
//   if( !res.ok) {
//     throw new Error("Gagal mengambil data articles");
//   }
//   return res.json();
// };
export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);

  // Fetch data articles
  const {
    data: articles,
    error,
    isLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles`, {
    fetcher: (url: string) => fetcherWithToken(url, token),
  });

  // PAGINATION
  const pageCount = Math.ceil(articles?.data.length / itemPerPage);
  const startIndex = currentPage * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const dataDisplay = articles?.data.slice(startIndex, endIndex);

  const handlePageClick = ({ selected }: any) => {
    setCurrentPage(selected);
  };

  // PAGINATION

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
    <div>
      <h1 className="md:text-3xl  text-2xl font-bold text-center w-full my-2">
        Articles
      </h1>
      <div className="grid grid-cols-3 gap-8">
        {dataDisplay.map((item: any, index: number) => (
          <ArticleCard item={item} />
        ))}
      </div>

      <Pagination
        pageCount={pageCount}
        handlePageClick={handlePageClick}
        currentPage={currentPage}
        setItemPerPage={setItemPerPage}
        itemPerPage={itemPerPage}
      />
    </div>
  );
}
