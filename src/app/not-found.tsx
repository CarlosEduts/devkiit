import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <small className="font-bold text-gray-800 opacity-60">DevKiit</small>
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/">
        <Button>Go Back to Homepage</Button>
      </Link>
    </div>
  );
}
