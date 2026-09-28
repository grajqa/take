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
  return (
    <main>
      <h1>Dashboard</h1>

      <p>
        Welcome, {session.user?.name || "TAKE user"}.
      </p>

      <section>
        <div>
          <h2>My Profile</h2>
          <p>Manage your personal and professional information.</p>
        </div>

        <div>
          <h2>My Applications</h2>
          <p>View the casting calls you have applied to.</p>
        </div>

        <div>
          <h2>Favorites</h2>
          <p>View the talent and opportunities you have saved.</p>
        </div>
      </section>
    </main>
  );
}