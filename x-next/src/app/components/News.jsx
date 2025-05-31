"use client";

import React, { useEffect, useState } from "react";

export default function News() {
  const [news, setNews] = useState([]);
  const [articleNum, setArticleNum] = useState(5);

  useEffect(() => {
    const apiUrl = `https://saurav.tech/NewsAPI//top-headlines/category/business/us.json`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles);
      });
  }, []);

  return (
    <div className="border border-gray-100 text-slate-900 space-y-3 bg-white rounded-xl pt-2 pb-5">
      <h4 className="font-bold text-xl px-4">What's happening</h4>
      {news.slice(0, articleNum).map((article, index) => (
        <div key={index} className="">
          <a href={article.url} target="_blank" className="">
            <div
              className="flex items-center justify-between px-4 py-2 
            space-x-1 hover:bg-gray-100 transition duration-200"
            >
              <div className="space-y-0.5">
                <h6 className="text-sm font-bold">{article.title}</h6>
                <p className="text-xs font-medium text-gray-500">
                  {article.source.name}
                </p>
              </div>
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt=""
                  width={70}
                  className="rounded-xl"
                />
              )}
            </div>
          </a>
        </div>
      ))}
      <div className="hover:bg-gray-100 py-3 cursor-pointer">
        <button
          onClick={() => {
            setArticleNum(articleNum + 3);
          }}
          className="text-[var(--twitter-blue)] pl-4 font-semibold hover:text-blue-400 text-sm cursor-pointer 
      "
        >
          Load more
        </button>
      </div>
    </div>
  );
}
// Note: The API used in this example is a free news API and may have limitations or require an API key for extensive use.
