import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import PatternPanel from '@/components/ui/PatternPanel';
import { EXTERNAL_LINKS } from '@/lib/links';

export default function AccessPage() {
    return (
        <div className="relative min-h-screen overflow-x-clip bg-black">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-[circle_at_20%_0%] from-[#8440e1]/20 via-black to-black"></div>
            <SiteHeader />

            <main className="relative z-10 mx-auto w-full max-w-[1240px] px-4 pt-28 pb-16 sm:pt-32 md:px-7">
                <AnimatedSection>
                    <span className="pattern-surface inline-flex rounded-full border border-white/12 px-4 py-1.5 text-sm text-[#c7c7c7]">
                        Access
                    </span>
                    <h1 className="mt-5 max-w-[780px] text-[clamp(2.1rem,4.5vw,4rem)] leading-[1.08] text-[#dddddd]">
                        SIGMA access layers are built for aligned participation.
                    </h1>
                    <p className="mt-5 max-w-[740px] text-[clamp(1.04rem,1.6vw,1.28rem)] leading-[1.75] text-[#a8a8a8]">
                        This page is a production-ready placeholder for
                        token-gated onboarding, wallet checks, and role-based
                        product entry points.
                    </p>
                </AnimatedSection>

                <AnimatedSection
                    className="mt-10 grid gap-4 md:grid-cols-3"
                    delay={0.08}
                >
                    <PatternPanel className="rounded-2xl px-5 py-6">
                        <h2 className="text-[1.35rem] text-white">
                            Wallet Connect
                        </h2>
                        <p className="mt-3 text-[#a9a9a9]">
                            Authorize wallets and map users to SIGMA access
                            tiers.
                        </p>
                    </PatternPanel>
                    <PatternPanel className="rounded-2xl px-5 py-6">
                        <h2 className="text-[1.35rem] text-white">
                            Token Gate
                        </h2>
                        <p className="mt-3 text-[#a9a9a9]">
                            Enforce entry logic for community, indicators, and
                            premium tools.
                        </p>
                    </PatternPanel>
                    <PatternPanel className="rounded-2xl px-5 py-6">
                        <h2 className="text-[1.35rem] text-white">
                            Roles & Tiers
                        </h2>
                        <p className="mt-3 text-[#a9a9a9]">
                            Bind holdings to clearly defined product
                            entitlements.
                        </p>
                    </PatternPanel>
                </AnimatedSection>

                <AnimatedSection className="mt-10" delay={0.14}>
                    <Button href={EXTERNAL_LINKS.connectWallet}>
                        Connect Wallet
                    </Button>
                </AnimatedSection>
            </main>

            <SiteFooter />
        </div>
    );
}
