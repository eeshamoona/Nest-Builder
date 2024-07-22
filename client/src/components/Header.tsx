// components/Header.tsx
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white fixed w-full z-10 top-0 shadow">
      <nav className="container mx-auto flex justify-between items-center p-5">
        <div className="text-lg font-bold">
          <Link href="/">Nested</Link>
        </div>
        <div className="space-x-4">
          <Link href="#welcome" scroll={false}>Welcome to Nested</Link>
          <Link href="#how-it-works" scroll={false}>How It Works</Link>
          <Link href="#about-us" scroll={false}>About Us</Link>
          <Link href="#our-success" scroll={false}>Our Success</Link>
          <Link href="#try-it-out" scroll={false}>Try It Out!</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
