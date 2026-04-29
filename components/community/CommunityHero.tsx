import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { ASSETS } from '@/lib/assets';

export default function CommunityHero() {
    return (
        <section className="relative overflow-hidden pt-28 pb-14 sm:pt-32 lg:pb-18">
            <div className="pointer-events-none absolute inset-0 bg-radial-[circle_at_50%_0%] from-[#23446f]/40 via-[#07101e]/15 to-transparent"></div>
            <AnimatedSection
                as="div"
                className="absolute top-[-3%] left-1/2 z-0 mx-auto w-screen max-w-[1000px] -translate-x-1/2"
                delay={0.04}
            >
                <video
                    autoPlay
                    className="h-full w-full object-cover opacity-95"
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    src={ASSETS.communityVideo}
                />
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0) 22%), linear-gradient(to left, rgba(0,0,0,0.9), rgba(0,0,0,0) 22%), linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0) 22%), linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0) 22%)',
                    }}
                ></div>
            </AnimatedSection>

            <AnimatedSection
                className="relative mx-auto mt-15 max-w-[670px] pt-[20%] text-center"
                delay={0.11}
            >
                <span className="pattern-surface inline-flex rounded-full border border-white/12 px-4 py-1.5 text-[0.96rem] text-[#c7c7c7]">
                    Community
                </span>
                <h1 className="mt-6 text-[clamp(2.2rem,2.2vw,4rem)] leading-[1.1] text-balance text-[#d4d4d4]">
                    Focused <span className="text-[#8440e1]">XRPL-native</span>{' '}
                    trading <span className="text-[#2de868]">community.</span>
                </h1>
                <p className="mx-auto mt-5 max-w-[760px] text-[clamp(1rem,1.55vw,1.36rem)] leading-[1.72] text-balance text-[#9e9e9e]">
                    SIGMA combines community, access, and proprietary tooling
                    into a structured trading environment built for XRPL-native
                    users. A focused XRPL-native trading community built around
                    alignment, participation, and shared market context.
                </p>
                <div className="mt-7">
                    <Button href="#trader-type">
                        What kind of trader are you?
                    </Button>
                </div>
            </AnimatedSection>
        </section>
    );
}
