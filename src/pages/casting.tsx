import CastingCard from "@/components/CastingCard";

export default function Casting() {
  return (
    <main>
      {/* Page introduction */}
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

        {/* Casting opportunities */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <CastingCard
            category="Fashion"
            title="Fashion Campaign"
            description="Model needed for an upcoming fashion campaign."
            location="Prishtina"
            compensation="Paid opportunity"
            deadline="September 25, 2026"
          />

          <CastingCard
            category="Commercial"
            title="Commercial Video"
            description="Content creator needed for a commercial production."
            location="Prishtina"
            compensation="Paid opportunity"
            deadline="September 28, 2026"
          />

          <CastingCard
            category="Music"
            title="Music Video"
            description="Dancers needed for a new music video production."
            location="Prishtina"
            compensation="Paid opportunity"
            deadline="October 2, 2026"
          />

          <CastingCard
            category="Content"
            title="Social Media Campaign"
            description="Content creators wanted for a social media campaign."
            location="Prishtina"
            compensation="Paid opportunity"
            deadline="October 5, 2026"
          />
        </div>
      </section>
    </main>
  );
}