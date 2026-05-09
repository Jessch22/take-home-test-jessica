"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-sm text-gray-300 hover:underline cursor-pointer bg-transparent border-none p-0 mb-4"
    >
      &larr; Back to list
    </button>
  );
}