'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/cn';

type HeroVideoProps = {
    className?: string;
    movSrc?: string;
    src?: string;
    webmSrc?: string;
};

export default function HeroVideo({
    className,
    src = '/videos/laptop-forward.webm',
    movSrc = '/videos/laptop-forward.mov',
    webmSrc,
}: HeroVideoProps) {
    const [hasError, setHasError] = useState(false);
    const resolvedWebmSrc = webmSrc ?? src;

    function handleVideoError(event: React.SyntheticEvent<HTMLVideoElement>) {
        const video = event.currentTarget;

        if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
            setHasError(true);
        }
    }

    function handleVideoReady() {
        setHasError(false);
    }

    useEffect(() => {
        if (!hasError) {
            return;
        }

        const retryTimeout = window.setTimeout(() => {
            setHasError(false);
        }, 900);

        return () => {
            window.clearTimeout(retryTimeout);
        };
    }, [hasError]);

    useEffect(() => {
        const handlePageShow = () => {
            setHasError(false);
        };

        window.addEventListener('pageshow', handlePageShow);

        return () => {
            window.removeEventListener('pageshow', handlePageShow);
        };
    }, []);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                setHasError(false);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange,
            );
        };
    }, []);

    if (!movSrc && !resolvedWebmSrc) {
        return null;
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
                'pointer-events-none h-auto w-full max-w-[1320px] -translate-x-1/5 object-contain max-[800px]:w-[200vw]',
                className,
            )}
            onCanPlay={handleVideoReady}
            onError={handleVideoError}
            onLoadedData={handleVideoReady}
        >
            {movSrc && <source src={movSrc} type="video/quicktime" />}
            {resolvedWebmSrc && (
                <source src={resolvedWebmSrc} type="video/webm" />
            )}
        </video>
    );
}
