'use client';

import { useState } from 'react';

import { cn } from '@/lib/cn';

type SegmentedHeroVideoProps = {
    className?: string;
    src?: string;
};

export default function SegmentedHeroVideo({
    className,
    src = '/videos/laptop-forward.webm',
}: SegmentedHeroVideoProps) {
    const [hasError, setHasError] = useState(false);

    function handleError() {
        setHasError(true);
    }

    if (hasError) {
        return (
            <div
                aria-hidden="true"
                className={cn(
                    'pattern-surface pointer-events-none relative z-10 flex aspect-[16/10] w-full max-w-[1320px] -translate-x-1/5 items-center justify-center rounded-2xl border border-white/10 bg-[#111111]/65 text-sm tracking-wide text-[#a3a3a3] uppercase',
                    className,
                )}
            >
                Laptop animation unavailable
            </div>
        );
    }

    return (
        <video
            muted
            playsInline
            preload="auto"
            autoPlay
            loop
            aria-hidden="true"
            controls={false}
            className={cn(
                'pointer-events-none h-auto w-full max-w-[1320px] -translate-x-1/5 object-contain',
                className,
            )}
            onError={handleError}
        >
            <source src={src} type="video/webm" />
        </video>
    );
}
