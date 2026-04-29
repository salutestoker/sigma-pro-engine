import CommunityHero from '@/components/community/CommunityHero';
import DiscordSignalsSection from '@/components/community/DiscordSignalsSection';
import StatsGrid from '@/components/community/StatsGrid';
import TokenIconStrip from '@/components/community/TokenIconStrip';
import TraderTypeSection from '@/components/community/TraderTypeSection';
import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';

export default function CommunityPage() {
    return (
        <div className="relative min-h-screen overflow-x-clip bg-black">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-[#04070c] via-black to-black"></div>
            <SiteHeader />
            <main className="relative z-10 pb-10">
                <CommunityHero />
                <StatsGrid />
                <TokenIconStrip />
                <DiscordSignalsSection />
                <TraderTypeSection />
            </main>
            <SiteFooter />
        </div>
    );
}
