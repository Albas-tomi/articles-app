"use client";
import { useRouter } from "next/navigation";
import React from "react";

const ArticleCard = ({ item }: any) => {
  const router = useRouter();
  return (
    <div
      key={item.id + item.title}
      className="card bg-base-100 grid  shadow-xl"
    >
      <figure>
        <img
          className="w-full min-h-[200px]  max-h-[250px] object-cover"
          src={item.image}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title line-clamp-2">
          {item.title}
          <div className="badge badge-secondary">{item.status}</div>
        </h2>
        <p className="line-clamp-3">{item.description}</p>
        <div className="card-actions justify-end">
          <button
            aria-label="baca detail"
            onClick={() => router.push(`/article/${item.id}`)}
            className="btn btn-link p-0 text-blue-700 no-underline text-lg font-bold"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
