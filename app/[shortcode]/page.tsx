import { redirect } from "next/navigation";
import prisma from "@/lib/db";

interface RedirectPageProps {
  params: {
    shortcode: string;
  };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { shortcode } = params;

  // Fetch the URL from the database
  const url = await prisma.url.findFirst({
    where: { shortCode: shortcode },
  });

  // Handle case where URL is not found
  if (!url) {
    return (
      <div>
        <h1>404 - URL Not Found</h1>
        <p>The shortcode does not correspond to any URL in our database.</p>
      </div>
    );
  }

  await prisma.url.update({
    where: { id: url.id },
    data: { visits: { increment: 1 } },
  });

  // Redirect to the original URL
  redirect(url.originalUrl);
}
