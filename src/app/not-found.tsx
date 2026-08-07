import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f7f7f4] flex flex-col items-center justify-center text-[#0f171d] px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-[#5d6870] mb-8">Page Not Found</p>
      <Link
        href="/"
        className="rounded-lg bg-[#0e171d] px-6 py-3 font-semibold text-white transition hover:bg-[#1d2a32]"
      >
        Back to Quick Convert
      </Link>
    </div>
  );
}
