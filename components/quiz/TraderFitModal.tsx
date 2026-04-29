'use client';

import {
    ArrowLeftIcon,
    ArrowRightIcon,
    CheckBadgeIcon,
    SparklesIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Button from '@/components/ui/Button';

import TraderFitProgress from './TraderFitProgress';
import type { TraderFitModalLaunchOptions } from './TraderFitProvider';
import TraderFitQuestionCard from './TraderFitQuestionCard';
import TraderFitResult from './TraderFitResult';
import {
    TRADER_FIT_QUESTIONS,
    TRADER_FIT_QUIZ_CONFIG,
} from './traderFitQuizConfig';
import { calculateTraderFitResult } from './traderFitScoring';
import { TraderFitAnswers, TraderFitCalculatedResult } from './types';

type TraderFitModalProps = {
    isOpen: boolean;
    launchOptions: TraderFitModalLaunchOptions | null;
    onClose: () => void;
};

function toSelectedAnswerIds(rawAnswer: string | string[] | undefined) {
    if (!rawAnswer) {
        return [];
    }

    if (Array.isArray(rawAnswer)) {
        return rawAnswer;
    }

    return [rawAnswer];
}

export default function TraderFitModal({
    isOpen,
    launchOptions,
    onClose,
}: TraderFitModalProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<TraderFitAnswers>({});
    const [result, setResult] = useState<TraderFitCalculatedResult | null>(
        null,
    );
    const reducedMotion = useReducedMotion();

    const dialogRef = useRef<HTMLDivElement | null>(null);
    const wasOpenRef = useRef(false);

    const currentQuestion = TRADER_FIT_QUESTIONS[currentQuestionIndex];
    const totalQuestions = TRADER_FIT_QUESTIONS.length;

    const selectedAnswerIds = useMemo(
        () => toSelectedAnswerIds(answers[currentQuestion.id]),
        [answers, currentQuestion.id],
    );

    const progressPercent = useMemo(
        () => ((currentQuestionIndex + 1) / totalQuestions) * 100,
        [currentQuestionIndex, totalQuestions],
    );

    const resetFlow = useCallback(
        (nextLaunchOptions?: TraderFitModalLaunchOptions | null) => {
            const nextAnswers = nextLaunchOptions?.initialAnswers ?? {};
            const requestedStartIndex =
                nextLaunchOptions?.startQuestionIndex ?? 0;
            const boundedStartIndex = Math.max(
                0,
                Math.min(requestedStartIndex, totalQuestions - 1),
            );

            setAnswers(nextAnswers);
            setResult(null);
            setCurrentQuestionIndex(boundedStartIndex);
        },
        [totalQuestions],
    );

    useEffect(() => {
        if (isOpen && !wasOpenRef.current) {
            resetFlow(launchOptions);
        }

        wasOpenRef.current = isOpen;
    }, [isOpen, launchOptions, resetFlow]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const animationFrame = requestAnimationFrame(() => {
            dialogRef.current?.focus();
        });

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const originalOverflow = document.body.style.overflow;
        const originalPaddingRight = document.body.style.paddingRight;
        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = 'hidden';

        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = originalPaddingRight;
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);

        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    const handleSelectAnswer = useCallback(
        (answerId: string) => {
            setAnswers((previousAnswers) => {
                const currentValue = previousAnswers[currentQuestion.id];

                if (currentQuestion.type === 'multi_select') {
                    const selectedIds = new Set(
                        toSelectedAnswerIds(currentValue),
                    );

                    if (selectedIds.has(answerId)) {
                        selectedIds.delete(answerId);
                    } else {
                        selectedIds.add(answerId);
                    }

                    return {
                        ...previousAnswers,
                        [currentQuestion.id]: Array.from(selectedIds),
                    };
                }

                return {
                    ...previousAnswers,
                    [currentQuestion.id]: answerId,
                };
            });
        },
        [currentQuestion.id, currentQuestion.type],
    );

    const canContinue = selectedAnswerIds.length > 0;

    const handleNext = useCallback(() => {
        if (!canContinue) {
            return;
        }

        if (currentQuestionIndex === totalQuestions - 1) {
            setResult(
                calculateTraderFitResult(answers, TRADER_FIT_QUIZ_CONFIG),
            );
            return;
        }

        setCurrentQuestionIndex((index) => index + 1);
    }, [answers, canContinue, currentQuestionIndex, totalQuestions]);

    const handleBack = useCallback(() => {
        if (result) {
            setResult(null);
            return;
        }

        setCurrentQuestionIndex((index) => Math.max(0, index - 1));
    }, [result]);

    const isFirstQuestion = currentQuestionIndex === 0;
    const nextButtonLabel =
        currentQuestionIndex === totalQuestions - 1
            ? 'See My Result'
            : 'Next Question';

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 z-[120]"
                    exit={{ opacity: 0 }}
                    initial={reducedMotion ? false : { opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                >
                    <div className="absolute inset-0 bg-black/86 backdrop-blur-[5px]"></div>

                    <div className="relative flex h-full w-full items-center justify-center">
                        <motion.div
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            aria-labelledby="trader-fit-modal-title"
                            aria-modal="true"
                            className="pattern-surface relative flex h-full w-full flex-col overflow-hidden rounded-none border border-white/10 bg-[#050505] shadow-[0_52px_140px_-52px_rgba(0,0,0,0.98)] sm:h-[95vh] sm:w-[96vw] sm:rounded-[32px] md:max-w-[1300px]"
                            initial={
                                reducedMotion
                                    ? false
                                    : { opacity: 0, y: 30, scale: 0.985 }
                            }
                            ref={dialogRef}
                            role="dialog"
                            tabIndex={-1}
                            transition={{
                                duration: 0.4,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <h1 className="sr-only" id="trader-fit-modal-title">
                                Trader Fit Questionnaire
                            </h1>
                            <div
                                className="pointer-events-none absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage:
                                        "url('/images/pattern-dots.png')",
                                    backgroundSize: '230px 230px',
                                }}
                            ></div>
                            <div className="pointer-events-none absolute -top-24 left-1/3 h-64 w-64 rounded-full"></div>
                            <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full"></div>

                            <button
                                aria-label="Close trader fit questionnaire"
                                className="absolute top-4 right-4 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-[#101010]/92 text-[#d6d6d6] transition hover:border-[#9446ff] hover:text-white focus-visible:ring-2 focus-visible:ring-[#9446ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                                onClick={onClose}
                                type="button"
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </button>

                            <div className="relative z-10 grid h-full grid-cols-1 md:grid-cols-[minmax(320px,38%)_minmax(0,1fr)]">
                                <aside className="hidden h-full border-r border-white/10 bg-[#0a0a0a]/90 p-8 md:flex md:flex-col">
                                    <span className="font-heading inline-flex items-center gap-2 text-xs tracking-[0.12em] text-[#b893f2] uppercase">
                                        <SparklesIcon className="h-4 w-4" />
                                        SIGMA Pro Engine
                                    </span>
                                    <h1 className="mt-4 text-[clamp(1.7rem,2.8vw,2.45rem)] leading-[1.15] text-white">
                                        Trader Fit Questionnaire
                                    </h1>
                                    <p className="mt-4 max-w-sm text-[0.98rem] leading-[1.75] text-[#a7a7a7]">
                                        11 focused questions designed to place
                                        you on the path that best matches your
                                        current trading profile.
                                    </p>

                                    <div className="mt-8 rounded-2xl border border-white/10 bg-[#111111]/85 p-5">
                                        <p className="font-heading text-xs tracking-[0.08em] text-[#a1a1a1] uppercase">
                                            What this evaluates
                                        </p>
                                        <ul className="mt-3 space-y-2 text-[0.95rem] text-[#cdcdcd]">
                                            <li className="flex items-center gap-2">
                                                <CheckBadgeIcon className="h-4 w-4 text-[#9b5cf6]" />
                                                Experience and execution
                                                maturity
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckBadgeIcon className="h-4 w-4 text-[#9b5cf6]" />
                                                Capital and scalability
                                                readiness
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckBadgeIcon className="h-4 w-4 text-[#9b5cf6]" />
                                                Rules alignment and discipline
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="mt-auto rounded-2xl border border-[#2de868]/30 bg-[#09180f]/88 p-4 text-[0.9rem] leading-[1.6] text-[#b8e8c8]">
                                        Structured, rules-based trading beats
                                        random execution over time.
                                    </div>
                                </aside>

                                <div className="flex h-full flex-col overflow-hidden p-4 pt-16 sm:p-6 sm:pt-16 md:p-8 md:pt-12">
                                    {result ? (
                                        <TraderFitResult
                                            maxScore={result.maxScore}
                                            onClose={onClose}
                                            onRestart={() => resetFlow(null)}
                                            overrideReason={
                                                result.overrideReason
                                            }
                                            result={result.result}
                                            totalScore={result.totalScore}
                                        />
                                    ) : (
                                        <>
                                            <div className="mb-5 sm:mb-6">
                                                <TraderFitProgress
                                                    currentQuestion={
                                                        currentQuestion
                                                    }
                                                    currentStep={
                                                        currentQuestionIndex + 1
                                                    }
                                                    progressPercent={
                                                        progressPercent
                                                    }
                                                    totalSteps={totalQuestions}
                                                />
                                            </div>

                                            <div className="min-h-0 flex-1 overflow-y-auto pb-3">
                                                <AnimatePresence mode="wait">
                                                    <motion.div
                                                        animate={{
                                                            opacity: 1,
                                                            x: 0,
                                                        }}
                                                        exit={
                                                            reducedMotion
                                                                ? undefined
                                                                : {
                                                                      opacity: 0,
                                                                      x: -16,
                                                                  }
                                                        }
                                                        initial={
                                                            reducedMotion
                                                                ? false
                                                                : {
                                                                      opacity: 0,
                                                                      x: 16,
                                                                  }
                                                        }
                                                        key={currentQuestion.id}
                                                        transition={{
                                                            duration: 0.24,
                                                            ease: [
                                                                0.22, 1, 0.36,
                                                                1,
                                                            ],
                                                        }}
                                                    >
                                                        <TraderFitQuestionCard
                                                            onSelect={
                                                                handleSelectAnswer
                                                            }
                                                            question={
                                                                currentQuestion
                                                            }
                                                            selectedAnswerIds={
                                                                selectedAnswerIds
                                                            }
                                                        />
                                                    </motion.div>
                                                </AnimatePresence>
                                            </div>

                                            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 sm:mt-6 sm:pt-5">
                                                <Button
                                                    disabled={isFirstQuestion}
                                                    onClick={handleBack}
                                                    type="button"
                                                    variant="ghost"
                                                >
                                                    <span className="inline-flex items-center gap-2">
                                                        <ArrowLeftIcon className="h-4 w-4" />
                                                        Back
                                                    </span>
                                                </Button>

                                                <Button
                                                    disabled={!canContinue}
                                                    onClick={handleNext}
                                                    type="button"
                                                >
                                                    <span className="inline-flex items-center gap-2">
                                                        {nextButtonLabel}
                                                        <ArrowRightIcon className="h-4 w-4" />
                                                    </span>
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
