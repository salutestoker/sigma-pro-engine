import { TRADER_FIT_LINKS } from '@/lib/links';

import {
    TraderFitQuestion,
    TraderFitQuizConfig,
    TraderFitResultDefinition,
    TraderFitResultId,
    TraderFitScoreBand,
} from './types';

export const TRADER_FIT_RESULT_INTRO_HEADLINE =
    'Your Trading Profile: {{RESULT_TITLE}}';

export const TRADER_FIT_RESULT_INTRO_SUBTEXT =
    "Based on your experience, capital, and trading behavior, here's the path that gives you the highest probability of progress right now.";

export const TRADER_FIT_DISCLAIMER_POINTS = [
    'Signal chasing',
    'Hype trading',
    'Get-rich-quick strategies',
] as const;

export const TRADER_FIT_SERIOUS_POINTS = [
    'Consistency',
    'Discipline',
    'Long-term performance',
] as const;

export const TRADER_FIT_QUESTION_IDS = {
    accountSize: 'account_size',
    biggestChallenge: 'biggest_challenge',
    consistency: 'profit_consistency',
    decisionProcess: 'decision_process',
    educationInvestment: 'education_investment',
    markets: 'traded_markets',
    rulesAlignment: 'rules_alignment',
    timeCommitment: 'time_commitment',
    traderType: 'trader_type',
    tradingDuration: 'trading_duration',
    tradingGoal: 'trading_goal',
} as const;

export const TRADER_FIT_ANSWERS = {
    accountSize: {
        midCapital: 'account_5k_25k',
        highCapital: 'account_25k_100k',
        eliteCapital: 'account_100k_plus',
    },
    consistency: {
        consistentlyProfitable: 'consistency_consistent',
        inconsistent: 'consistency_some_months',
    },
    decisionProcess: {
        guessing: 'decision_guessing',
        strictSystem: 'decision_strict',
        someStructure: 'decision_some_structure',
    },
    rulesAlignment: {
        absoluteYes: 'rules_absolute',
        noFlexibility: 'rules_no_flex',
        yesIfWorks: 'rules_yes_if_works',
    },
    timeCommitment: {
        highTime: 'time_4_plus',
    },
    tradingDuration: {
        experienced: 'duration_3_plus',
        mid: 'duration_1_3_years',
    },
} as const;

export const TRADER_FIT_QUESTIONS: TraderFitQuestion[] = [
    {
        id: TRADER_FIT_QUESTION_IDS.traderType,
        group: 'Trader Type',
        iconKey: 'spark',
        prompt: 'What kind of trader are you?',
        type: 'single_select',
        answers: [
            {
                id: 'type_brand_new',
                label: 'Brand new (just getting started)',
                score: 0,
            },
            {
                id: 'type_learning',
                label: 'Learning but not consistent yet',
                score: 1,
            },
            {
                id: 'type_active_weekly',
                label: 'Active trader (in and out of markets weekly)',
                score: 2,
            },
            {
                id: 'type_experienced',
                label: 'Experienced / disciplined trader',
                score: 3,
            },
            {
                id: 'type_full_time',
                label: 'Full-time or near full-time trader',
                score: 4,
            },
        ],
    },
    {
        id: TRADER_FIT_QUESTION_IDS.tradingDuration,
        group: 'Experience',
        iconKey: 'chart',
        prompt: 'How long have you been trading?',
        type: 'single_select',
        answers: [
            { id: 'duration_0_3_months', label: '0-3 months', score: 0 },
            { id: 'duration_3_12_months', label: '3-12 months', score: 1 },
            { id: 'duration_1_3_years', label: '1-3 years', score: 3 },
            { id: 'duration_3_plus', label: '3+ years', score: 4 },
        ],
    },
    {
        id: TRADER_FIT_QUESTION_IDS.markets,
        group: 'Experience',
        iconKey: 'chart',
        prompt: 'Which markets do you trade?',
        type: 'multi_select',
        scoringMode: 'highest_selected',
        answers: [
            { id: 'market_crypto', label: 'Crypto', score: 2 },
            { id: 'market_stocks_etf', label: 'Stocks / ETFs', score: 2 },
            { id: 'market_options', label: 'Options', score: 3 },
            { id: 'market_multiple', label: 'Multiple markets', score: 4 },
        ],
    },
    {
        id: TRADER_FIT_QUESTION_IDS.consistency,
        group: 'Experience',
        iconKey: 'chart',
        prompt: 'How would you describe your consistency?',
        type: 'single_select',
        answers: [
            {
                id: 'consistency_not_profitable',
                label: 'Not profitable yet',
                score: 0,
            },
            { id: 'consistency_break_even', label: 'Break-even', score: 1 },
            {
                id: 'consistency_some_months',
                label: 'Some profitable months',
                score: 3,
            },
            {
                id: 'consistency_consistent',
                label: 'Consistently profitable',
                score: 4,
            },
        ],
    },
    {
        id: TRADER_FIT_QUESTION_IDS.accountSize,
        group: 'Capital',
        iconKey: 'currency',
        prompt: 'What is your current trading account size?',
        type: 'single_select',
        answers: [
            { id: 'account_under_1k', label: 'Under $1,000', score: 0 },
            { id: 'account_1k_5k', label: '$1,000 - $5,000', score: 1 },
            { id: 'account_5k_25k', label: '$5,000 - $25,000', score: 2 },
            { id: 'account_25k_100k', label: '$25,000 - $100,000', score: 3 },
            { id: 'account_100k_plus', label: '$100,000+', score: 4 },
        ],
    },
    {
        id: TRADER_FIT_QUESTION_IDS.timeCommitment,
        group: 'Commitment',
        iconKey: 'clock',
        prompt: 'How much time can you realistically dedicate to trading?',
        type: 'single_select',
        answers: [
            { id: 'time_under_1', label: 'Less than 1 hour/day', score: 0 },
            { id: 'time_1_2', label: '1-2 hours/day', score: 1 },
            { id: 'time_2_4', label: '2-4 hours/day', score: 3 },
            { id: 'time_4_plus', label: '4+ hours/day', score: 4 },
        ],
    },
    {
        id: TRADER_FIT_QUESTION_IDS.tradingGoal,
        group: 'Commitment',
        iconKey: 'rocket',
        prompt: 'What best describes your current goal?',
        type: 'single_select',
        answers: [
            { id: 'goal_learn_basics', label: 'Learn the basics', score: 0 },
            {
                id: 'goal_build_consistency',
                label: 'Build consistency',
                score: 2,
            },
            { id: 'goal_scale_account', label: 'Scale my account', score: 3 },
            {
                id: 'goal_maximize_income',
                label: 'Maximize income / go full-time',
                score: 4,
            },
        ],
    },
    {
        id: TRADER_FIT_QUESTION_IDS.decisionProcess,
        group: 'Behavior & Mindset',
        iconKey: 'beaker',
        prompt: 'How do you currently make trading decisions?',
        type: 'single_select',
        answers: [
            {
                id: 'decision_guessing',
                label: 'Guessing / gut feeling',
                score: 0,
            },
            {
                id: 'decision_social_media',
                label: 'Social media / alerts',
                score: 1,
            },
            {
                id: 'decision_some_structure',
                label: 'Some structure, but inconsistent',
                score: 2,
            },
            {
                id: 'decision_strict',
                label: 'Strict system / rules-based',
                score: 4,
            },
        ],
    },
    {
        id: TRADER_FIT_QUESTION_IDS.biggestChallenge,
        group: 'Behavior & Mindset',
        iconKey: 'beaker',
        prompt: "What's your biggest challenge right now?",
        type: 'single_select',
        answers: [
            {
                id: 'challenge_not_knowing',
                label: 'Not knowing what to do',
                score: 0,
            },
            {
                id: 'challenge_overtrading',
                label: 'Overtrading / emotional decisions',
                score: 1,
            },
            {
                id: 'challenge_inconsistent',
                label: 'Inconsistent results',
                score: 2,
            },
            { id: 'challenge_scaling', label: 'Scaling profits', score: 3 },
        ],
    },
    {
        id: TRADER_FIT_QUESTION_IDS.rulesAlignment,
        group: 'Alignment Filter',
        iconKey: 'shield',
        prompt: 'Are you willing to follow a structured system and rules?',
        type: 'single_select',
        answers: [
            {
                id: 'rules_no_flex',
                label: 'No, I prefer flexibility',
                score: 0,
            },
            { id: 'rules_somewhat', label: 'Somewhat', score: 1 },
            { id: 'rules_yes_if_works', label: 'Yes, if it works', score: 3 },
            { id: 'rules_absolute', label: 'Absolutely', score: 4 },
        ],
    },
    {
        id: TRADER_FIT_QUESTION_IDS.educationInvestment,
        group: 'Alignment Filter',
        iconKey: 'cubes',
        prompt: 'Are you currently investing in your trading education/tools?',
        type: 'single_select',
        answers: [
            { id: 'invest_no', label: 'No', score: 0 },
            { id: 'invest_occasionally', label: 'Occasionally', score: 2 },
            { id: 'invest_consistently', label: 'Yes, consistently', score: 4 },
        ],
    },
];

/**
 * Legacy client guidance referenced a 12-point model:
 *   0-6 (Free), 7-11 (SIGMA), 12+ (Ticker-Tactix)
 *
 * This quiz uses 11 questions scored 0-4 each (max 44).
 * We normalize the old intent into 44-point bands for finer resolution.
 */
export const TRADER_FIT_SCORE_BANDS: TraderFitScoreBand[] = [
    { min: 0, max: 13, resultId: 'free_path' },
    { min: 14, max: 27, resultId: 'sigma_ecosystem' },
    { min: 28, max: 44, resultId: 'ticker_tactix' },
];

export const TRADER_FIT_RESULTS: Record<
    TraderFitResultId,
    TraderFitResultDefinition
> = {
    free_path: {
        id: 'free_path',
        title: 'Foundation Phase',
        resultTitle: 'Foundation Phase',
        eyebrow: 'FREE PATH',
        headline: "You're in the Foundation Phase",
        body: [
            "You're at the stage where discipline, structure, and capital matter more than tools.",
            'Most traders try to skip this phase, and that is exactly why they stay stuck.',
        ],
        whatToDoNext: [
            'Join our free SIGMA Discord',
            'Follow along with live discussions and market commentary',
            'Study how structured traders think and operate',
            'Focus on saving and protecting capital',
        ],
        whatToAvoid: [
            'Jumping between strategies',
            'Paying for advanced tools too early',
            'Trading without a defined system',
        ],
        nextStep:
            'Start here. Learn the system before you try to accelerate it.',
        ctas: [
            {
                label: 'Join Free Discord',
                href: TRADER_FIT_LINKS.freeDiscord,
            },
            {
                label: 'Follow SIGMA on X',
                href: TRADER_FIT_LINKS.sigmaX,
                variant: 'secondary',
            },
        ],
    },
    sigma_ecosystem: {
        id: 'sigma_ecosystem',
        title: 'SIGMA Ecosystem',
        resultTitle: 'SIGMA Ecosystem',
        eyebrow: 'TOKEN GATE',
        headline: "You're Ready for Structure & Community",
        body: [
            "You're past the beginner phase.",
            'You have enough experience to recognize patterns, but not enough structure to fully capitalize on them yet.',
            'This is where most traders plateau.',
        ],
        whatToDoNext: [
            'By acquiring 160M SIGMA tokens, you gain access to:',
            'SIGMA Pro Engine - structured market signals',
            'Private trading community - real-time alignment and discussion',
            'Focused environment - no noise, no distractions',
            'System-based approach - built for repeatability',
        ],
        whyThisMatters:
            'At your level, trading alone slows you down. The right environment compresses your learning curve dramatically.',
        nextStep: 'Step into structure. This is where consistency is built.',
        ctas: [
            {
                label: 'Unlock SIGMA Access',
                href: TRADER_FIT_LINKS.unlockSigma,
            },
            {
                label: 'Learn How It Works',
                href: TRADER_FIT_LINKS.learnHowItWorks,
                variant: 'secondary',
            },
        ],
    },
    ticker_tactix: {
        id: 'ticker_tactix',
        title: 'Ticker-Tactix',
        resultTitle: 'Ticker-Tactix',
        eyebrow: 'DIRECT TOOLS & PLAYBOOKS',
        headline: "You're Ready for Precision & Execution",
        body: [
            "You're operating at a level where tools and structure directly impact performance.",
            'You\'re not here to \"learn trading.\"',
            "You're here to refine execution and scale results.",
        ],
        whatToDoNext: [
            'High-quality signals without noise',
            'Clear frameworks for decision-making',
            'Tools that align with how markets actually move',
            'Advanced trading indicators',
            'Structured playbooks',
            'Execution-focused frameworks',
        ],
        whyThisMatters:
            'At your level, the bottleneck is no longer knowledge; it is precision. The right tools remove hesitation and sharpen timing.',
        nextStep: 'Move from understanding to execution.',
        ctas: [
            {
                label: 'Explore Ticker-Tactix',
                href: TRADER_FIT_LINKS.tickerTactix,
            },
        ],
    },
    hybrid_path: {
        id: 'hybrid_path',
        title: 'Hybrid Path',
        resultTitle: 'Hybrid Path',
        eyebrow: 'RECOMMENDED PATH',
        headline: "You're in the Transition Zone",
        body: [
            "You're not a beginner, but you're not fully systemized yet either.",
            'This is where traders either level up fast or stay stuck in inconsistency.',
        ],
        whatToDoNext: [
            'Start inside SIGMA for structure and environment',
            'Layer in tools from Ticker-Tactix as you refine execution',
        ],
        whyThisMatters:
            'You do not need more random inputs; you need a system to follow and tools that reinforce that system.',
        nextStep: 'Build structure first. Then sharpen execution.',
        ctas: [
            {
                label: 'Start with SIGMA',
                href: TRADER_FIT_LINKS.unlockSigma,
            },
            {
                label: 'Explore Tools',
                href: TRADER_FIT_LINKS.tools,
                variant: 'secondary',
            },
        ],
    },
};

export const TRADER_FIT_QUESTION_COUNT = TRADER_FIT_QUESTIONS.length;

export const TRADER_FIT_MAX_SCORE = TRADER_FIT_QUESTIONS.reduce(
    (total, question) =>
        total + Math.max(...question.answers.map((answer) => answer.score)),
    0,
);

export const TRADER_FIT_QUIZ_CONFIG: TraderFitQuizConfig = {
    questions: TRADER_FIT_QUESTIONS,
    scoreBands: TRADER_FIT_SCORE_BANDS,
    results: TRADER_FIT_RESULTS,
    maxScore: TRADER_FIT_MAX_SCORE,
};
