import { useRouter } from "next/router";

export default function CastingDetails() {
  const router = useRouter();

  const { id } = router.query;

  return (
    <main>
      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
          Casting Opportunity
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          Casting Details
        </h1>

        <p className="mt-5 text-lg leading-8 text-gray-600">
          Casting ID: {id}
        </p>

        <div className="mt-10 rounded-2xl border border-gray-200 p-8">
          <p className="text-sm font-medium text-gray-500">Fashion</p>

          <h2 className="mt-2 text-3xl font-semibold">
            Fashion Campaign
          </h2>

          <p className="mt-5 leading-7 text-gray-600">
            Model needed for an upcoming fashion campaign.
          </p>

          <div className="mt-8 space-y-3 text-sm text-gray-500">
            <p>📍 Prishtina</p>
            <p>💰 Paid opportunity</p>
            <p>Deadline: September 25, 2026</p>
          </div>

          <button className="mt-8 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800">
            Apply Now
          </button>
        </div>
      </section>
    </main>
  );
}