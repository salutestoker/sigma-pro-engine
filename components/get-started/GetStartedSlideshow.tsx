'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import { GetStartedSlide } from '@/components/get-started/types';
import { cn } from '@/lib/cn';

type GetStartedSlideshowProps = {
    className?: string;
    slides: GetStartedSlide[];
};

const AUTOPLAY_DELAY_MS = 5000;
const LEFT_ARROW_ICON = '/images/icon-arrow-left.svg';
const RIGHT_ARROW_ICON = '/images/icon-arrow-right.svg';

export default function GetStartedSlideshow({
    className,
    slides,
}: GetStartedSlideshowProps) {
    const reducedMotion = useReducedMotion();
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [autoplayEnabled, setAutoplayEnabled] = useState(true);

    const totalSlides = slides.length;
    const hasMultipleSlides = totalSlides > 1;

    const activeSlide = useMemo(
        () => slides[activeSlideIndex],
        [activeSlideIndex, slides],
    );

    useEffect(() => {
        if (!autoplayEnabled || !hasMultipleSlides) {
            return;
        }

        const intervalId = window.setInterval(() => {
            setDirection(1);
            setActiveSlideIndex((previousIndex) =>
                previousIndex === totalSlides - 1 ? 0 : previousIndex + 1,
            );
        }, AUTOPLAY_DELAY_MS);

        return () => window.clearInterval(intervalId);
    }, [autoplayEnabled, hasMultipleSlides, totalSlides]);

    function showNextSlide() {
        if (!hasMultipleSlides) {
            return;
        }

        setAutoplayEnabled(false);
        setDirection(1);
        setActiveSlideIndex((previousIndex) =>
            previousIndex === totalSlides - 1 ? 0 : previousIndex + 1,
        );
    }

    function showPreviousSlide() {
        if (!hasMultipleSlides) {
            return;
        }

        setAutoplayEnabled(false);
        setDirection(-1);
        setActiveSlideIndex((previousIndex) =>
            previousIndex === 0 ? totalSlides - 1 : previousIndex - 1,
        );
    }

    function showSlideByIndex(index: number) {
        if (!hasMultipleSlides || index === activeSlideIndex) {
            return;
        }

        setAutoplayEnabled(false);
        setDirection(index > activeSlideIndex ? 1 : -1);
        setActiveSlideIndex(index);
    }

    if (!activeSlide) {
        return null;
    }

    return (
        <div className={cn('relative overflow-hidden', className)}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-t-[16px] border border-b-0 border-white/12 bg-black">
                <AnimatePresence custom={direction} mode="wait">
                    <motion.div
                        animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
                        className="absolute inset-0"
                        custom={direction}
                        exit={
                            reducedMotion
                                ? { opacity: 0 }
                                : {
                                      opacity: 0,
                                      filter: 'blur(1.4px)',
                                      x: direction > 0 ? -26 : 26,
                                  }
                        }
                        initial={
                            reducedMotion
                                ? { opacity: 0 }
                                : {
                                      opacity: 0,
                                      filter: 'blur(1.4px)',
                                      x: direction > 0 ? 26 : -26,
                                  }
                        }
                        key={activeSlide.id}
                        transition={{
                            duration: reducedMotion ? 0.15 : 0.42,
                            ease: [0.2, 0.74, 0.25, 1],
                        }}
                    >
                        <motion.div
                            animate={{ scale: 1 }}
                            className="absolute inset-0"
                            initial={
                                reducedMotion ? { scale: 1 } : { scale: 1.02 }
                            }
                            transition={{
                                duration: reducedMotion ? 0.15 : 0.55,
                                ease: [0.19, 1, 0.22, 1],
                            }}
                        >
                            <Image
                                alt={activeSlide.alt}
                                className="object-cover"
                                fill
                                priority={activeSlideIndex === 0}
                                sizes="(max-width: 1023px) 100vw, 52vw"
                                src={activeSlide.src}
                            />
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {hasMultipleSlides && (
                    <>
                        <button
                            aria-label="Previous slide"
                            className="absolute top-1/2 left-3 z-20 -translate-y-1/2 transition hover:border-white/40 focus-visible:ring-2 focus-visible:ring-[#9446ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                            onClick={showPreviousSlide}
                            type="button"
                        >
                            <Image
                                alt=""
                                aria-hidden="true"
                                height={30}
                                src={LEFT_ARROW_ICON}
                                width={30}
                            />
                        </button>

                        <button
                            aria-label="Next slide"
                            className="absolute top-1/2 right-3 z-20 -translate-y-1/2 transition hover:border-white/40 focus-visible:ring-2 focus-visible:ring-[#9446ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                            onClick={showNextSlide}
                            type="button"
                        >
                            <Image
                                alt=""
                                aria-hidden="true"
                                height={30}
                                src={RIGHT_ARROW_ICON}
                                width={30}
                            />
                        </button>
                    </>
                )}
            </div>

            <div className="pattern-surface rounded-b-xl border border-t-0 border-white/12 px-3 py-2.5 text-[0.9rem] text-[#d1d1d1]">
                {activeSlide.caption ?? ' '}
            </div>

            {hasMultipleSlides && (
                <div className="mt-3 flex hidden items-center justify-between gap-4 px-1">
                    <span className="text-[0.75rem] tracking-[0.14em] text-[#aaaaaa] uppercase">
                        {activeSlideIndex + 1} / {totalSlides}
                    </span>

                    <div className="flex items-center gap-2">
                        {slides.map((slide, index) => (
                            <button
                                aria-label={`Show slide ${index + 1}`}
                                className={cn(
                                    'h-2 rounded-full transition-all duration-300',
                                    index === activeSlideIndex
                                        ? 'w-6 bg-[#8440e1]'
                                        : 'w-2 bg-white/28 hover:bg-white/45',
                                )}
                                key={slide.id}
                                onClick={() => showSlideByIndex(index)}
                                type="button"
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
