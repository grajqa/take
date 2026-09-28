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

  if (session.user?.role !== "admin") {
    return {
      redirect: {
        destination: "/dashboard",
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

export default function Admin({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Administration
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Admin Panel
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Manage users, talent profiles, and casting opportunities.
          </p>

          <p className="mt-4 text-sm text-gray-500">
            Signed in as {session.user?.name}.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Users</p>
            <h2 className="mt-2 text-3xl font-semibold">0</h2>
            <p className="mt-2 text-sm text-gray-500">
              Registered users
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Talent</p>
            <h2 className="mt-2 text-3xl font-semibold">0</h2>
            <p className="mt-2 text-sm text-gray-500">
              Talent profiles
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Casting Calls</p>
            <h2 className="mt-2 text-3xl font-semibold">0</h2>
            <p className="mt-2 text-sm text-gray-500">
              Active opportunities
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}