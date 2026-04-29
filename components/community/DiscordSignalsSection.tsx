import Image from 'next/image';

import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { ASSETS } from '@/lib/assets';

export default function DiscordSignalsSection() {
    return (
        <AnimatedSection
            className="relative mx-auto w-full max-w-[1240px] px-4 py-5 md:px-7"
            delay={0.06}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -top-20 h-20 w-screen bg-linear-to-b from-black/0 to-black"
            ></div>

            <h2 className="mx-auto mt-6 max-w-[670px] text-center text-[clamp(2.2rem,2.2vw,4rem)] leading-[1.1] text-balance text-[#d4d4d4]">
                Trading alert <span className="text-[#2de868]">signals</span>{' '}
                directly&nbsp;through{' '}
                <span className="text-[#8440e1]">discord.</span>
            </h2>

            <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:gap-12">
                <div className="relative">
                    <Image
                        alt="SIGMA Discord trading signals"
                        className="relative w-full max-w-[760px] -rotate-3"
                        height={813}
                        src={ASSETS.discordMockup}
                        width={1350}
                    />
                </div>

                <div className="max-w-[520px]">
                    <p className="text-[clamp(1.08rem,1.6vw,1.36rem)] leading-[1.72] text-balance text-[#b9b9b9]">
                        Crypto traders are overwhelmed by noise. Most rely on
                        fragmented posts, hype cycles, and conflicting signals
                        instead of structured decision tools.
                    </p>
                    <div className="mt-8">
                        <Button
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://discord.com/channels/892551520451702804/1431238626179809370"
                        >
                            Discord Token Gated Access
                        </Button>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}
