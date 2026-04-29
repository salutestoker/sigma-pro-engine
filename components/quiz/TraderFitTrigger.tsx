'use client';

import {
    ButtonHTMLAttributes,
    MouseEvent,
    ReactElement,
    ReactNode,
    cloneElement,
    isValidElement,
} from 'react';

import { cn } from '@/lib/cn';

import { useTraderFitModal } from './TraderFitProvider';

type TraderFitTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    children: ReactNode;
};

function composeClickHandlers(
    childOnClick: ((event: MouseEvent<HTMLElement>) => void) | undefined,
    parentOnClick: ((event: MouseEvent<HTMLElement>) => void) | undefined,
    openTraderFitModal: () => void,
) {
    return (event: MouseEvent<HTMLElement>) => {
        childOnClick?.(event);
        parentOnClick?.(event);

        if (!event.defaultPrevented) {
            openTraderFitModal();
        }
    };
}

export default function TraderFitTrigger({
    asChild = false,
    children,
    className,
    onClick,
    type,
    ...buttonProps
}: TraderFitTriggerProps) {
    const { openTraderFitModal } = useTraderFitModal();

    if (asChild) {
        if (!isValidElement(children)) {
            return null;
        }

        const child = children as ReactElement<{
            className?: string;
            onClick?: (event: MouseEvent<HTMLElement>) => void;
        }>;

        return cloneElement(child, {
            className: cn(child.props.className, className),
            onClick: composeClickHandlers(
                child.props.onClick,
                onClick as
                    | ((event: MouseEvent<HTMLElement>) => void)
                    | undefined,
                openTraderFitModal,
            ),
        });
    }

    return (
        <button
            className={className}
            onClick={(event) => {
                onClick?.(event);

                if (!event.defaultPrevented) {
                    openTraderFitModal();
                }
            }}
            type={type ?? 'button'}
            {...buttonProps}
        >
            {children}
        </button>
    );
}
