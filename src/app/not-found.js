export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900 px-4">
      <div className="text-center border border-neutral-800 bg-neutral-800 rounded-2xl p-10 max-w-md w-full shadow-lg">
        <h1 className="text-6xl font-extrabold text-[var(--luxury-gold)] mb-4">
          404
        </h1>
        <p className="text-lg text-neutral-300 mb-6">
          Sorry, the page you’re looking for doesn’t exist.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 text-sm font-medium text-[var(--luxury-black-1)] bg-[var(--luxury-gold)] rounded-md hover:brightness-110 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
