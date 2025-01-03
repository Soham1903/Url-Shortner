import UrlShortnerContainer from "@/components/url-shortner-container";
import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-auto max-w-xl py-12 md:py-24 space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">URL Shortner</h1>
        <p className="md:text-lg">Shorten your URLs and share them easily</p>
      </div>
      <UrlShortnerContainer />
    </main>
  );
}
