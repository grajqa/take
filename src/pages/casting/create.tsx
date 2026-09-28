import CastingForm from "@/components/CastingForm";

export default function CreateCasting() {
  return (
    <main>
      <section className="mx-auto max-w-3xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Create
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Create a Casting Call
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Publish an opportunity and find the right talent for your project.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-gray-200 p-8">
          <CastingForm />
        </div>
      </section>
    </main>
  );
}