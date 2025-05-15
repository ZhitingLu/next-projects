import React, { Suspense } from "react";
import WebSearchResults from "./WebSearchResults";

export default function ClientWebResultsWrapper({ results }) {
  return (
    <Suspense fallback={<div>Loading images...</div>}>
      <WebSearchResults results={results} />
    </Suspense>
  );
}
