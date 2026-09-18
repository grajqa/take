import { useRouter } from "next/router";

export default function TalentDetails() {
  const router = useRouter();

  const { id } = router.query;

  return (
    <main>
      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
          Talent Profile
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          Talent Details
        </h1>

        <p className="mt-5 text-lg leading-8 text-gray-600">
          Profile ID: {id}
        </p>

        <div className="mt-10 rounded-2xl border border-gray-200 p-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-2xl font-semibold">
            T
          </div>

          <h2 className="mt-6 text-2xl font-semibold">Talent Name</h2>

          <p className="mt-2 text-gray-500">Model · Prishtina</p>

          <p className="mt-6 leading-7 text-gray-600">
            This profile will contain the talent's professional information,
            experience, portfolio, and other relevant details.
          </p>
        </div>
      </section>
    </main>
  );
}