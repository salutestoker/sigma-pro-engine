'use client';

import {
    ArrowPathIcon,
    ArrowUpRightIcon,
    CheckBadgeIcon,
    ShieldCheckIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';
import { motion, useReducedMotion } from 'framer-motion';

import Button from '@/components/ui/Button';

import {
    TRADER_FIT_DISCLAIMER_POINTS,
    TRADER_FIT_RESULT_INTRO_HEADLINE,
    TRADER_FIT_RESULT_INTRO_SUBTEXT,
    TRADER_FIT_SERIOUS_POINTS,
} from './traderFitQuizConfig';
import { TraderFitResultDefinition } from './types';

type TraderFitResultProps = {
    maxScore: number;
    onClose: () => void;
    onRestart: () => void;
    overrideReason?: string;
    result: TraderFitResultDefinition;
    totalScore: number;
};

const sectionTitleClasses =
    'font-heading text-xs tracking-[0.08em] text-[#adadad] uppercase';

export default function TraderFitResult({
    maxScore,
    onClose,
    onRestart,
    overrideReason,
    result,
    totalScore,
}: TraderFitResultProps) {
    const reducedMotion = useReducedMotion();
    const introHeadline = TRADER_FIT_RESULT_INTRO_HEADLINE.replace(
        '{{RESULT_TITLE}}',
        result.resultTitle,
    );

    return (
        <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl border border-[#8440e1]/35 bg-[#0b0b0b]/95 p-5 shadow-[0_35px_110px_-45px_rgba(132,64,225,0.95)] sm:p-8"
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                    backgroundImage: "url('/images/pattern-dots.png')",
                    backgroundSize: '190px 190px',
                }}
            ></div>

            <div className="relative z-10 max-h-[70vh] overflow-y-auto pr-1">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <p className="font-heading text-[0.72rem] tracking-[0.1em] text-[#c8a9ff] uppercase">
                            {result.eyebrow}
                        </p>
                        <h2 className="mt-2 text-[clamp(1.35rem,2.5vw,2rem)] leading-[1.2] text-[#f0f0f0]">
                            {introHeadline}
                        </h2>
                        <p className="mt-2 max-w-3xl text-[0.98rem] leading-[1.62] text-[#acacac]">
                            {TRADER_FIT_RESULT_INTRO_SUBTEXT}
                        </p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#2de868]/35 bg-[#071d10] px-3 py-1.5 text-[0.72rem] text-[#9ff2bc]">
                        <CheckBadgeIcon className="h-4 w-4" />
                        Score {totalScore}/{maxScore}
                    </span>
                </div>

                <h3 className="mt-6 text-[clamp(1.3rem,2vw,1.75rem)] text-white">
                    {result.headline}
                </h3>

                <div className="mt-4 space-y-3 text-[0.98rem] leading-[1.7] text-[#c8c8c8]">
                    {result.body.map((line) => (
                        <p key={line}>{line}</p>
                    ))}
                </div>

                {result.whatToDoNext && result.whatToDoNext.length > 0 && (
                    <div className="mt-6">
                        <p className={sectionTitleClasses}>What to do next</p>
                        <ul className="mt-3 space-y-2 text-[0.96rem] text-[#cccccc]">
                            {result.whatToDoNext.map((item) => (
                                <li
                                    className="flex items-start gap-2"
                                    key={item}
                                >
                                    <SparklesIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#9d63f8]" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {result.whatToAvoid && result.whatToAvoid.length > 0 && (
                    <div className="mt-6">
                        <p className={sectionTitleClasses}>What to avoid</p>
                        <ul className="mt-3 space-y-2 text-[0.96rem] text-[#b8b8b8]">
                            {result.whatToAvoid.map((item) => (
                                <li
                                    className="flex items-start gap-2"
                                    key={item}
                                >
                                    <ShieldCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#c08bff]" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {result.whyThisMatters && (
                    <div className="mt-6 rounded-2xl border border-white/12 bg-[#121212] p-4">
                        <p className={sectionTitleClasses}>Why this matters</p>
                        <p className="mt-2 text-[0.97rem] leading-[1.65] text-[#cdcdcd]">
                            {result.whyThisMatters}
                        </p>
                    </div>
                )}

                <div className="mt-6 rounded-2xl border border-[#8440e1]/32 bg-[#120f19] p-4">
                    <p className={sectionTitleClasses}>Next step</p>
                    <p className="mt-2 text-[0.98rem] leading-[1.6] text-[#d7d7d7]">
                        {result.nextStep}
                    </p>
                </div>

                {overrideReason && (
                    <p className="mt-4 text-[0.82rem] text-[#8c8c8c]">
                        {overrideReason}
                    </p>
                )}

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {result.ctas.map((cta) => (
                        <Button
                            className="w-full justify-center"
                            href={cta.href}
                            key={cta.label}
                            variant={cta.variant ?? 'primary'}
                        >
                            <span className="inline-flex items-center gap-2">
                                {cta.label}
                                <ArrowUpRightIcon className="h-4 w-4" />
                            </span>
                        </Button>
                    ))}
                </div>

                <div className="mt-7 rounded-2xl border border-white/10 bg-[#0f0f0f] p-4 text-[0.92rem] text-[#bbbbbb]">
                    <p className={sectionTitleClasses}>Disclaimer</p>
                    <p className="mt-3">
                        SIGMA and Ticker-Tactix are designed for structured,
                        rules-based traders.
                    </p>
                    <p className="mt-3 text-[#9e9e9e]">This is not:</p>
                    <ul className="mt-2 space-y-1 text-[#c5c5c5]">
                        {TRADER_FIT_DISCLAIMER_POINTS.map((item) => (
                            <li key={item}>- {item}</li>
                        ))}
                    </ul>
                    <p className="mt-3 text-[#9e9e9e]">
                        This is for traders who are serious about:
                    </p>
                    <ul className="mt-2 space-y-1 text-[#c5c5c5]">
                        {TRADER_FIT_SERIOUS_POINTS.map((item) => (
                            <li key={item}>- {item}</li>
                        ))}
                    </ul>
                    <p className="mt-3">
                        The path you choose matters less than your ability to
                        commit to it.
                    </p>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                    <Button
                        onClick={onRestart}
                        type="button"
                        variant="secondary"
                    >
                        <span className="inline-flex items-center gap-2">
                            <ArrowPathIcon className="h-4 w-4" />
                            Start Over
                        </span>
                    </Button>
                    <Button onClick={onClose} type="button" variant="ghost">
                        Close
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
