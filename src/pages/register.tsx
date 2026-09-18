import Link from "next/link";

export default function Register() {
  return (
    <main>
      <h1>Create your account</h1>

      <form>
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

        <button type="submit">Create Account</button>
      </form>

      <p>
        Already have an account?{" "}
        <Link href="/login">Login</Link>
      </p>
    </main>
  );
}