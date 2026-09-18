export default function Talent() {
  return (
    <main>
      {/* Page introduction */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Talent Directory
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Discover Talent
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Explore creative professionals available for campaigns,
            productions, and other creative projects.
          </p>
        </div>

        {/* Talent categories */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 p-6 transition hover:shadow-md">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-xl font-semibold">
              M
            </div>

            <h2 className="text-xl font-semibold">Models</h2>

            <p className="mt-2 leading-7 text-gray-600">
              Discover models for fashion campaigns, commercials, and
              productions.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6 transition hover:shadow-md">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-xl font-semibold">
              A
            </div>

            <h2 className="text-xl font-semibold">Actors</h2>

            <p className="mt-2 leading-7 text-gray-600">
              Find actors for commercials, films, campaigns, and creative
              productions.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6 transition hover:shadow-md">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-xl font-semibold">
              P
            </div>

            <h2 className="text-xl font-semibold">Photographers</h2>

            <p className="mt-2 leading-7 text-gray-600">
              Find photographers for fashion, events, campaigns, and
              commercial work.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6 transition hover:shadow-md">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-xl font-semibold">
              V
            </div>

            <h2 className="text-xl font-semibold">Videographers</h2>

            <p className="mt-2 leading-7 text-gray-600">
              Connect with video professionals for productions and commercial
              projects.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6 transition hover:shadow-md">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-xl font-semibold">
              C
            </div>

            <h2 className="text-xl font-semibold">Creative Directors</h2>

            <p className="mt-2 leading-7 text-gray-600">
              Discover creative directors who shape concepts, campaigns, and
              visual direction.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6 transition hover:shadow-md">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-xl font-semibold">
              S
            </div>

            <h2 className="text-xl font-semibold">Stylists</h2>

            <p className="mt-2 leading-7 text-gray-600">
              Connect with fashion and styling professionals for campaigns
              and productions.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6 transition hover:shadow-md">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-xl font-semibold">
              M
            </div>

            <h2 className="text-xl font-semibold">Makeup & Hair Artists</h2>

            <p className="mt-2 leading-7 text-gray-600">
              Find makeup and hair artists for shoots, campaigns, events, and
              productions.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}