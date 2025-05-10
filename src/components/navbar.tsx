import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import SearchBar from "./search-bar";

export default function Navbar() {
  return (
    <nav className="p-4 sticky top-0 z-50 backdrop-blur-3xl">
      <div className="container mx-auto flex items-center justify-between gap-8">
        <Link
          href="/"
          className="text-lg md:text-2xl font-bold text-primary tracking-wider"
        >
          Weather<span className="text-violet-800">ly</span>
        </Link>

        <div className="flex items-center">
          <SearchBar />

          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
