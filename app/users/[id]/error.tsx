"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center text-center">
      <div>
        <h2 className="text-xl font-semibold">An error occurred</h2>
        <p className="text-sm text-gray-500 mt-2">
          {error.message}
        </p>

        <button onClick={reset} className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Try Again
        </button>
      </div>
    </main>
  );
}