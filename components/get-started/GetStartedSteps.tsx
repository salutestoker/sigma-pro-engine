import Image from 'next/image';
import Link from 'next/link';
import { CSSProperties } from 'react';

import GetStartedSlideshow from '@/components/get-started/GetStartedSlideshow';
import { GET_STARTED_STEPS } from '@/components/get-started/getStartedStepsConfig';
import AnimatedSection from '@/components/ui/AnimatedSection';

const TITLE_ACCENT_CLASSES = ['text-[#8440e1]', 'text-[#2de868]'] as const;
const LOGO_FLOAT_DURATIONS = [4.1, 4.8, 5.4, 6.1, 6.8] as const;
const LOGO_FLOAT_DELAYS = [0, -1.3, -2.7, -0.8, -3.6] as const;

function renderAlternatingTitle(title: string, stepIndex: number) {
    const titleWords = title.trim().split(/\s+/).filter(Boolean);

    if (titleWords.length === 0) {
        return null;
    }

    const lastWord = titleWords[titleWords.length - 1];
    const prefix = titleWords.slice(0, -1).join(' ');
    const accentClass = TITLE_ACCENT_CLASSES[stepIndex % 2];

    return (
        <>
            {prefix ? `${prefix} ` : ''}
            <span className={accentClass}>{lastWord}</span>
        </>
    );
}

export default function GetStartedSteps() {
    return (
        <section className="relative mt-10 mb-2 overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-22 md:mt-20 md:mb-50">
            <div className="pointer-events-none absolute inset-0 bg-radial-[circle_at_28%_18%] from-[#8440e1]/12 via-transparent to-transparent"></div>
            <div className="pointer-events-none absolute inset-0 bg-radial-[circle_at_78%_52%] from-[#2de868]/9 via-transparent to-transparent"></div>
            <div
                className="pointer-events-none absolute inset-0 opacity-16"
                style={{
                    backgroundImage: "url('/images/pattern-dots.png')",
                    backgroundSize: '180px 180px',
                }}
            ></div>

            <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 md:px-7">
                <ol className="space-y-18 sm:space-y-24">
                    {GET_STARTED_STEPS.map((step, stepIndex) => (
                        <AnimatedSection
                            as="div"
                            className="grid gap-8 lg:grid-cols-[1.02fr_1fr] lg:items-center"
                            delay={0.05 + stepIndex * 0.12}
                            key={step.id}
                        >
                            <div className="flex items-start gap-4 sm:gap-6 md:gap-8">
                                <span
                                    aria-hidden="true"
                                    className="shrink-0 text-[clamp(4.2rem,10vw,11.2rem)] leading-[0.86] text-[#d5d5d5]"
                                    style={{
                                        fontFamily:
                                            'Times New Roman, Times, serif',
                                    }}
                                >
                                    {stepIndex + 1}.
                                </span>

                                <div className="max-w-[560px] pt-4 sm:pt-6">
                                    <h2 className="text-[clamp(2rem,2vw,3.6rem)] leading-[1.08] text-[#dbdbdb] uppercase">
                                        {renderAlternatingTitle(
                                            step.title,
                                            stepIndex,
                                        )}
                                    </h2>
                                    <p className="mt-5 text-[clamp(1rem,1.4vw,1.92rem)] leading-[1.55] text-[#b2b2b2]">
                                        {step.description}
                                    </p>

                                    {step.logos.length > 0 && (
                                        <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
                                            {step.logos.map(
                                                (logo, logoIndex) => {
                                                    const resolvedLogoHeight =
                                                        logo.height ?? 25;
                                                    const floatVariantIndex =
                                                        (stepIndex * 7 +
                                                            logoIndex) %
                                                        LOGO_FLOAT_DURATIONS.length;
                                                    const floatStyle = {
                                                        animationDelay: `${LOGO_FLOAT_DELAYS[floatVariantIndex]}s`,
                                                        animationDuration: `${LOGO_FLOAT_DURATIONS[floatVariantIndex]}s`,
                                                    } satisfies CSSProperties;

                                                    const logoContent =
                                                        logo.src ? (
                                                            <Image
                                                                alt={
                                                                    logo.alt ??
                                                                    `${logo.label} logo`
                                                                }
                                                                className="w-auto"
                                                                height={
                                                                    resolvedLogoHeight
                                                                }
                                                                src={logo.src}
                                                                style={{
                                                                    height: `${resolvedLogoHeight}px`,
                                                                }}
                                                                width={
                                                                    logo.width ??
                                                                    160
                                                                }
                                                            />
                                                        ) : (
                                                            <span
                                                                className="text-[1.95rem] leading-none text-[#d3d3d3]"
                                                                style={{
                                                                    fontFamily:
                                                                        'Times New Roman, Times, serif',
                                                                }}
                                                            >
                                                                {logo.label}
                                                            </span>
                                                        );

                                                    if (!logo.href) {
                                                        return (
                                                            <div
                                                                className="get-started-logo-float inline-flex"
                                                                key={logo.id}
                                                                style={
                                                                    floatStyle
                                                                }
                                                            >
                                                                {logoContent}
                                                            </div>
                                                        );
                                                    }

                                                    return (
                                                        <Link
                                                            className="get-started-logo-float inline-flex transition hover:opacity-86 focus-visible:ring-2 focus-visible:ring-[#9446ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                                                            href={logo.href}
                                                            key={logo.id}
                                                            rel="noopener noreferrer"
                                                            style={floatStyle}
                                                            target="_blank"
                                                        >
                                                            {logoContent}
                                                        </Link>
                                                    );
                                                },
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <GetStartedSlideshow slides={step.slides} />
                        </AnimatedSection>
                    ))}
                </ol>
            </div>
        </section>
    );
}
