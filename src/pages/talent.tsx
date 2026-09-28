import { useEffect, useState } from "react";
import Link from "next/link";

type Talent = {
  _id: string;
  category: string;
  location: string;
  bio: string;
  experience: string;
  userId: {
    name: string;
    email: string;
    image: string;
  };
};

export default function Talent() {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const response = await fetch("/api/talent");
        const data = await response.json();

        setTalents(data);
      } catch (error) {
        console.error("Failed to fetch talents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTalents();
  }, []);

  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Discover
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Talent Directory
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Discover creative professionals for your next project.
          </p>
        </div>

        {loading ? (
          <p className="mt-12 text-gray-500">Loading talent...</p>
        ) : talents.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-gray-200 p-8">
            <p className="text-gray-600">
              No talent profiles available yet.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {talents.map((talent) => (
              <div
                key={talent._id}
                className="rounded-2xl border border-gray-200 p-6 transition hover:shadow-md"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-xl font-semibold">
                  {talent.userId.name.charAt(0)}
                </div>

                <h2 className="mt-6 text-xl font-semibold">
                  {talent.category}
                </h2>

                <h2 className="mt-6 text-xl font-semibold">
                {talent.userId.name}
                </h2>

                <p className="mt-1 text-sm font-medium text-gray-500">
                {talent.category}
                </p>

                <Link
                href={`/talent/${talent._id}`}
                className="mt-6 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-medium !text-white transition hover:bg-gray-800"
                >
                View Profile
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}