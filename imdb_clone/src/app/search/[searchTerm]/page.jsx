import React from "react";
import Results from "@/components/Results";

export default async function SearchPage({ params }) {
  // Await params before accessing its properties
  const {searchTerm} = await params;
  
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${searchTerm}&language=en-US&page=1&include_adult=false`;
  const res = await fetch(apiUrl);
  const data = await res.json();
  const results = data.results;

  return (
    <div>
      {results && results.length === 0 ?
        (<h1 className="text-center mt-10">No results found</h1>) 
      : (
      results && <Results results={results} />
    )}
    </div>
  );
}
