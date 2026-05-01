'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

import Button from '@/components/ui/Button';
import { ASSETS } from '@/lib/assets';
import { cn } from '@/lib/cn';
import { EXTERNAL_LINKS, SITE_NAV_LINKS } from '@/lib/links';

type SiteHeaderProps = {
    className?: string;
};

function isNavItemActive(pathname: string, href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader({ className }: SiteHeaderProps) {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const reducedMotion = useReducedMotion();

    const activePath = useMemo(() => pathname ?? '/', [pathname]);

    return (
        <header
            className={cn(
                'pointer-events-none fixed inset-x-0 top-0 z-50',
                className,
            )}
        >
            <div className="mx-auto flex w-full items-center justify-between gap-4 px-4 pt-4 md:px-7 md:pt-6">
                <Link
                    aria-label="SIGMA Pro Engine"
                    className="pointer-events-auto block transition hover:opacity-95"
                    href="/"
                >
                    <Image
                        alt="SIGMA Pro Engine logo"
                        className="h-auto w-[4vw] max-w-[60px] min-w-[40px]"
                        height={1135}
                        priority
                        src={ASSETS.logoMain}
                        width={1057}
                    />
                </Link>

                <nav
                    className="pointer-events-auto fixed left-1/2 hidden -translate-x-1/2 md:block"
                    aria-label="Primary navigation"
                >
                    <div className="pattern-surface rounded-2xl bg-[#111111]/82 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.95)] backdrop-blur-sm">
                        <ul className="flex items-center gap-1.5">
                            {SITE_NAV_LINKS.map((item, index) => {
                                const active = isNavItemActive(
                                    activePath,
                                    item.href,
                                );
                                const isFirst = index === 0;
                                const isLast =
                                    index === SITE_NAV_LINKS.length - 1;

                                return (
                                    <li key={item.href}>
                                        <Link
                                            className={cn(
                                                'inline-flex h-10 items-center justify-center px-5 text-[0.95rem] text-[#bcbcbc] transition-all duration-300 hover:text-white focus-visible:ring-2 focus-visible:ring-[#9446ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none',
                                                active &&
                                                    'bg-linear-to-r from-[#9446ff] via-[#8440e1] to-[#6830ba] text-white shadow-[0_10px_30px_-16px_rgba(132,64,225,0.92)]',
                                                active &&
                                                    isFirst &&
                                                    'rounded-r-0 rounded-l-xl',
                                                active &&
                                                    isLast &&
                                                    'rounded-l-0 rounded-r-xl',
                                                // active &&
                                                //     !isFirst &&
                                                //     !isLast &&
                                                //     'rounded-xl',
                                                // !active && 'rounded-xl',
                                            )}
                                            href={item.href}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </nav>

                <div className="pointer-events-auto flex items-center gap-2">
                    <Button
                        href={EXTERNAL_LINKS.connectWallet}
                        size="sm"
                        variant="secondary"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Connect Wallet
                    </Button>

                    <button
                        aria-controls="mobile-nav"
                        aria-expanded={menuOpen}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        className="pattern-surface flex h-10 w-10 items-center justify-center rounded-[14px] border border-white/15 bg-[#111111]/82 text-white transition hover:border-white/30 focus-visible:ring-2 focus-visible:ring-[#9446ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none md:hidden"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        type="button"
                    >
                        <span className="sr-only">Toggle navigation</span>
                        <div className="flex w-[16px] flex-col gap-[3px]">
                            <span
                                className={cn(
                                    'h-[2px] w-full rounded-full bg-white transition-transform duration-300',
                                    menuOpen && 'translate-y-[5px] rotate-45',
                                )}
                            ></span>
                            <span
                                className={cn(
                                    'h-[2px] w-full rounded-full bg-white transition-opacity duration-300',
                                    menuOpen && 'opacity-0',
                                )}
                            ></span>
                            <span
                                className={cn(
                                    'h-[2px] w-full rounded-full bg-white transition-transform duration-300',
                                    menuOpen && '-translate-y-[5px] -rotate-45',
                                )}
                            ></span>
                        </div>
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.nav
                        animate={{ opacity: 1, y: 0 }}
                        className="pattern-surface pointer-events-auto mx-4 mt-4 rounded-2xl border border-white/12 bg-[#101010]/92 p-3 shadow-[0_25px_80px_-30px_rgba(0,0,0,1)] backdrop-blur-sm md:hidden"
                        exit={{ opacity: 0, y: -10 }}
                        id="mobile-nav"
                        initial={reducedMotion ? false : { opacity: 0, y: -10 }}
                        transition={{
                            duration: 0.23,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        <ul className="flex flex-col gap-1">
                            {SITE_NAV_LINKS.map((item) => {
                                const active = isNavItemActive(
                                    activePath,
                                    item.href,
                                );

                                return (
                                    <li key={item.href}>
                                        <Link
                                            className={cn(
                                                'block rounded-xl px-4 py-3 text-[0.98rem] text-[#c8c8c8] transition hover:text-white focus-visible:ring-2 focus-visible:ring-[#9446ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none',
                                                active &&
                                                    'bg-linear-to-r from-[#9446ff] via-[#8440e1] to-[#6830ba] text-white',
                                            )}
                                            href={item.href}
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
