import { useForm } from "react-hook-form";
import { useState } from "react";

type CastingFormData = {
  title: string;
  description: string;
  category: string;
  location: string;
  deadline: string;
  compensation: string;
};

export default function CastingForm() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CastingFormData>();

  const onSubmit = async (data: CastingFormData) => {
    setSuccess("");
    setError("");

    try {
      const response = await fetch("/api/casting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          deadline: new Date(data.deadline),
          createdBy: "6ab3a53ffcd5613d31f627ba",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create casting.");
      }

      setSuccess("Casting call created successfully.");
      reset();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="text-sm font-medium">Title</label>
        <input
          {...register("title", {
            required: "Title is required.",
          })}
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          placeholder="e.g. Fashion Campaign"
        />
        {errors.title && (
          <p className="mt-2 text-sm text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          {...register("description", {
            required: "Description is required.",
          })}
          rows={5}
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          placeholder="Describe the casting opportunity..."
        />
        {errors.description && (
          <p className="mt-2 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Category</label>
        <select
          {...register("category", {
            required: "Category is required.",
          })}
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
        >
          <option value="">Select a category</option>
          <option value="Fashion">Fashion</option>
          <option value="Commercial">Commercial</option>
          <option value="Music">Music</option>
          <option value="Content">Content</option>
        </select>

        {errors.category && (
          <p className="mt-2 text-sm text-red-500">
            {errors.category.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Location</label>
        <input
          {...register("location", {
            required: "Location is required.",
          })}
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          placeholder="e.g. Prishtina"
        />
        {errors.location && (
          <p className="mt-2 text-sm text-red-500">
            {errors.location.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Deadline</label>
        <input
          type="date"
          {...register("deadline", {
            required: "Deadline is required.",
          })}
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />
        {errors.deadline && (
          <p className="mt-2 text-sm text-red-500">
            {errors.deadline.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">
          Compensation
        </label>
        <input
          {...register("compensation")}
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          placeholder="e.g. €500"
        />
      </div>

      {success && (
        <p className="rounded-xl bg-gray-100 p-4 text-sm">
          {success}
        </p>
      )}

      {error && (
        <p className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
      >
        {isSubmitting ? "Creating..." : "Create Casting"}
      </button>
    </form>
  );
}