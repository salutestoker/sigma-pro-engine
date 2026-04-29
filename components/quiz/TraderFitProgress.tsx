'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { TRADER_FIT_ICON_MAP } from './iconMap';
import { TraderFitQuestion } from './types';

type TraderFitProgressProps = {
    currentQuestion: TraderFitQuestion;
    currentStep: number;
    progressPercent: number;
    totalSteps: number;
};

export default function TraderFitProgress({
    currentQuestion,
    currentStep,
    progressPercent,
    totalSteps,
}: TraderFitProgressProps) {
    const reducedMotion = useReducedMotion();
    const StepIcon = currentQuestion.iconKey
        ? TRADER_FIT_ICON_MAP[currentQuestion.iconKey]
        : null;

    return (
        <div className="rounded-2xl border border-white/10 bg-[#090909]/80 p-4 shadow-[0_22px_60px_-34px_rgba(132,64,225,0.72)] backdrop-blur-sm sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#8440e1]/45 bg-[#111111] text-[#d8c5ff]">
                        {StepIcon ? (
                            <StepIcon className="h-4 w-4" />
                        ) : (
                            <span className="text-sm">Q</span>
                        )}
                    </span>
                    <div>
                        <p className="font-heading text-sm tracking-[0.08em] text-[#bca5e6] uppercase">
                            {currentQuestion.group}
                        </p>
                        <p className="text-xs text-[#8f8f8f] sm:text-sm">
                            Question {currentStep} of {totalSteps}
                        </p>
                    </div>
                </div>
                <p className="font-heading text-xs tracking-[0.08em] text-[#b4b4b4] uppercase">
                    {Math.round(progressPercent)}% complete
                </p>
            </div>

            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#1a1a1a]">
                <motion.div
                    animate={{ width: `${progressPercent}%` }}
                    className="h-full rounded-full bg-linear-to-r from-[#9446ff] via-[#8440e1] to-[#2de868]"
                    initial={reducedMotion ? false : { width: 0 }}
                    transition={
                        reducedMotion
                            ? { duration: 0 }
                            : {
                                  duration: 0.5,
                                  ease: [0.22, 1, 0.36, 1],
                              }
                    }
                />
            </div>
        </div>
    );
}
