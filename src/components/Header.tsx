import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          TAKE
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/" className="transition hover:text-gray-500">
            Home
          </Link>

          <Link href="/about" className="transition hover:text-gray-500">
            About
          </Link>

          <Link href="/talent" className="transition hover:text-gray-500">
            Talent
          </Link>

          <Link href="/casting" className="transition hover:text-gray-500">
            Casting
          </Link>

          <Link href="/contact" className="transition hover:text-gray-500">
            Contact
          </Link>

          {status === "loading" ? null : session ? (
            <>
              <Link
                href="/dashboard"
                className="transition hover:text-gray-500"
              >
                Dashboard
              </Link>

              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-full bg-black px-5 py-2.5 !text-white transition hover:bg-gray-800"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-black px-5 py-2.5 !text-white transition hover:bg-gray-800"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}