"use client";

import React, { Suspense } from "react";
import ImageSearchResults from "./ImageSearchResults";

export default function ClientImageResultsWrapper({ results }) {
  return (
    <Suspense fallback={<div>Loading images...</div>}>
      <ImageSearchResults results={results} />
    </Suspense>
  );
}
