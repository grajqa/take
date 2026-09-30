import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import Link from "next/link";

type Casting = {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  deadline: string;
  compensation: string;
  status: string;
};

export default function CastingDetail({
  casting,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!casting) {
    return (
      <main className="min-h-screen px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-semibold text-gray-900">
            Casting not found
          </h1>

          <Link
            href="/casting"
            className="mt-6 inline-block text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            ← Back to castings
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/casting"
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          ← Back to castings
        </Link>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              {casting.category}
            </span>

            <span className="text-sm text-gray-500">
              {casting.status}
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-semibold text-gray-900">
            {casting.title}
          </h1>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Location
              </p>
              <p className="mt-1 text-sm text-gray-700">
                {casting.location}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Deadline
              </p>
              <p className="mt-1 text-sm text-gray-700">
                {new Date(casting.deadline).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Compensation
              </p>
              <p className="mt-1 text-sm text-gray-700">
                {casting.compensation}
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-8">
            <h2 className="text-lg font-semibold text-gray-900">
              About the casting
            </h2>

            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">
              {casting.description}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/casting`);
  const castings = await response.json();

  const paths = castings.map((casting: Casting) => ({
    params: {
      id: casting._id,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;

  if (typeof id !== "string") {
    return {
      notFound: true,
    };
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/casting/${id}`);

  if (!response.ok) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  const casting = await response.json();

  return {
    props: {
      casting,
    },
    revalidate: 60,
  };
};