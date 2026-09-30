export default function About() {
  return (
    <main>
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              About TAKE
            </p>

            <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-7xl">
              Where creative projects meet the right talent.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600 md:text-xl">
              TAKE connects creative professionals with brands, agencies,
              production teams, and companies looking for the right people
              for their next project.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Our purpose
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Making creative connections simpler.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-gray-600">
            <p>
              Finding the right creative professional should not have to
              depend on who you already know. TAKE brings talent and
              opportunities into one focused space.
            </p>

            <p>
              Whether you are looking for a model, actor, photographer,
              stylist, creative director, or another creative professional,
              TAKE makes discovery more direct.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            How TAKE works
          </p>

          <div className="mt-10 grid gap-10 md:grid-cols-3">
            <div>
              <span className="text-sm font-semibold text-gray-400">01</span>
              <h3 className="mt-3 text-xl font-semibold">Discover</h3>
              <p className="mt-3 leading-7 text-gray-600">
                Explore creative professionals and find talent that fits
                your project.
              </p>
            </div>

            <div>
              <span className="text-sm font-semibold text-gray-400">02</span>
              <h3 className="mt-3 text-xl font-semibold">Connect</h3>
              <p className="mt-3 leading-7 text-gray-600">
                Explore casting opportunities and connect with the people
                behind them.
              </p>
            </div>

            <div>
              <span className="text-sm font-semibold text-gray-400">03</span>
              <h3 className="mt-3 text-xl font-semibold">Create</h3>
              <p className="mt-3 leading-7 text-gray-600">
                Turn the right creative connection into a project worth
                making.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}