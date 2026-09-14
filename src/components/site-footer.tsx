import { profile } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with Next.js & GSAP.
      </p>
    </footer>
  );
}
