'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type AnimatedSectionProps = {
    amount?: number;
    as?: 'div' | 'section';
    children: ReactNode;
    className?: string;
    delay?: number;
    id?: string;
    once?: boolean;
    y?: number;
};

export default function AnimatedSection({
    amount = 0.2,
    as = 'section',
    children,
    className,
    delay = 0,
    id,
    once = true,
    y = 22,
}: AnimatedSectionProps) {
    const reducedMotion = useReducedMotion();

    if (reducedMotion) {
        if (as === 'div') {
            return <div className={className}>{children}</div>;
        }

        return (
            <section className={className} id={id}>
                {children}
            </section>
        );
    }

    if (as === 'div') {
        return (
            <motion.div
                className={cn(className)}
                initial={{ opacity: 0, y }}
                transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ amount, once }}
                whileInView={{ opacity: 1, y: 0 }}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <motion.section
            className={cn(className)}
            id={id}
            initial={{ opacity: 0, y }}
            transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ amount, once }}
            whileInView={{ opacity: 1, y: 0 }}
        >
            {children}
        </motion.section>
    );
}
