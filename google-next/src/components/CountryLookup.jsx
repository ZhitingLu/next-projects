"use client";

import React, { useEffect, useState } from "react";

export default function CountryLookup() {
  const [country, setCountry] = useState("Loading...");

  useEffect(() => {
    const getCountry = async () => {
      try {
        const response = await fetch(
          `https://ipinfo.io/country?token=${process.env.NEXT_PUBLIC_IP_API_TOKEN}`
        );
        const text = await response.text();
        setCountry(text.trim());
      } catch (error) {
        console.log("Failed to fetch country", error);
        setCountry("Unknown");
      }
    };

    getCountry();
  }, []);

  return <div>{country}</div>;
}
