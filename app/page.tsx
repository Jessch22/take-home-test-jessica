export default function Home() {
  return (
    <main className="min-h-screen flex items-center bg-zinc-50 font-sans dark:bg-black text-center">
      <div className="mx-auto p-8">
        <h1 className="text-4xl font-bold">Submission Mampu.io Test</h1>
        <h2 className="mt-2 text-2xl font-semibold">By Jessica Ho</h2>

        <div className="mt-8">
          <h3 className="text-2xl font-bold">
            Tech Stack
          </h3>
          <ul className="mt-4 list-none space-y-2 pl-6">
            <li>Next.js v16.2.5</li>
            <li>Typescript</li>
            <li>Tailwind CSS</li>
            <li>Server side fetching</li>
          </ul>
        </div>

        <a className="m-8 flex h-12 items-center justify-center rounded-full border border-solid px-5 transition-colors hover:bg-blue-700"
          href="/users"
          rel="noopener noreferrer">
          Go to User Page
        </a>

      </div>
    </main>
  );
}
