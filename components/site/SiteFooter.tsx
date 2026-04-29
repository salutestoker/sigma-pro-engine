import Link from 'next/link';

import PatternPanel from '@/components/ui/PatternPanel';
import { ASSETS } from '@/lib/assets';
import { cn } from '@/lib/cn';
import { EXTERNAL_LINKS } from '@/lib/links';
import Image from 'next/image';

type SiteFooterProps = {
    className?: string;
};

export default function SiteFooter({ className }: SiteFooterProps) {
    return (
        <footer className={cn('pb-6 sm:pb-8', className)}>
            <div className="mx-auto w-full max-w-[1240px] px-4 md:px-7">
                <PatternPanel className="relative z-100 rounded-2xl px-5 py-4 sm:px-7 sm:py-5">
                    <Image
                        alt="SIGMA Pro Engine logo"
                        className="absolute -bottom-1 left-1/2 h-auto w-[130px] -translate-x-1/2"
                        height={1135}
                        priority
                        src={ASSETS.logo}
                        width={1057}
                    />
                    <div className="flex flex-col items-start justify-between gap-4 text-sm text-[#a7a7a7] sm:flex-row sm:items-center">
                        <p className="text-[0.8rem]">
                            Copyright © 2026 SIGMA LABZ. All Rights Reserved.
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-[0.92rem] sm:gap-5 sm:text-[1rem]">
                            <Link
                                className="text-[0.8rem] transition hover:text-white focus-visible:ring-2 focus-visible:ring-[#9446ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                                href={EXTERNAL_LINKS.privacyPolicy}
                            >
                                Privacy Policy
                            </Link>
                            <span className="hidden text-white/25 sm:inline">
                                |
                            </span>
                            <Link
                                className="text-[0.8rem] transition hover:text-white focus-visible:ring-2 focus-visible:ring-[#9446ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                                href={EXTERNAL_LINKS.terms}
                            >
                                Terms and Conditions
                            </Link>
                        </div>
                    </div>
                </PatternPanel>
            </div>
        </footer>
    );
}
