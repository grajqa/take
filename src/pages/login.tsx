import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
      setIsSubmitting(false);
      return;
    }

    await router.push("/dashboard");
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-16 px-6 py-16 md:grid-cols-2 md:py-24">
        <div className="hidden md:block">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Welcome back
          </p>

          <h1 className="mt-6 max-w-xl text-6xl font-bold tracking-tight">
            Your creative network starts here.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
            Sign in to discover talent, explore casting opportunities, and
            manage your creative projects.
          </p>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                TAKE
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Log in
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Access your TAKE account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="Enter your password"
                  required
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3.5 outline-none transition placeholder:text-gray-400 focus:border-black"
                />
              </div>

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
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() =>
                  signIn("google", {
                    callbackUrl: "/dashboard",
                  })
                }
                className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-200 px-6 py-3.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    fill="#4285F4"
                    d="M21.35 12.27c0-.79-.07-1.55-.23-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 21.7c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.7Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M6.54 13.79a5.86 5.86 0 0 1 0-3.58V7.68H3.3a9.74 9.74 0 0 0 0 8.64l3.24-2.53Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 6.18c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.3 14.63 2.3 12 2.3a9.74 9.74 0 0 0-8.7 5.38l3.24 2.53C7.31 7.9 9.46 6.18 12 6.18Z"
                  />
                </svg>

                Continue with Google
              </button>

              <button
                type="button"
                onClick={() =>
                  signIn("facebook", {
                    callbackUrl: "/dashboard",
                  })
                }
                className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-200 px-6 py-3.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    fill="#1877F2"
                    d="M24 12a12 12 0 1 0-13.88 11.85v-8.39H7.08V12h3.04V9.41c0-3 1.79-4.66 4.53-4.66 1.31 0 2.68.23 2.68.23v2.95h-1.51c-1.49 0-1.96.93-1.96 1.88V12h3.34l-.53 3.46h-2.81v8.39A12 12 0 0 0 24 12Z"
                  />
                </svg>

                Continue with Facebook
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-black underline underline-offset-4"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}