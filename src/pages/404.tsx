import Link from "next/link";

export default function Custom404() {
  return (
    <main>
      <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
          404
        </p>

        <h1 className="mt-3 text-5xl font-bold tracking-tight">
          Page not found
        </h1>

        <p className="mt-5 max-w-lg text-lg leading-8 text-gray-600">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          href="/"
          className="mt-8 rounded-full bg-black px-6 py-3 text-sm font-medium !text-white transition hover:bg-gray-800"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}