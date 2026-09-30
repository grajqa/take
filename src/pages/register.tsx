import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setIsSubmitting(true);
    setMessage("");
    setError("");

    const formData = new FormData(event.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setMessage("Account created successfully.");
      event.currentTarget.reset();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-16 px-6 py-16 md:grid-cols-2 md:py-24">
        <div className="hidden md:block">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Join TAKE
          </p>

          <h1 className="mt-6 max-w-xl text-6xl font-bold tracking-tight">
            Build your place in the creative network.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
            Create your account to discover creative talent, explore casting
            opportunities, or bring the right people into your next project.
          </p>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                TAKE
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Create an account
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Choose how you want to use TAKE.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-900"
                >
                  Name
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3.5 outline-none transition placeholder:text-gray-400 focus:border-black"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3.5 outline-none transition placeholder:text-gray-400 focus:border-black"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-900"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  required
                  minLength={6}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3.5 outline-none transition placeholder:text-gray-400 focus:border-black"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Use at least 6 characters.
                </p>
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="text-sm font-medium text-gray-900"
                >
                  I am a
                </label>

                <div className="relative mt-2">
                  <select
                    id="role"
                    name="role"
                    defaultValue="talent"
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3.5 pr-14 outline-none transition focus:border-black"
                  >
                    <option value="talent">Talent</option>
                    <option value="client">Client</option>
                  </select>

                  <svg
                    className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {message && (
                <div className="rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-700">
                  {message}
                </div>
              )}

              {error && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Creating..." : "Create Account"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-black underline underline-offset-4"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}