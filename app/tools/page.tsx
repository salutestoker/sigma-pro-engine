import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';
import AnimatedSection from '@/components/ui/AnimatedSection';
import PatternPanel from '@/components/ui/PatternPanel';

const TOOL_CARDS = [
    {
        title: 'Momentum Engine',
        text: 'Structured directional context and trend-state visibility with consistent visual language.',
    },
    {
        title: 'Signal Workspace',
        text: 'A clean workspace for active setups, invalidation levels, and disciplined execution context.',
    },
    {
        title: 'Market Radar',
        text: 'Token-level watchlists and category rotation views tuned for XRPL-native market behavior.',
    },
] as const;

export default function ToolsPage() {
    return (
        <div className="relative min-h-screen overflow-x-clip bg-black">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-[circle_at_80%_0%] from-[#2de868]/10 via-black to-black"></div>
            <SiteHeader />

            <main className="relative z-10 mx-auto w-full max-w-[1240px] px-4 pt-28 pb-16 sm:pt-32 md:px-7">
                <AnimatedSection>
                    <span className="pattern-surface inline-flex rounded-full border border-white/12 px-4 py-1.5 text-sm text-[#c7c7c7]">
                        Tools
                    </span>
                    <h1 className="mt-5 text-[clamp(2.1rem,4.5vw,4rem)] leading-[1.08] text-[#dddddd]">
                        Proprietary tools designed for conviction, not noise.
                    </h1>
                </AnimatedSection>

                <AnimatedSection
                    className="mt-10 grid gap-4 md:grid-cols-3"
                    delay={0.06}
                >
                    {TOOL_CARDS.map((card) => (
                        <PatternPanel
                            className="rounded-2xl px-5 py-6"
                            key={card.title}
                        >
                            <h2 className="text-[1.35rem] text-white">
                                {card.title}
                            </h2>
                            <p className="mt-3 text-[#a9a9a9]">{card.text}</p>
                        </PatternPanel>
                    ))}
                </AnimatedSection>
            </main>

            <SiteFooter />
        </div>
    );
}
