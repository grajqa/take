import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero section */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-500">
            TAKE
          </p>

          <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Where creative projects meet the right talent.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Discover creative talent, find opportunities, and bring projects
            to life.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/talent"
              className="rounded-full bg-black px-6 py-3 text-sm font-medium !text-white transition hover:bg-gray-800"
            >
              Explore Talent
            </Link>

            <Link
              href="/casting"
              className="rounded-full border border-gray-300 px-6 py-3 text-sm font-medium transition hover:bg-gray-100"
            >
              View Casting Calls
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Simple process
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              How TAKE works
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <span className="text-sm font-semibold text-gray-400">01</span>

              <h3 className="mt-3 text-xl font-semibold">Discover</h3>

              <p className="mt-2 leading-7 text-gray-600">
                Find creative professionals that match your project.
              </p>
            </div>

            <div>
              <span className="text-sm font-semibold text-gray-400">02</span>

              <h3 className="mt-3 text-xl font-semibold">Connect</h3>

              <p className="mt-2 leading-7 text-gray-600">
                Explore profiles and discover the right talent.
              </p>
            </div>

            <div>
              <span className="text-sm font-semibold text-gray-400">03</span>

              <h3 className="mt-3 text-xl font-semibold">Create</h3>

              <p className="mt-2 leading-7 text-gray-600">
                Turn creative ideas into real projects.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}