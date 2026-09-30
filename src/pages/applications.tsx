export default function Applications() {
  const applications = [
    {
      title: "Fashion Campaign",
      status: "Pending",
      date: "September 18, 2026",
    },
    {
      title: "Commercial Video",
      status: "Accepted",
      date: "September 15, 2026",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Opportunities
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            My Applications
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600">
            Keep track of the casting calls you have applied to.
          </p>
        </div>

        <div className="space-y-4">
          {applications.map((application) => (
            <article
              key={application.title}
              className="rounded-2xl border border-gray-200 p-6 transition hover:border-gray-300 md:p-7"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                    {application.title}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Applied on {application.date}
                  </p>
                </div>

                <span
                  className={`w-fit rounded-full px-4 py-2 text-sm font-medium ${
                    application.status === "Accepted"
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {application.status}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}