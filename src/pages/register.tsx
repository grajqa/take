import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
    }
    finally {
    setIsSubmitting(false);
    }
  };

  return (
    <main>
      <h1>Create your account</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
          />
        </div>

        <div>
          <label htmlFor="role">I am a</label>
          <select id="role" name="role">
            <option value="talent">Talent</option>
            <option value="client">Client</option>
          </select>
        </div>

        {message && <p>{message}</p>}
        {error && <p>{error}</p>}

        <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Account"}
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <Link href="/login">Login</Link>
      </p>
    </main>
  );
}