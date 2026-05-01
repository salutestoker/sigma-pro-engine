'use client';

import Image from 'next/image';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/lib/cn';

export type TokenIconCarouselItem = {
    label: string;
    src: string;
};

type TokenIconCarouselProps = {
    assets: TokenIconCarouselItem[];
};

const AUTO_SCROLL_SPEED_PX_PER_SECOND = 26;

function wrapScrollPosition(track: HTMLDivElement, halfWidth: number) {
    if (halfWidth <= 0) {
        return;
    }

    if (track.scrollLeft >= halfWidth) {
        track.scrollLeft -= halfWidth;
    } else if (track.scrollLeft < 0) {
        track.scrollLeft += halfWidth;
    }
}

export default function TokenIconCarousel({ assets }: TokenIconCarouselProps) {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const draggingRef = useRef(false);
    const hoveringRef = useRef(false);
    const pointerIdRef = useRef<number | null>(null);
    const lastPointerXRef = useRef(0);
    const scrollRemainderRef = useRef(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const loopItems = useMemo(() => [...assets, ...assets], [assets]);

    useEffect(() => {
        const track = trackRef.current;

        if (!track || assets.length === 0) {
            return;
        }

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        let animationFrameId = 0;
        let previousTimestamp = 0;

        const animate = (timestamp: number) => {
            if (previousTimestamp === 0) {
                previousTimestamp = timestamp;
            }

            const deltaMs = timestamp - previousTimestamp;
            previousTimestamp = timestamp;

            const shouldPause = draggingRef.current || hoveringRef.current;

            if (!shouldPause && !prefersReducedMotion) {
                scrollRemainderRef.current +=
                    (AUTO_SCROLL_SPEED_PX_PER_SECOND * deltaMs) / 1000;
                const wholePixelDelta = Math.trunc(scrollRemainderRef.current);

                if (wholePixelDelta !== 0) {
                    track.scrollLeft += wholePixelDelta;
                    scrollRemainderRef.current -= wholePixelDelta;
                    wrapScrollPosition(track, track.scrollWidth / 2);
                }
            }

            animationFrameId = window.requestAnimationFrame(animate);
        };

        animationFrameId = window.requestAnimationFrame(animate);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [assets.length]);

    function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
        if (event.pointerType === 'mouse' && event.button !== 0) {
            return;
        }

        const track = trackRef.current;

        if (!track) {
            return;
        }

        draggingRef.current = true;
        setIsDragging(true);
        pointerIdRef.current = event.pointerId;
        lastPointerXRef.current = event.clientX;
        track.setPointerCapture(event.pointerId);
    }

    function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
        if (!draggingRef.current || pointerIdRef.current !== event.pointerId) {
            return;
        }

        const track = trackRef.current;

        if (!track) {
            return;
        }

        const deltaX = event.clientX - lastPointerXRef.current;
        lastPointerXRef.current = event.clientX;
        track.scrollLeft -= deltaX;
        wrapScrollPosition(track, track.scrollWidth / 2);
    }

    function handlePointerEnd(event: ReactPointerEvent<HTMLDivElement>) {
        const track = trackRef.current;

        if (pointerIdRef.current === event.pointerId) {
            pointerIdRef.current = null;
            draggingRef.current = false;
            setIsDragging(false);
        }

        if (track?.hasPointerCapture(event.pointerId)) {
            track.releasePointerCapture(event.pointerId);
        }
    }

    function handleMouseEnter() {
        hoveringRef.current = true;
        setIsHovering(true);
    }

    function handleMouseLeave() {
        hoveringRef.current = false;
        setIsHovering(false);
    }

    return (
        <div className="-mx-4 mt-12 px-4 sm:-mx-7 sm:px-7 md:-mx-10 md:px-10">
            <div
                className={cn(
                    'no-scrollbar flex w-full touch-pan-x items-start gap-6 overflow-x-auto pb-3 select-none',
                    isDragging ? 'cursor-grabbing' : 'cursor-grab',
                    isHovering && !isDragging && 'cursor-default',
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onPointerCancel={handlePointerEnd}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerEnd}
                ref={trackRef}
            >
                {loopItems.map((asset, index) => (
                    <div
                        className="relative shrink-0 text-center"
                        key={`${asset.src}-${index}`}
                    >
                        <div className="absolute inset-1 rounded-full bg-radial-[circle_at_center] from-[#8440e1]/50 via-[#51109a]/25 to-transparent blur-[11px]"></div>
                        <div className="relative rounded-full border border-[#8440e1]/28 bg-black/55 p-[7px] shadow-[0_18px_42px_-24px_rgba(132,64,225,0.82)]">
                            <Image
                                alt={`${asset.label} logo`}
                                className="h-[72px] w-[72px] rounded-full object-contain p-2 saturate-[1.08] sm:h-[88px] sm:w-[88px] md:h-[96px] md:w-[96px]"
                                draggable={false}
                                height={128}
                                src={asset.src}
                                width={128}
                            />
                        </div>

                        <span className="mt-2.5 block text-[0.68rem] tracking-[0.08em] whitespace-nowrap text-white uppercase">
                            {asset.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
