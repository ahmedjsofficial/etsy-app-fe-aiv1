"use client";

import { useState } from "react";
import NextLink from "next/link";
import { Dialog } from "@base-ui/react/dialog";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/button-link";
import { authLinks, primaryNav, type NavGroup, type NavLinkItem } from "@/lib/content/landing";
import { cn } from "@/lib/utils";

const triggerClass =
  "inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-[0.9375rem] font-semibold text-hero-foreground/90 outline-none transition-colors hover:text-hero-foreground hover:bg-hero-foreground/8 data-popup-open:bg-hero-foreground/10 data-popup-open:text-hero-foreground focus-visible:ring-2 focus-visible:ring-hero-foreground/50";

function MenuLink({ item }: { item: NavLinkItem }) {
  return (
    <NavigationMenu.Link
      render={<NextLink href={item.href} />}
      className="group/link block rounded-xl p-3 outline-none transition-colors hover:bg-muted focus-visible:bg-muted"
    >
      <span className="block text-sm font-bold text-popover-foreground">{item.label}</span>
      {item.description && (
        <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted-foreground">{item.description}</span>
      )}
    </NavigationMenu.Link>
  );
}

function DesktopNav({ items, className }: { items: NavGroup[]; className?: string }) {
  return (
    <NavigationMenu.Root className={cn("relative", className)} aria-label="Primary">
      <NavigationMenu.List className="flex items-center gap-1">
        {items.map((group) => (
          <NavigationMenu.Item key={group.label}>
            {group.items ? (
              <>
                <NavigationMenu.Trigger className={triggerClass}>
                  {group.label}
                  <NavigationMenu.Icon className="transition-transform duration-300 data-popup-open:rotate-180">
                    <ChevronDown className="size-4" strokeWidth={2.25} />
                  </NavigationMenu.Icon>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="w-[min(30rem,calc(100vw-2rem))] p-2 transition-[opacity,translate] duration-300 ease-out-expo data-starting-style:opacity-0 data-ending-style:opacity-0 data-starting-style:data-[activation-direction=left]:-translate-x-6 data-starting-style:data-[activation-direction=right]:translate-x-6">
                  <ul className="grid grid-cols-2 gap-1">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <MenuLink item={item} />
                      </li>
                    ))}
                  </ul>
                </NavigationMenu.Content>
              </>
            ) : (
              <NavigationMenu.Link render={<NextLink href={group.href ?? "#"} />} className={triggerClass}>
                {group.label}
              </NavigationMenu.Link>
            )}
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      <NavigationMenu.Portal>
        <NavigationMenu.Positioner
          sideOffset={12}
          collisionPadding={16}
          className="z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left] duration-300 ease-out-expo data-instant:transition-none"
        >
          <NavigationMenu.Popup className="relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-[0_24px_60px_-20px_rgba(36,16,47,0.45)] transition-[opacity,scale,width,height] duration-300 ease-out-expo data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
            <NavigationMenu.Viewport className="relative size-full overflow-hidden" />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}

function MobileNav({ items, className }: { items: NavGroup[]; className?: string }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open menu"
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-full border border-hero-border text-hero-foreground outline-none transition-colors hover:bg-hero-foreground/10 focus-visible:ring-2 focus-visible:ring-hero-foreground/60",
          className,
        )}
      >
        <Menu className="size-5" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-hero-from/60 backdrop-blur-sm transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed inset-y-0 right-0 z-50 flex w-[min(24rem,100vw)] flex-col bg-background text-foreground shadow-2xl outline-none transition-transform duration-500 ease-out-expo data-ending-style:translate-x-full data-starting-style:translate-x-full">
          <div className="flex items-center justify-between px-6 pt-5">
            <Dialog.Title render={<div />}>
              <Logo className="text-foreground" />
            </Dialog.Title>
            <Dialog.Close
              aria-label="Close menu"
              className="inline-flex size-11 items-center justify-center rounded-full hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/60 outline-none"
            >
              <X className="size-5" />
            </Dialog.Close>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="space-y-6">
              {items.map((group) => (
                <li key={group.label}>
                  {group.items ? (
                    <>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                        {group.label}
                      </p>
                      <ul className="mt-2 space-y-1">
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <NextLink
                              href={item.href}
                              onClick={close}
                              className="block rounded-xl px-3 py-2.5 font-heading text-2xl leading-tight transition-colors hover:bg-muted"
                            >
                              {item.label}
                            </NextLink>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <NextLink
                      href={group.href ?? "#"}
                      onClick={close}
                      className="block rounded-xl px-3 py-2.5 font-heading text-2xl leading-tight transition-colors hover:bg-muted"
                    >
                      {group.label}
                    </NextLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-3 border-t border-border p-6">
            <ButtonLink href={authLinks.signup.href} onClick={close} variant="brand" size="pill-lg">
              {authLinks.signup.label}
              <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href={authLinks.login.href} onClick={close} variant="outline" size="pill-lg" className="rounded-full">
              {authLinks.login.label}
            </ButtonLink>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function SiteHeader({ className }: { className?: string }) {
  return (
    <header className={cn("relative z-30 text-hero-foreground", className)}>
      <div className="app-container flex h-20 items-center justify-between gap-6 lg:h-24">
        <Logo />
        <DesktopNav items={primaryNav} className="hidden lg:block" />
        <div className="flex items-center gap-3">
          <ButtonLink href={authLinks.login.href} variant="hero-outline" size="pill" className="hidden sm:inline-flex">
            {authLinks.login.label}
          </ButtonLink>
          <ButtonLink href={authLinks.signup.href} variant="brand" size="pill" className="group hidden sm:inline-flex">
            {authLinks.signup.label}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </ButtonLink>
          <MobileNav items={primaryNav} className="lg:hidden" />
        </div>
      </div>
    </header>
  );
}
