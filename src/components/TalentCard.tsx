type TalentCardProps = {
  name: string;
  category: string;
  location: string;
  experience: string;
};

export default function TalentCard({
  name,
  category,
  location,
  experience,
}: TalentCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 p-6 transition hover:shadow-md">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-xl font-semibold">
        {name.charAt(0)}
      </div>

      <h2 className="mt-6 text-xl font-semibold">{name}</h2>

      <p className="mt-1 text-sm font-medium text-gray-500">{category}</p>

      <div className="mt-4 space-y-2 text-sm text-gray-500">
        <p>📍 {location}</p>
        <p>Experience: {experience}</p>
      </div>

      <button className="mt-6 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800">
        View Profile
      </button>
    </div>
  );
}