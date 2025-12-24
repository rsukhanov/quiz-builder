import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-blue-600 hover:opacity-80 transition-opacity">
          Quiz Builder
        </Link>
        
        <span className="text-sm font-medium text-slate-500">
          by Roman Sukhanov
        </span>
      </div>
    </header>
  );
}