import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { connectToDatabase } from "@/lib/mongodb";
import CastingCall from "@/models/CastingCall";

type Casting = {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  deadline: string;
  compensation: string;
  status: "open" | "closed";
};

type Props = {
  casting: Casting;
};

export default function CastingProfile({
  casting,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main>
      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
          {casting.category}
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          {casting.title}
        </h1>

        <span className="mt-4 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
          {casting.status === "open" ? "Open" : "Closed"}
        </span>

        <div className="mt-10 rounded-2xl border border-gray-200 p-8">
          <h2 className="text-xl font-semibold">About this casting</h2>

          <p className="mt-4 leading-7 text-gray-600">
            {casting.description}
          </p>

          <div className="mt-8 space-y-3 text-sm text-gray-600">
            <p>📍 Location: {casting.location}</p>

            <p>💰 Compensation: {casting.compensation}</p>

            <p>
              Deadline:{" "}
              {new Date(casting.deadline).toLocaleDateString()}
            </p>
          </div>

          <button className="mt-8 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800">
            Apply Now
          </button>
        </div>
      </section>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  await connectToDatabase();

  const castingCalls = await CastingCall.find()
    .select("_id")
    .lean();

  const paths = castingCalls.map((casting) => ({
    params: {
      id: casting._id.toString(),
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
}) => {
  await connectToDatabase();

  const id = params?.id;

    if (
    typeof id !== "string" ||
    !/^[0-9a-fA-F]{24}$/.test(id)
    ) {
    return {
        notFound: true,
    };
    }

  const casting = await CastingCall.findById(id).lean();

  if (!casting) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      casting: JSON.parse(JSON.stringify(casting)),
    },
    revalidate: 60,
  };
};