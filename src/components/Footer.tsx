import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="flex flex-col gap-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Link
              href="/"
              className="text-3xl font-bold tracking-tight"
            >
              TAKE
            </Link>

            <h2 className="mt-8 max-w-lg text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Where creative projects meet the right talent.
            </h2>
          </div>

          <div className="flex gap-12 text-sm">
            <div className="space-y-4">
              <Link
                href="/about"
                className="block text-gray-400 transition hover:text-white"
              >
                About
              </Link>

              <Link
                href="/talent"
                className="block text-gray-400 transition hover:text-white"
              >
                Talent
              </Link>

              <Link
                href="/casting"
                className="block text-gray-400 transition hover:text-white"
              >
                Casting
              </Link>
            </div>

            <div className="space-y-4">
              <Link
                href="/contact"
                className="block text-gray-400 transition hover:text-white"
              >
                Contact
              </Link>

              <Link
                href="/favorites"
                className="block text-gray-400 transition hover:text-white"
              >
                Favorites
              </Link>

              <Link
                href="/login"
                className="block text-gray-400 transition hover:text-white"
              >
                Login
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 TAKE. All rights reserved.</p>
          <p>Creative Production &amp; Casting Platform</p>
        </div>
      </div>
    </footer>
  );
}