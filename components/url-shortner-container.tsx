"use client";
import React from "react";
import ShortenForm from "./shorten-form";
import UrlList from "./url-list";
import { useState } from "react";

export default function UrlShortnerContainer() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUrlShortened = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };
  return (
    <div>
      <ShortenForm handleUrlShortened={handleUrlShortened} />
      <UrlList key={refreshKey} />
    </div>
  );
}
