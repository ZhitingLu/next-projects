'use client';

import Link from "next/link";
import React from "react";
import PaginationButtons from "./PaginationButtons";

export default function ImageSearchResults({ results }) {
  return (
    <div className="sm:pb-24 pb-40 mt-4 ">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 px-3 space-x-4">
        {results.items.map((result) => (
          <div className="mb-8" key={result.link}>
            <div className="group">
              <Link href={result.image.contextLink}>
                <img
                  src={result.link}
                  alt={result.title}
                  className="h-60 group-hover:shadow-xl w-full object-contain transition-shadow duration-300"
                />
              </Link>
              <Link href={result.image.contextLink}>
                <h2 className="group-hober:udnerline truncate text-xl px-8">
                  {result.title}
                </h2>
              </Link>
              <Link href={result.image.contextLink}>
                <p className="group-hober:udnerline truncate text-gray-600 px-8">
                  {result.displayLink}
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="ml-16">
        <PaginationButtons />
      </div>
    </div>
  );
}
