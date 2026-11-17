import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { InstagramIcon, LinkedInIcon, XIcon, YoutubeIcon } from "@/components/icons";
import { footerContent } from "@/lib/content/landing";
import { cn } from "@/lib/utils";

const SOCIAL_ICONS = {
  x: XIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  linkedin: LinkedInIcon,
} as const;

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("bg-hero-from text-hero-foreground", className)}>
      <div className="app-container grid gap-12 py-14 sm:py-16 lg:grid-cols-[minmax(14rem,1.1fr)_minmax(0,2.4fr)] lg:gap-16 lg:py-20">
        <div className="flex max-w-xs flex-col gap-6">
          <div>
            <Logo className="text-hero-foreground" />
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-hero-muted">{footerContent.tagline}</p>
          </div>

          <ul className="flex flex-wrap gap-2.5">
            {footerContent.social.map((item) => {
              const Icon = SOCIAL_ICONS[item.id];
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className="flex size-10 items-center justify-center rounded-xl border border-hero-border text-hero-foreground transition-colors hover:border-hero-foreground/55 hover:bg-hero-foreground/5"
                  >
                    <Icon className="size-4" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 sm:gap-x-6">
          {footerContent.columns.map((column) => (
            <div key={column.title}>
              <p className="text-[0.9375rem] font-extrabold tracking-[-0.01em] text-hero-foreground">
                {column.title}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[0.875rem] text-hero-muted transition-colors hover:text-hero-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}
