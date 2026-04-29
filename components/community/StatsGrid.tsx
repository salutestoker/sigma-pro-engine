import AnimatedSection from '@/components/ui/AnimatedSection';
import PatternPanel from '@/components/ui/PatternPanel';

const STATS = [
    { label: 'community members', value: '65' },
    { label: 'active coins', value: '15' },
    { label: 'growth rate', value: '63%' },
    { label: 'retention rate', value: '95%' },
] as const;

export default function StatsGrid() {
    return (
        <AnimatedSection
            className="mx-auto w-full max-w-[1240px] px-4 md:px-7"
            delay={0.05}
        >
            <h2 className="sr-only">Community stats</h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {STATS.map((stat) => (
                    <PatternPanel
                        className="rounded-2xl border border-[#8440e1]/45 px-4 py-6 text-center shadow-[0_18px_44px_-26px_rgba(132,64,225,0.72)] sm:px-6"
                        key={stat.label}
                    >
                        <p className="font-heading text-[clamp(2.3rem,5.5vw,4.4rem)] leading-none text-[#e7e7e7]">
                            {stat.value}
                        </p>
                        <p className="mt-3 text-[0.95rem] text-[#a9a9a9] sm:text-[1.06rem]">
                            {stat.label}
                        </p>
                    </PatternPanel>
                ))}
            </div>
        </AnimatedSection>
    );
}
