import fs from 'node:fs';
import path from 'node:path';

import Image from 'next/image';

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

function getAssetItems() {
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
    const carouselItems = [...assets, ...assets];

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
                    Stay familiar with the symbols that&nbsp;{' '}
                    <span className="text-[#8440e1]">matter</span>.
                </p>

                <div className="asset-carousel relative mt-12">
                    <div className="asset-carousel-track flex w-max items-center gap-7 px-4 sm:gap-11 sm:px-6 md:gap-14">
                        {carouselItems.map((asset, index) => (
                            <div
                                className="group relative shrink-0"
                                key={`${asset.src}-${index}`}
                            >
                                <div className="absolute inset-1 rounded-full bg-radial-[circle_at_center] from-[#8440e1]/50 via-[#51109a]/25 to-transparent blur-[11px]"></div>
                                <div className="relative rounded-full border border-[#8440e1]/28 bg-black/55 p-[7px] shadow-[0_18px_42px_-24px_rgba(132,64,225,0.82)]">
                                    <Image
                                        alt={`${asset.label} logo`}
                                        className="h-[72px] w-[72px] rounded-full object-contain p-2 saturate-[1.08] sm:h-[88px] sm:w-[88px] md:h-[96px] md:w-[96px]"
                                        height={128}
                                        src={asset.src}
                                        width={128}
                                    />
                                </div>

                                <span className="pointer-events-none absolute top-full left-1/2 mt-3 -translate-x-1/2 rounded-md border border-white/15 bg-black/94 px-2.5 py-1 text-[0.68rem] tracking-[0.08em] whitespace-nowrap text-white uppercase opacity-0 transition duration-250 group-hover:opacity-100">
                                    {asset.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
