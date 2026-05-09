export default function Loading() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-6">
      <div className="h-10 w-24 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />

      <div>
        {/* Header */}
        <header>
          <div className="h-10 w-72 max-w-full rounded bg-gray-200 dark:bg-gray-800 animate-pulse mt-4 mb-2" />
          <div className="h-6 w-40 rounded bg-gray-200 dark:bg-gray-800 animate-pulse mb-4" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-blue-700 pt-8">
          {/* Contact */}
          <div>
            <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
            <div className="mt-4 space-y-3">
              <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="h-4 w-56 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="h-4 w-44 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
            </div>
          </div>

          {/* Address */}
          <div>
            <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-800 animate-pulse mb-4" />
            <div className="space-y-2">
              <div className="h-4 w-64 max-w-full rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="h-4 w-28 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-800 animate-pulse mb-4" />
            <div className="space-y-2">
              <div className="h-4 w-56 max-w-full rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Todos / Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-blue-700 pt-8 mt-12">
          {/* Todos */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-3 w-40 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="h-5 w-24 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
            </div>

            <ul className="max-h-80 overflow-y-auto space-y-2 pr-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm bg-zinc-50 dark:bg-zinc-900 p-2 rounded"
                >
                  <div className="h-4 w-4 mt-1 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                    <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="h-3 w-40 rounded bg-gray-200 dark:bg-gray-800 animate-pulse mb-4" />
            <div className="max-h-80 overflow-y-auto space-y-4 pr-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded"
                >
                  <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-800 animate-pulse mb-2" />
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                    <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}