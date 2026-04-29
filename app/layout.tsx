import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import TraderFitProvider from '@/components/quiz/TraderFitProvider';
import PageVideoLoadGate from '@/components/site/PageVideoLoadGate';

import './globals.css';

const figtree = Figtree({
    subsets: ['latin'],
    variable: '--font-figtree',
    display: 'swap',
});

const DEFAULT_TITLE =
    'The SIGMA Pro Engine | Token-Gated XRPL Trading Signals & Community';
const DEFAULT_DESCRIPTION =
    'The SIGMA Pro Engine is a token-gated XRPL trading community and market signal platform for SIGMA Elite holders, offering indicator alerts, technical analysis, chart requests, videos, and exclusive Discord access powered by BunnyBoy.';
const DEFAULT_IMAGE = '/images/sigma-pro-engine-2026.jpg';
const DEFAULT_IMAGE_ALT =
    'SIGMA Pro Engine social preview featuring SIGMA and XRPL supercars in a foggy scene';

function normalizeSiteUrl(value?: string) {
    if (!value) {
        return null;
    }

    const trimmed = value.trim();

    if (!trimmed) {
        return null;
    }

    const withProtocol = /^https?:\/\//i.test(trimmed)
        ? trimmed
        : `https://${trimmed}`;

    return withProtocol.replace(/\/+$/, '');
}

const resolvedSiteUrl =
    normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeSiteUrl(process.env.SITE_URL) ??
    normalizeSiteUrl(process.env.VERCEL_URL) ??
    'http://localhost:3000';

const resolvedImageUrl = `${resolvedSiteUrl}${DEFAULT_IMAGE}`;

export const metadata: Metadata = {
    metadataBase: new URL(resolvedSiteUrl),
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    openGraph: {
        type: 'website',
        siteName: 'Sigma Indicator',
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        url: resolvedSiteUrl,
        images: [
            {
                url: resolvedImageUrl,
                alt: DEFAULT_IMAGE_ALT,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        images: [
            {
                url: resolvedImageUrl,
                alt: DEFAULT_IMAGE_ALT,
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${figtree.variable} h-full antialiased`}>
            <body className="min-h-full bg-black font-sans text-[#cccccc]">
                <TraderFitProvider>
                    <PageVideoLoadGate>{children}</PageVideoLoadGate>
                </TraderFitProvider>
            </body>
        </html>
    );
}
