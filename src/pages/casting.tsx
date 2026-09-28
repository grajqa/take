import { useEffect, useState } from "react";
import CastingCard from "@/components/CastingCard";

type Casting = {
  _id: string;
  category: string;
  title: string;
  description: string;
  location: string;
  compensation: string;
  deadline: string;
  status: "open" | "closed";
};

export default function Casting() {
  const [castingCalls, setCastingCalls] = useState<Casting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCastingCalls = async () => {
      try {
        const response = await fetch("/api/casting");
        const data = await response.json();

        setCastingCalls(data);
      } catch (error) {
        console.error("Failed to fetch casting calls:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCastingCalls();
  }, []);

  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Opportunities
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Casting Calls
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Discover creative opportunities and find projects that match your
            skills.
          </p>
        </div>

        {loading ? (
          <p className="mt-12 text-gray-500">Loading casting calls...</p>
        ) : castingCalls.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-gray-200 p-8">
            <p className="text-gray-600">
              No casting calls available yet.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {castingCalls.map((casting) => (
              <div key={casting._id}>
                <CastingCard
                  category={casting.category}
                  title={casting.title}
                  description={casting.description}
                  location={casting.location}
                  compensation={casting.compensation}
                  deadline={new Date(casting.deadline).toLocaleDateString()}
                  href={`/casting/${casting._id}`}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}