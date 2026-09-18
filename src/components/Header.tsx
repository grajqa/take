import Link from "next/link";

export default function Header() {
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

          <Link
            href="/login"
            className="rounded-full bg-black px-5 py-2.5 !text-white transition hover:bg-gray-800"
          >
            Login
          </Link>
          {/* the ! tells Tailwind: this text color must be white, overriding any other rule. */}
        </div>
      </nav>
    </header>
  );
}