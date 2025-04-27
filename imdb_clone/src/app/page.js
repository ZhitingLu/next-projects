import Results from "@/components/Results";
import React from "react";

const API_KEY = process.env.API_KEY;

export default async function page({ searchParams }) {
  // Await searchParams to get the required properties
  const { genre } = await searchParams; // Await the searchParams

  // Use a fallback value in case 'genre' is undefined
  const genreValue = genre || "fetchTrending";

  // Introduce a 2-second delay before fetching
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Wait for 2 seconds before continuing with fetch
  await delay(1000);

  const apiUrl = `https://api.themoviedb.org/3/${
    genreValue === "fetchTopRated" ? "movie/top_rated" : "trending/all/week"
  }?api_key=${API_KEY}&
    language=en-US&page=1`;

  const res = await fetch(apiUrl, { next: { revalidate: 1000 } });

  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const results = data.results;

  return (
    <div>
      <Results results={results} />
    </div>
  );
}
