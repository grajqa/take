import { getSession, useSession } from "next-auth/react";
import type { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
    props: {},
  };
};

type ProfileFormData = {
  category: string;
  location: string;
  bio: string;
  experience: string;
};

type TalentProfile = ProfileFormData & {
  _id: string;
  userId: {
    _id: string;
  };
};

export default function Profile() {
  const { data: session } = useSession();

  const [talentId, setTalentId] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/talent");

        if (!response.ok) {
          throw new Error("Failed to load profile.");
        }

        const talents: TalentProfile[] = await response.json();

        const currentTalent = talents.find(
          (talent) =>
            String(talent.userId?._id) === session?.user?.id
        );

        if (currentTalent) {
          setTalentId(currentTalent._id);

          reset({
            category: currentTalent.category,
            location: currentTalent.location,
            bio: currentTalent.bio,
            experience: currentTalent.experience,
          });
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
        setError("Failed to load your profile.");
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchProfile();
    }
  }, [session?.user?.id, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    setSuccess("");
    setError("");

    try {
      const response = await fetch("/api/talent", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save profile.");
      }

      setTalentId(result._id);
      setSuccess("Profile saved successfully.");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  };

  const handleDelete = async () => {
    if (!talentId) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete your talent profile?"
    );

    if (!confirmed) {
      return;
    }

    setSuccess("");
    setError("");
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/talent/${talentId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to delete profile."
        );
      }

      setTalentId("");

      reset({
        category: "",
        location: "",
        bio: "",
        experience: "",
      });

      setSuccess("Profile deleted successfully.");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Account
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            My Profile
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600">
            Manage your professional information and make your profile
            visible to potential clients.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-2xl border border-gray-200 p-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-2xl font-semibold">
              {session?.user?.name?.charAt(0).toUpperCase() || "T"}
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              {session?.user?.name || "Your Name"}
            </h2>

            <p className="mt-1 break-words text-sm text-gray-500">
              {session?.user?.email || "No email available"}
            </p>

            <div className="mt-6 border-t border-gray-100 pt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Account type
              </p>

              <p className="mt-2 text-sm font-medium capitalize text-gray-700">
                {session?.user?.role || "Talent"}
              </p>
            </div>
          </aside>

          <div className="rounded-2xl border border-gray-200 p-6 md:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold tracking-tight">
                Professional Information
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Add information about your creative experience and
                professional background.
              </p>
            </div>

            {loading ? (
              <div className="py-12 text-center">
                <p className="text-sm text-gray-500">
                  Loading profile...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Category
                  </label>

                  <select
                    id="category"
                    {...register("category", {
                      required: "Category is required.",
                    })}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
                  >
                    <option value="">Select a category</option>
                    <option value="Models">Models</option>
                    <option value="Actors">Actors</option>
                    <option value="Photographers">
                      Photographers
                    </option>
                    <option value="Videographers">
                      Videographers
                    </option>
                    <option value="Creative Directors">
                      Creative Directors
                    </option>
                    <option value="Stylists">Stylists</option>
                    <option value="Makeup & Hair Artists">
                      Makeup & Hair Artists
                    </option>
                  </select>

                  {errors.category && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Location
                  </label>

                  <input
                    id="location"
                    {...register("location", {
                      required: "Location is required.",
                    })}
                    placeholder="e.g. Prishtina"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black"
                  />

                  {errors.location && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="experience"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Experience
                  </label>

                  <input
                    id="experience"
                    {...register("experience")}
                    placeholder="e.g. 2 years"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Bio
                  </label>

                  <textarea
                    id="bio"
                    {...register("bio")}
                    placeholder="Tell clients a little about yourself"
                    rows={6}
                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-black"
                  />
                </div>

                {success && (
                  <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {success}
                  </div>
                )}

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div className="flex flex-col gap-3 border-t border-gray-100 pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      loading ||
                      isDeleting
                    }
                    className="rounded-full bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? "Saving..." : "Save Profile"}
                  </button>

                  {talentId && (
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={
                        isSubmitting ||
                        isDeleting ||
                        loading
                      }
                      className="rounded-full border border-gray-300 px-7 py-3 text-sm font-medium text-gray-700 transition hover:border-red-300 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isDeleting
                        ? "Deleting..."
                        : "Delete Profile"}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}