import { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type PatternPanelProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
};

export default function PatternPanel({
    children,
    className,
    ...props
}: PatternPanelProps) {
    return (
        <div
            className={cn(
                'pattern-surface rounded-3xl bg-[#111] shadow-[0_20px_50px_-32px_rgba(0,0,0,0.95)]',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}
