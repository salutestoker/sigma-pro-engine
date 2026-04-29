import Image from 'next/image';

import AnimatedSection from '@/components/ui/AnimatedSection';
import { ASSETS } from '@/lib/assets';

function extractTokenName(path: string) {
    return path
        .replace('/images/asset-', '')
        .replace('.png', '')
        .replace('Chainlink', 'Chainlink')
        .toUpperCase();
}

export default function TokenIconStrip() {
    return (
        <AnimatedSection
            className="mx-auto w-full max-w-[1240px] px-4 pt-18 text-center md:px-7"
            delay={0.05}
        >
            <h2 className="text-[18px] leading-tight text-[#cdcdcd]">
                currently tracked tokens
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-5 lg:gap-6">
                {ASSETS.tokens.map((token) => (
                    <div className="group relative" key={token}>
                        <div className="absolute inset-1 rounded-full bg-radial-[circle_at_center] from-[#8440e1]/50 via-[#51109a]/22 to-transparent blur-[7px]"></div>
                        <div className="relative rounded-full border border-[#8440e1]/30 bg-black/45 p-[4px] shadow-[0_12px_30px_-17px_rgba(132,64,225,0.72)]">
                            <Image
                                alt={`${extractTokenName(token)} token icon`}
                                className="h-[48px] w-[48px] rounded-full object-cover opacity-[0.9] mix-blend-screen saturate-[1.2] [filter:grayscale(1)_brightness(1.24)_hue-rotate(208deg)] transition group-hover:opacity-100"
                                height={64}
                                src={token}
                                width={64}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </AnimatedSection>
    );
}
