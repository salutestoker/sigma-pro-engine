'use client';

import Image from 'next/image';

import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { ASSETS } from '@/lib/assets';

export default function TraderTypeSection() {
    return (
        <div className="relative">
            <AnimatedSection
                className="mx-auto w-full max-w-[1100px] px-4 md:px-7"
                delay={0.06}
                id="trader-type"
            >
                <div className="relative z-10 flex flex-col justify-center py-60">
                    <div className="w-full pt-24">
                        <h2 className="text-[clamp(1.95rem,2.8vw,3.45rem)] leading-[1.14] text-balance text-[#d6d6d6]">
                            What kind of{' '}
                            <span className="text-[#8440e1]">trader</span> are{' '}
                            <span className="text-[#2de868]">you?</span>
                        </h2>
                        <p className="mt-5 max-w-[670px] text-[clamp(1.02rem,1.7vw,1.24rem)] leading-[1.72] text-[#a7a7a7]">
                            Find out what type of trader you are in order to
                            know which products are best suited for you.
                        </p>

                        <div className="mt-7 max-w-[420px] space-y-5">
                            <label
                                className="sr-only"
                                htmlFor="trader-type-select"
                            >
                                Select your trader type
                            </label>
                            <div className="relative">
                                <select
                                    className="pattern-surface h-12 w-full appearance-none rounded-xl border border-white/12 bg-[#101010]/82 px-4 text-sm tracking-[0.06em] text-[#d0d0d0] uppercase focus-visible:ring-2 focus-visible:ring-[#9446ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                                    defaultValue=""
                                    id="trader-type-select"
                                >
                                    <option disabled value="">
                                        SELECT YOUR TRADER TYPE
                                    </option>
                                    <option value="scalper">Scalper</option>
                                    <option value="swing">Swing Trader</option>
                                    <option value="position">
                                        Position Trader
                                    </option>
                                </select>
                                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/55">
                                    ▾
                                </span>
                            </div>

                            <Button className="mt-2" type="button">
                                Continue
                            </Button>
                        </div>
                    </div>
                </div>
            </AnimatedSection>
            <div className="absolute top-20 right-0 z-0 h-full w-1/2">
                <Image
                    alt="Trader profile silhouette"
                    className="h-full w-full object-cover"
                    height={1491}
                    src={ASSETS.traderFigure}
                    width={1497}
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[12%] bg-gradient-to-b from-black to-transparent"></div>
            </div>
        </div>
    );
}
