import { useEffect, useState } from "react";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";

type Talent = {
  _id: string;
  category: string;
  location: string;
  experience: string;
  userId: {
    name: string;
    email: string;
    image: string;
  };
};

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();

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

  const favoriteTalents = talents.filter((talent) =>
    favorites.includes(talent._id)
  );

  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Your selection
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            My Favorites
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Save talent and casting opportunities you want to revisit.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Saved Talent</h2>

          {loading ? (
            <p className="mt-6 text-gray-500">Loading favorites...</p>
          ) : favoriteTalents.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-gray-200 p-8">
              <p className="text-gray-600">
                You have no favorite talent yet.
              </p>

              <Link
                href="/talent"
                className="mt-5 inline-block rounded-full bg-black px-5 py-2.5 text-sm font-medium !text-white transition hover:bg-gray-800"
              >
                Explore Talent
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {favoriteTalents.map((talent) => (
                <div
                  key={talent._id}
                  className="rounded-2xl border border-gray-200 p-6 transition hover:shadow-md"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-xl font-semibold">
                    {talent.userId.name.charAt(0)}
                  </div>

                  <h3 className="mt-6 text-xl font-semibold">
                    {talent.userId.name}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-gray-500">
                    {talent.category}
                  </p>

                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => toggleFavorite(talent._id)}
                      className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-medium transition hover:bg-gray-100"
                    >
                      Remove
                    </button>

                    <Link
                      href={`/talent/${talent._id}`}
                      className="rounded-full bg-black px-5 py-2.5 text-sm font-medium !text-white transition hover:bg-gray-800"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}