import Link from 'next/link'

export default function GetStartBtn() {
  return (
    <div className="flex gap-6 mt-4">
      <Link
        href="/start"
        className="bg-[var(--luxury-gold)] text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-[var(--luxury-gold-light)] transition-colors text-lg"
      >
        Get Started
      </Link>
      <Link
        href="#learn-more"
        className="border border-[var(--luxury-gold)] text-[var(--luxury-gold)] font-semibold px-8 py-3 rounded-full hover:bg-[color-mix(in_srgb,var(--luxury-gold)_10%,transparent)] transition-colors text-lg"
      >
        Learn More
      </Link>
    </div>
  );
}
