import { getSession, useSession } from "next-auth/react";
import type { GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import { useState } from "react";

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

export default function Profile() {
  const { data: session } = useSession();

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>();

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

      setSuccess("Profile saved successfully.");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  };

  return (
    <main>
      <h1>My Profile</h1>

      <p>Manage your professional information and portfolio.</p>

      <section>
        <h2>Personal Information</h2>

        <p>Name: {session?.user?.name || "Not available"}</p>
        <p>Email: {session?.user?.email || "Not available"}</p>
        <p>Role: {session?.user?.role || "Not available"}</p>
      </section>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Professional Information</h2>

        <div>
          <label htmlFor="category">Category</label>

          <select
            id="category"
            {...register("category", {
              required: "Category is required.",
            })}
          >
            <option value="">Select a category</option>
            <option value="Models">Models</option>
            <option value="Actors">Actors</option>
            <option value="Photographers">Photographers</option>
            <option value="Videographers">Videographers</option>
            <option value="Creative Directors">
              Creative Directors
            </option>
            <option value="Stylists">Stylists</option>
            <option value="Makeup & Hair Artists">
              Makeup & Hair Artists
            </option>
          </select>

          {errors.category && <p>{errors.category.message}</p>}
        </div>

        <div>
          <label htmlFor="location">Location</label>

          <input
            id="location"
            {...register("location", {
              required: "Location is required.",
            })}
            placeholder="e.g. Prishtina"
          />

          {errors.location && <p>{errors.location.message}</p>}
        </div>

        <div>
          <label htmlFor="experience">Experience</label>

          <input
            id="experience"
            {...register("experience")}
            placeholder="e.g. 2 years"
          />
        </div>

        <div>
          <label htmlFor="bio">Bio</label>

          <textarea
            id="bio"
            {...register("bio")}
            placeholder="Tell clients a little about yourself"
            rows={5}
          />
        </div>

        {success && <p>{success}</p>}
        {error && <p>{error}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </main>
  );
}