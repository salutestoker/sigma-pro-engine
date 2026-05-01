import fs from 'node:fs';
import path from 'node:path';

import TokenIconCarousel, {
    TokenIconCarouselItem,
} from '@/components/community/TokenIconCarousel';

const ASSET_IMAGES_DIRECTORY = path.join(
    process.cwd(),
    'public',
    'images',
    'assets',
);

function toAssetLabel(filename: string) {
    return filename
        .replace(/\.[^.]+$/, '')
        .replace(/[-_]+/g, ' ')
        .trim();
}

function getAssetItems(): TokenIconCarouselItem[] {
    const allowedExtensions = new Set([
        '.png',
        '.jpg',
        '.jpeg',
        '.webp',
        '.svg',
    ]);

    if (!fs.existsSync(ASSET_IMAGES_DIRECTORY)) {
        return [];
    }

    return fs
        .readdirSync(ASSET_IMAGES_DIRECTORY)
        .filter((filename) => {
            const extension = path.extname(filename).toLowerCase();
            return allowedExtensions.has(extension);
        })
        .sort((a, b) => a.localeCompare(b))
        .map((filename) => ({
            src: `/images/assets/${filename}`,
            label: toAssetLabel(filename),
        }));
}

export default function TokenIconStrip() {
    const assets = getAssetItems();

    if (assets.length === 0) {
        return null;
    }

    return (
        <section className="relative isolate w-full py-20">
            <div className="pointer-events-none absolute inset-0 bg-radial-[circle_at_20%_25%] from-[#8440e1]/24 via-black/25 to-black"></div>
            <div className="pointer-events-none absolute inset-0 bg-radial-[circle_at_84%_72%] from-[#2de868]/10 via-black/10 to-black"></div>
            <div
                className="pointer-events-none absolute inset-0 opacity-26"
                style={{
                    backgroundImage: "url('/images/pattern-dots.png')",
                    backgroundSize: '180px 180px',
                }}
            ></div>

            <div className="relative z-10 mx-auto flex w-full max-w-[1700px] flex-col justify-center px-4 py-16 text-center sm:px-7 md:px-10">
                <h2 className="text-[1.5rem] tracking-[0.16em] text-[#b3b3b3] uppercase">
                    Currently Tracked Assets
                </h2>
                <p className="mx-auto mt-4 max-w-[760px] text-[clamp(1.1rem,2.1vw,1.6rem)] leading-[1.5] text-[#d2d2d2]">
                    Markets move <span className="text-[#2de868]">fast</span>.
                    Stay familiar with the symbols that&nbsp;
                    <span className="text-[#8440e1]">matter</span>.
                </p>

                <TokenIconCarousel assets={assets} />
            </div>
        </section>
    );
}
