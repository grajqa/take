type CastingCardProps = {
  category: string;
  title: string;
  description: string;
  location: string;
  compensation: string;
  deadline: string;
};

export default function CastingCard({
  category,
  title,
  description,
  location,
  compensation,
  deadline,
}: CastingCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 p-7 transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">{category}</p>

          <h2 className="mt-2 text-2xl font-semibold">{title}</h2>
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
          Open
        </span>
      </div>

      <p className="mt-4 leading-7 text-gray-600">{description}</p>

      <div className="mt-6 space-y-2 text-sm text-gray-500">
        <p>📍 {location}</p>
        <p>💰 {compensation}</p>
        <p>Deadline: {deadline}</p>
      </div>

      <button className="mt-7 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800">
        View Casting
      </button>
    </div>
  );
}