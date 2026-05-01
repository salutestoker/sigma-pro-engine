import GetStartedSteps from '@/components/get-started/GetStartedSteps';
import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';

export default function GetStartedPage() {
    return (
        <div className="relative min-h-screen overflow-x-clip bg-black">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-[#020305] via-black to-black"></div>

            <SiteHeader />

            <main className="relative z-10">
                <GetStartedSteps />
            </main>

            <SiteFooter />
        </div>
    );
}
