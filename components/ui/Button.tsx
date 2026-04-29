import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    active?: boolean;
    children: ReactNode;
    className?: string;
    href?: string;
    size?: ButtonSize;
    variant?: ButtonVariant;
};

const baseClasses =
    'inline-flex items-center justify-center rounded-[18px] border font-medium tracking-[0.02em] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9446ff]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-45';

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'h-11 px-5 text-[0.96rem]',
    md: 'h-12 px-8 text-[1.05rem]',
};

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        'border-transparent bg-linear-to-r from-[#9446ff] via-[#8440e1] to-[#6b32be] text-[#f0e9ff] shadow-[0_14px_44px_-20px_rgba(132,64,225,0.85)] hover:-translate-y-0.5 hover:from-[#a45dff] hover:via-[#8d47f1] hover:to-[#7f3ee2] hover:shadow-[0_16px_52px_-20px_rgba(132,64,225,1)]',
    secondary:
        'pattern-surface border-[#2de868]/85 bg-[#111111]/78 text-[#d8d8d8] shadow-[0_12px_32px_-20px_rgba(45,232,104,0.55)] hover:-translate-y-0.5 hover:border-[#5ef390] hover:text-white',
    ghost: 'pattern-surface border-white/20 bg-black/45 text-[#d9d9d9] hover:border-white/35 hover:bg-white/5',
};

export default function Button({
    active = false,
    children,
    className,
    href,
    size = 'md',
    variant = 'primary',
    ...buttonProps
}: ButtonProps) {
    const classes = cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        active &&
            'border-transparent bg-linear-to-r from-[#9446ff] via-[#8440e1] to-[#6b32be] text-white',
        className,
    );

    if (href) {
        return (
            <Link className={classes} href={href}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classes} {...buttonProps}>
            {children}
        </button>
    );
}
