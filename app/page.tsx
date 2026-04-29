import LandingHero from '@/components/landing/LandingHero';
import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';
import { ASSETS } from '@/lib/assets';

export default function LandingPage() {
    return (
        <div className="relative h-screen overflow-hidden bg-black/60">
            <div className="pointer-events-none fixed inset-0 -z-10">
                <video
                    autoPlay
                    className="h-full w-full object-cover object-center"
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    src={ASSETS.moonVideo}
                />
                <div className="absolute inset-0 bg-black/48"></div>
                <div className="absolute inset-0 bg-radial-[circle_at_50%_40%] from-transparent via-black/12 to-black/72"></div>
                <div className="absolute inset-0 bg-linear-to-b from-black/18 via-transparent to-black/85"></div>
            </div>

            <SiteHeader />

            <main className="relative z-10 flex h-screen flex-col overflow-hidden">
                <LandingHero />

                <div className="mx-auto w-full max-w-[1500px] px-0">
                    <div className="h-px w-full bg-linear-to-r from-transparent via-white/14 to-transparent"></div>
                </div>

                <SiteFooter className="mt-auto" />
            </main>
        </div>
    );
}
