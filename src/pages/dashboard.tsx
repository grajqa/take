import Link from "next/link";
import { getSession } from "next-auth/react";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default function Dashboard({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const firstName = session.user?.name?.split(" ")[0] || "there";

  return (
    <main className="bg-gray-50">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            Dashboard
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Welcome back, {firstName}.
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600">
            Manage your profile, applications, and saved opportunities from
            one place.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-5 md:grid-cols-3">
          <Link
            href="/profile"
            className="group rounded-2xl border border-gray-200 bg-white p-7 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-400">01</span>

              <span className="text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>

            <h2 className="mt-10 text-2xl font-semibold tracking-tight">
              My Profile
            </h2>

            <p className="mt-3 leading-7 text-gray-500">
              Manage your personal and professional information.
            </p>
          </Link>

          <Link
            href="/applications"
            className="group rounded-2xl border border-gray-200 bg-white p-7 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-400">02</span>

              <span className="text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>

            <h2 className="mt-10 text-2xl font-semibold tracking-tight">
              My Applications
            </h2>

            <p className="mt-3 leading-7 text-gray-500">
              View the casting calls you have applied to.
            </p>
          </Link>

          <Link
            href="/favorites"
            className="group rounded-2xl border border-gray-200 bg-white p-7 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-400">03</span>

              <span className="text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>

            <h2 className="mt-10 text-2xl font-semibold tracking-tight">
              Favorites
            </h2>

            <p className="mt-3 leading-7 text-gray-500">
              View the talent and opportunities you have saved.
            </p>
          </Link>
        </div>

        <div className="mt-5 rounded-2xl border border-gray-200 bg-black p-8 text-white md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">
                Explore TAKE
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Find your next creative opportunity.
              </h2>

              <p className="mt-2 max-w-xl leading-7 text-gray-400">
                Discover talent and casting calls that could be the right fit
                for your next project.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/talent"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-medium !text-black transition hover:bg-gray-200"
              >
                Browse Talent
              </Link>

              <Link
                href="/casting"
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                View Casting
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}