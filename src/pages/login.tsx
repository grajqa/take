import Link from "next/link";

export default function Login() {
  return (
    <main>
      <h1>Login</h1>

      <form>
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
            placeholder="Enter your password"
          />
        </div>

        <button type="submit">Login</button>
      </form>

    <p>
        Don&apos;t have an account?{" "}
        <Link href="/register">Register</Link>
    </p>
    </main>
  );
}