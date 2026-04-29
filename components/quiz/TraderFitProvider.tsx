'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import {
    createContext,
    ReactNode,
    Suspense,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import TraderFitModal from './TraderFitModal';
import { TraderFitAnswers } from './types';

export type TraderFitModalLaunchOptions = {
    initialAnswers?: TraderFitAnswers;
    startQuestionIndex?: number;
};

type TraderFitContextValue = {
    closeTraderFitModal: () => void;
    isTraderFitModalOpen: boolean;
    openTraderFitModal: (launchOptions?: TraderFitModalLaunchOptions) => void;
};

const TraderFitContext = createContext<TraderFitContextValue | null>(null);

type TraderFitProviderProps = {
    children: ReactNode;
};

function TraderFitQueryParamListener() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { isTraderFitModalOpen, openTraderFitModal } = useTraderFitModal();
    const lastAutoOpenKeyRef = useRef<string | null>(null);

    useEffect(() => {
        const traderFitParam = searchParams.get('trader-fit');
        const shouldAutoOpen =
            traderFitParam === '1' || traderFitParam === 'true';

        if (!shouldAutoOpen) {
            lastAutoOpenKeyRef.current = null;
            return;
        }

        const query = searchParams.toString();
        const key = `${pathname ?? '/'}?${query}`;

        if (lastAutoOpenKeyRef.current === key) {
            return;
        }

        lastAutoOpenKeyRef.current = key;

        if (!isTraderFitModalOpen) {
            openTraderFitModal();
        }
    }, [isTraderFitModalOpen, openTraderFitModal, pathname, searchParams]);

    return null;
}

export default function TraderFitProvider({
    children,
}: TraderFitProviderProps) {
    const [isTraderFitModalOpen, setIsTraderFitModalOpen] = useState(false);
    const [launchOptions, setLaunchOptions] =
        useState<TraderFitModalLaunchOptions | null>(null);

    const openTraderFitModal = useCallback(
        (nextLaunchOptions?: TraderFitModalLaunchOptions) => {
            setLaunchOptions(nextLaunchOptions ?? null);
            setIsTraderFitModalOpen(true);
        },
        [],
    );

    const closeTraderFitModal = useCallback(() => {
        setLaunchOptions(null);
        setIsTraderFitModalOpen(false);
    }, []);

    const contextValue = useMemo(
        () => ({
            openTraderFitModal,
            closeTraderFitModal,
            isTraderFitModalOpen,
        }),
        [closeTraderFitModal, isTraderFitModalOpen, openTraderFitModal],
    );

    return (
        <TraderFitContext.Provider value={contextValue}>
            {children}
            <Suspense fallback={null}>
                <TraderFitQueryParamListener />
            </Suspense>
            <TraderFitModal
                isOpen={isTraderFitModalOpen}
                launchOptions={launchOptions}
                onClose={closeTraderFitModal}
            />
        </TraderFitContext.Provider>
    );
}

export function useTraderFitModal() {
    const context = useContext(TraderFitContext);

    if (!context) {
        throw new Error(
            'useTraderFitModal must be used within a TraderFitProvider.',
        );
    }

    return context;
}
