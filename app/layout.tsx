import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import './globals.css';

const figtree = Figtree({
    subsets: ['latin'],
    variable: '--font-figtree',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'SIGMA Pro Engine',
    description:
        'SIGMA Pro Engine is a premium XRPL-native trading environment with community, access, and tooling.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${figtree.variable} h-full antialiased`}>
            <body className="min-h-full bg-black font-sans text-[#cccccc]">
                {children}
            </body>
        </html>
    );
}
