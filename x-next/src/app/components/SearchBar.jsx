"use client";

import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="relative pt-2">
      <div className="sticky top-0">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300 w-4 h-4" />
        <input
          type="text"
          placeholder="Search"
          onFocus={() => setFocused(true)}
          onBlur={() => query === "" && setFocused(false)}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="border border-gray-200 dark:border-gray-600 rounded-3xl bg-white dark:bg-gray-600
              text-sm w-full px-4 py-2.5 pl-10 placeholder-gray-700 dark:placeholder-gray-400 z-10
               placeholder:font-semibold focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
        />

        {/* Search results */}
        {focused && query === "" && (
          <div
            className="absolute top-full left-0 w-full bg-white dark:bg-gray-700 border rounded-xl
             border-gray-100 dark:border-gray-700 shadow-lg p-4 translate-y-0.25"
          >
            <p className="text-gray-500 dark:text-white text-sm font-semibold">
              {" "}
              Try searching for people, lists, or keywords
            </p>
          </div>
        )}

        {query !== "" && (
          <div
            className="absolute top-full left-0 w-full bg-white dark:bg-gray-700 border
                 border-gray-100 dark:border-gray-700 rounded-xl shadow-lg p-4 translate-y-0.25"
          >
            <p className="text-gray-500 dark:text-white">
              Showing results for "{query}"
            </p>
            {/* logic to display search results */}
          </div>
        )}
      </div>
    </div>
  );
}
