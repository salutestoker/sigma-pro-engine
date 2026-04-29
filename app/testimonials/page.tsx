import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';
import AnimatedSection from '@/components/ui/AnimatedSection';
import PatternPanel from '@/components/ui/PatternPanel';

const TESTIMONIALS = [
    {
        quote: 'The structure here keeps me disciplined. I stopped chasing random narratives and started trading with context.',
        author: 'Community Member',
    },
    {
        quote: 'Signals and discussion are aligned. It feels like a focused desk, not a noisy chat room.',
        author: 'Token Holder',
    },
    {
        quote: 'The ecosystem balance of community + tooling is exactly what I was missing.',
        author: 'XRPL Trader',
    },
] as const;

export default function TestimonialsPage() {
    return (
        <div className="relative min-h-screen overflow-x-clip bg-black">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-[circle_at_50%_0%] from-[#8440e1]/14 via-black to-black"></div>
            <SiteHeader />

            <main className="relative z-10 mx-auto w-full max-w-[1240px] px-4 pt-28 pb-16 sm:pt-32 md:px-7">
                <AnimatedSection>
                    <span className="pattern-surface inline-flex rounded-full border border-white/12 px-4 py-1.5 text-sm text-[#c7c7c7]">
                        Testimonials
                    </span>
                    <h1 className="mt-5 text-[clamp(2.1rem,4.5vw,4rem)] leading-[1.08] text-[#dddddd]">
                        Feedback from aligned traders in the SIGMA ecosystem.
                    </h1>
                </AnimatedSection>

                <AnimatedSection
                    className="mt-10 grid gap-4 md:grid-cols-3"
                    delay={0.07}
                >
                    {TESTIMONIALS.map((item) => (
                        <PatternPanel
                            className="rounded-2xl px-5 py-6"
                            key={item.quote}
                        >
                            <p className="text-[1.03rem] leading-[1.7] text-[#b9b9b9]">
                                “{item.quote}”
                            </p>
                            <p className="mt-4 text-sm text-[#2de868]">
                                {item.author}
                            </p>
                        </PatternPanel>
                    ))}
                </AnimatedSection>
            </main>

            <SiteFooter />
        </div>
    );
}
