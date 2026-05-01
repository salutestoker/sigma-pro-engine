import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import SegmentedHeroVideo from '@/components/ui/SegmentedHeroVideo';
import { ASSETS } from '@/lib/assets';
import { EXTERNAL_LINKS } from '@/lib/links';

export default function LandingHero() {
    return (
        <section className="relative flex flex-col justify-center min-[801px]:h-screen min-[801px]:max-h-screen">
            <div className="relative z-100 mx-auto w-full max-w-[1240px] items-center gap-10 px-4 max-[800px]:flex max-[800px]:flex-col max-[800px]:px-6 max-[800px]:text-center md:px-7 lg:grid-cols-[1.02fr_0.98fr] lg:gap-6">
                <AnimatedSection
                    className="relative z-10 order-2 w-[700px] max-w-[100vw] max-[800px]:mt-[100vw] max-[800px]:mb-10 max-[800px]:w-full max-[800px]:max-w-full lg:order-1"
                    delay={0.05}
                >
                    <span className="pattern-surface inline-flex rounded-full border border-white/12 px-4 py-1.5 text-[1.01rem] text-[#c9c9c9]">
                        SIGMA Pro Engine
                    </span>
                    <h1 className="mt-6 text-[clamp(2.2rem,2.2vw,4rem)] leading-[1.1] text-balance text-[#d4d4d4]">
                        <span className="text-[#8440e1]">Trading</span> is{' '}
                        lonely.&nbsp;But with{' '}
                        <span className="text-[#2de868]">SIGMA</span>, it
                        doesn&apos;t have to be
                    </h1>
                    <p className="mt-6 text-[clamp(1.05rem,1.4vw,2rem)] leading-[1.68] text-[#b3b3b3]">
                        The SIGMA Pro Engine provides structured momentum,
                        direction insight to help users interpret trend
                        conditions more consistently. Token-gated entry creates
                        a more committed user base and a stronger incentive
                        structure than open chat communities.
                    </p>
                    <div className="max-[800px]: mt-8 flex flex-wrap items-center gap-4 max-[800px]:justify-center">
                        <Button
                            className="min-w-[190px] max-[500px]:h-10 max-[500px]:min-w-0 max-[500px]:px-4 max-[500px]:text-[0.92rem]"
                            href="/get-started"
                        >
                            Get Started
                        </Button>
                        <Button
                            variant="secondary"
                            className="min-w-[212px] max-[500px]:h-10 max-[500px]:min-w-0 max-[500px]:px-4 max-[500px]:text-[0.92rem]"
                            href={EXTERNAL_LINKS.connectWallet}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Community
                        </Button>
                    </div>
                </AnimatedSection>

                <div className="pointer-events-none absolute z-[-1] max-[800px]:flex max-[800px]:justify-center">
                    <SegmentedHeroVideo
                        className="pointer-events-none fixed top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_28px_75px_rgba(0,0,0,0.9)] max-[800px]:static max-[800px]:top-auto max-[800px]:left-auto max-[800px]:translate-x-0 max-[800px]:translate-y-0"
                        src={ASSETS.laptopForwardVideo}
                    />
                </div>
            </div>
        </section>
    );
}
