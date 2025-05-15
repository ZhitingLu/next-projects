import ImageSearchResults from "@/components/ImageSearchResults";
import Link from "next/link";
import React from "react";

export default async function ImageSearchPage({ searchParams }) {
  const startIndex = Number(searchParams.start) || "1";
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}
   &cx=${process.env.CONTEXT_KEY}&q=${searchParams.searchTerm}&searchType=image&start=${startIndex}`
  );
  if (!response.ok) throw new Error("Something went wrong");
  const data = await response.json();
  const results = data.items;

  if (!results) {
    return (
      <div className="flex flex-col justify-center items-center pt-10">
        <h1 className="text-2xl mb-4">
          No results found for{" "}
          <span className="italic text-gray-600">
            '{searchParams.searchTerm}'
          </span>
        </h1>
        <p className="text-lg">Try searching for something else</p>
        <Link href="/" className="text-blue-500 mt-2">
          Home
        </Link>
      </div>
    );
  }

  return <div>{results && <ImageSearchResults results={data} />}</div>;
}
