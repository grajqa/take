import { useForm } from "react-hook-form";
import { useState } from "react";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setSuccess("");
    setError("");

    try {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong.");
  }

  setSuccess("Your message has been sent successfully.");
  reset();
} catch (error) {
  setError(
    error instanceof Error
      ? error.message
      : "Something went wrong. Please try again."
  );
}
  };

  return (
    <main>
      <section className="border-b border-gray-200">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 md:grid-cols-[0.8fr_1.2fr] md:py-28">
          <div className="max-w-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Get in touch
            </p>

            <h1 className="mt-5 text-5xl font-bold tracking-tight md:text-6xl">
              Let&apos;s talk.
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Have a question, want to collaborate, or looking for creative
              talent? Send us a message and we&apos;ll get back to you.
            </p>

            <div className="mt-12 space-y-8">
              <div>
                <p className="text-sm font-medium text-gray-400">Email</p>
                <p className="mt-2 text-base font-medium">
                  hello@take-platform.com
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-400">
                  What we help with
                </p>
                <p className="mt-2 leading-7 text-gray-600">
                  Talent discovery, casting opportunities, partnerships, and
                  general questions about TAKE.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold tracking-tight">
                Send us a message
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Fill in the form below and we&apos;ll be in touch.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-900"
                >
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3.5 outline-none transition placeholder:text-gray-400 focus:border-black"
                  {...register("name", {
                    required: "Name is required.",
                  })}
                />

                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3.5 outline-none transition placeholder:text-gray-400 focus:border-black"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Please enter a valid email address.",
                    },
                  })}
                />

                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-900"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows={6}
                  placeholder="Tell us how we can help..."
                  className="mt-2 w-full resize-none rounded-xl border border-gray-200 px-4 py-3.5 outline-none transition placeholder:text-gray-400 focus:border-black"
                  {...register("message", {
                    required: "Message is required.",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters.",
                    },
                  })}
                />

                {errors.message && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {success && (
                <div className="rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-700">
                  {success}
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
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}