'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

import { cn } from '@/lib/cn';

type PageVideoLoadGateProps = {
    children: ReactNode;
};

function isVideoReady(video: HTMLVideoElement) {
    return video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA;
}

export default function PageVideoLoadGate({
    children,
}: PageVideoLoadGateProps) {
    const pathname = usePathname();
    const [loadedPathname, setLoadedPathname] = useState<string>('');
    const isReady = loadedPathname === pathname;

    useEffect(() => {
        let isCancelled = false;
        const cleanupListeners: Array<() => void> = [];

        const fallbackTimeout = window.setTimeout(() => {
            if (!isCancelled) {
                setLoadedPathname(pathname);
            }
        }, 20000);

        const markReady = () => {
            if (isCancelled) {
                return;
            }

            window.clearTimeout(fallbackTimeout);
            setLoadedPathname(pathname);
        };

        const scanVideos = () => {
            const videos = Array.from(document.querySelectorAll('video'));

            if (videos.length === 0) {
                markReady();
                return;
            }

            let remaining = 0;

            const markSettled = () => {
                remaining -= 1;

                if (remaining <= 0) {
                    markReady();
                }
            };

            videos.forEach((video) => {
                if (isVideoReady(video) || video.error) {
                    return;
                }

                remaining += 1;

                const onReady = () => {
                    removeListeners();
                    markSettled();
                };

                const onError = () => {
                    removeListeners();
                    markSettled();
                };

                const removeListeners = () => {
                    video.removeEventListener('canplay', onReady);
                    video.removeEventListener('loadeddata', onReady);
                    video.removeEventListener('error', onError);
                };

                cleanupListeners.push(removeListeners);

                video.addEventListener('canplay', onReady, { once: true });
                video.addEventListener('loadeddata', onReady, { once: true });
                video.addEventListener('error', onError, { once: true });
            });

            if (remaining === 0) {
                markReady();
            }
        };

        const firstFrame = window.requestAnimationFrame(() => {
            window.requestAnimationFrame(scanVideos);
        });

        return () => {
            isCancelled = true;
            window.clearTimeout(fallbackTimeout);
            window.cancelAnimationFrame(firstFrame);

            cleanupListeners.forEach((cleanup) => cleanup());
        };
    }, [pathname]);

    return (
        <>
            <div
                aria-busy={!isReady}
                className={cn(
                    'transition-opacity duration-300',
                    !isReady && 'pointer-events-none opacity-0',
                )}
            >
                {children}
            </div>

            {!isReady && (
                <div
                    aria-live="polite"
                    className="fixed inset-0 z-[220] flex items-center justify-center bg-black"
                >
                    <div className="flex flex-col items-center gap-4">
                        <span className="h-11 w-11 animate-spin rounded-full border-2 border-white/20 border-t-white"></span>
                        <span className="text-xs tracking-[0.14em] text-[#cfcfcf] uppercase">
                            Loading Media
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}
