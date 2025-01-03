"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import React, { useState } from "react";

interface ShortenFormProps {
  handleUrlShortened: () => void;
}

export default function ShortenForm({ handleUrlShortened }: ShortenFormProps) {
  const [url, setUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      await response.json();
      setUrl("");
      handleUrlShortened(); // Clear any previous error
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setShortenedUrl(null); // Clear any previous result
    } finally {
      setShortenedUrl(url);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="space-y-4">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="h-12"
          type="url"
          placeholder="Enter URL to shorten"
          required
        />
        <Button className="w-full p-2" type="submit" disabled={loading}>
          {loading ? "Shortening..." : "Shorten URL"}
        </Button>
        {shortenedUrl && (
          <p className="text-green-500">
            Shortened URL: <a href={shortenedUrl}>{shortenedUrl}</a>
          </p>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </form>
  );
}
