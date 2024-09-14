import React from "react";
import { SITE_URL } from "@/constant/links";
import { Metadata } from "next"; // Add this import statement

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const encryptedMessage = searchParams.message?.toString() || "";
  const message = decodeURIComponent(atob(encryptedMessage));

  return {
    title: "Future Note",
    openGraph: {
      title: `Note: ${message}`,
      description: "Check out this note!",
      images: ["/image.svg"],
    },
  };
}

export default function NotePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const encryptedMessage = searchParams.message?.toString() || "";
  const message = decodeURIComponent(atob(encryptedMessage)); // Base64 ile şifrelenmiş ve URL-encoded notu çöz
  const color = decodeURIComponent(searchParams.color?.toString() || "");
  // const textColor = getContrastColor(color);

  return (
    <>
      {/* Ayrıca, bu sayfayı server component'e dönüştürmek için "use client" direktifini kaldırın */}
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <div className="max-w-2xl w-full">
          <div className="text-center">
            <span className="font-serif text-5xl leading-tight tracking-tight mb-2 inline-block">
              &ldquo;
            </span>
            <p className="text-3xl md:text-4xl lg:text-5xl leading-relaxed tracking-wide mb-4 px-4 font-semibold">
              <span dangerouslySetInnerHTML={{ __html: message }} />
            </p>
            <span className="font-serif text-5xl leading-tight tracking-tight mt-2 inline-block">
              &ldquo;
            </span>
          </div>
        </div>

        <div className="fixed bottom-4 right-4">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              "A note to my future self"
            )}&url=${encodeURIComponent(
              `${SITE_URL}/notepage?message=${message}&color=${color}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
            Share on Twitter
          </a>
        </div>
      </div>
    </>
  );
}
