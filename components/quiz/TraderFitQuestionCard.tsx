'use client';

import {
    CheckCircleIcon,
    PlusCircleIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';
import { motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/lib/cn';

import { TraderFitQuestion } from './types';

type TraderFitQuestionCardProps = {
    onSelect: (answerId: string) => void;
    question: TraderFitQuestion;
    selectedAnswerIds: string[];
};

export default function TraderFitQuestionCard({
    onSelect,
    question,
    selectedAnswerIds,
}: TraderFitQuestionCardProps) {
    const reducedMotion = useReducedMotion();
    const isMultiSelect = question.type === 'multi_select';

    return (
        <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-[#0d0d0d]/95 p-5 shadow-[0_28px_80px_-40px_rgba(132,64,225,0.8)] sm:p-7">
            <div
                className="pointer-events-none absolute inset-0 opacity-22"
                style={{
                    backgroundImage: "url('/images/pattern-dots.png')",
                    backgroundSize: '190px 190px',
                }}
            ></div>
            <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#8440e1]/40 bg-[#120a22] px-3 py-1 text-[0.67rem] tracking-[0.08em] text-[#ceb7ff] uppercase">
                        <SparklesIcon className="h-3.5 w-3.5" />
                        {question.group}
                    </span>
                    {isMultiSelect && (
                        <span className="inline-flex rounded-full border border-[#2de868]/40 bg-[#07200f] px-3 py-1 text-[0.67rem] tracking-[0.08em] text-[#8ce6ac] uppercase">
                            Select all that apply
                        </span>
                    )}
                </div>

                <h2 className="mt-4 text-[clamp(1.4rem,2.4vw,2.2rem)] leading-[1.2] text-[#e4e4e4]">
                    {question.prompt}
                </h2>

                <div className="mt-6 grid gap-3">
                    {question.answers.map((answer) => {
                        const selected = selectedAnswerIds.includes(answer.id);

                        return (
                            <motion.button
                                aria-pressed={selected}
                                className={cn(
                                    'group relative flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors sm:p-[18px]',
                                    selected
                                        ? 'border-[#9551ff] bg-[#1a112b] text-white shadow-[0_16px_42px_-28px_rgba(148,70,255,0.95)]'
                                        : 'border-white/12 bg-[#111111]/92 text-[#cdcdcd] hover:border-white/22 hover:bg-[#151515]',
                                )}
                                key={answer.id}
                                onClick={() => onSelect(answer.id)}
                                type="button"
                                whileHover={
                                    reducedMotion
                                        ? undefined
                                        : {
                                              y: -2,
                                              transition: { duration: 0.18 },
                                          }
                                }
                                whileTap={
                                    reducedMotion
                                        ? undefined
                                        : {
                                              scale: 0.992,
                                              transition: { duration: 0.12 },
                                          }
                                }
                            >
                                <span
                                    className={cn(
                                        'mt-0.5 inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border',
                                        selected
                                            ? 'border-[#c8a6ff]/80 bg-[#8440e1]/30 text-[#f3e9ff]'
                                            : 'border-white/25 text-transparent group-hover:text-white/65',
                                    )}
                                >
                                    {isMultiSelect ? (
                                        selected ? (
                                            <CheckCircleIcon className="h-4 w-4" />
                                        ) : (
                                            <PlusCircleIcon className="h-4 w-4" />
                                        )
                                    ) : (
                                        <CheckCircleIcon className="h-4 w-4" />
                                    )}
                                </span>
                                <span className="text-[0.98rem] leading-[1.5] sm:text-[1.03rem]">
                                    {answer.label}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
