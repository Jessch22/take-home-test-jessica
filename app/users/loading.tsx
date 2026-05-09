export default function Loading() {
  return (
    <main className="max-w-6xl mx-auto px-8 py-12">
      <div className="h-10 w-24 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />

      {/* Header */}
      <div className="mt-4 space-y-2">
        <div className="h-7 w-56 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
        <div className="h-4 w-96 max-w-full rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
      </div>

      {/* Fitur search & filter */}
      <div className="mt-6 mb-4 flex flex-col md:flex-row gap-4">
        <div className="h-10 w-full md:w-2/3 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
        <div className="h-10 w-full md:w-1/3 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
        <div className="h-10 w-full md:hidden rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="border border-gray-200 dark:border-gray-800 p-4 rounded"
          >
            <div className="h-5 w-2/3 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
            <div className="mt-2 h-4 w-full rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
            <div className="mt-4 h-4 w-40 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
            <div className="mt-2 h-4 w-64 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto pb-4">
        <div className="border border-gray-200 dark:border-gray-800">
          {/* header */}
          <div className="grid grid-cols-6 gap-2 px-4 py-3 border-b border-gray-200 dark:border-gray-800">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-800 animate-pulse"
              />
            ))}
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {Array.from({ length: 8 }).map((_, row) => (
              <div key={row} className="grid grid-cols-6 gap-2 px-4 py-3">
                <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                <div className="h-4 w-56 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                <div className="h-4 w-10 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                <div className="h-4 w-10 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                <div className="h-4 w-10 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}