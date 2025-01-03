"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { CopyIcon, EyeIcon, CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Url = {
  id: string;
  shortCode: string;
  originUrl: string;
  visits: number;
};

export default function UrlList() {
  const [urls, setUrls] = useState<Url[]>([]);
  const [copyUrl, setCopyUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const shortenerUrls = (code: string) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;

  const fetchUrls = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/urls");
      if (!response.ok) {
        throw new Error("Failed to fetch URLs");
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setUrls(data);
      } else {
        console.error("Invalid data format");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const copyToClipboard = (code: string) => {
    const fullUrl = shortenerUrls(code);
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopyUrl(code);
      setTimeout(() => setCopyUrl(null), 3000); // Reset after 3 seconds
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Recent URLs</h2>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <ul className="space-y-2">
          {urls.map((url) => (
            <li
              key={url.id}
              className="flex items-center gap-2 justify-between bg-card rounded-md text-card-foreground border p-3"
            >
              <Link
                href={shortenerUrls(url.shortCode)}
                className="text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                {shortenerUrls(url.shortCode)}
              </Link>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:bg-muted"
                  onClick={() => copyToClipboard(url.shortCode)}
                >
                  {copyUrl === url.shortCode ? (
                    <CheckIcon className="w-4 h-4" />
                  ) : (
                    <CopyIcon className="w-4 h-4" />
                  )}
                  <span className="sr-only">Copy URL</span>
                </Button>
                <span className="flex items-center gap-2">
                  <EyeIcon className="h-4 w-4" />
                  {url.visits ?? 0} views
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
