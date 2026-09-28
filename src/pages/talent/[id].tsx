import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { connectToDatabase } from "@/lib/mongodb";
import Talent from "@/models/Talent";

type TalentProfile = {
  _id: string;
  category: string;
  location: string;
  bio: string;
  experience: string;
  portfolio: string[];
  userId: {
    name: string;
    email: string;
    image: string;
  };
};

type Props = {
  talent: TalentProfile;
};

export default function TalentProfile({
  talent,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
          Talent Profile
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          {talent.userId.name}
        </h1>

        <p className="mt-3 text-lg text-gray-500">
          {talent.category} · {talent.location}
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold">About</h2>

            <p className="mt-4 leading-7 text-gray-600">
              {talent.bio || "No bio available yet."}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold">Experience</h2>

            <p className="mt-4 text-gray-600">
              {talent.experience || "Not specified"}
            </p>

            <p className="mt-6 text-sm text-gray-500">
              Location: {talent.location}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  await connectToDatabase();

  const talents = await Talent.find().select("_id").lean();

  const paths = talents.map((talent) => ({
    params: {
      id: talent._id.toString(),
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  await connectToDatabase();

  const id = params?.id;

  if (typeof id !== "string") {
    return {
      notFound: true,
    };
  }

  const talent = await Talent.findById(id)
    .populate("userId", "name email image")
    .lean();

  if (!talent) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      talent: JSON.parse(JSON.stringify(talent)),
    },
    revalidate: 60,
  };
};