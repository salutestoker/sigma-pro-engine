import { GetStartedStep } from '@/components/get-started/types';

/**
 * Add, remove, or reorder items here to control the full Get Started flow.
 * Step numbers are derived automatically from array order.
 */
export const GET_STARTED_STEPS: GetStartedStep[] = [
    {
        id: 'select-wallet',
        title: 'Select Wallet',
        description:
            "Select a self custodial wallet to store your XRP. You'll then use this to buy your SIGMA and gain access to the SIGMA Pro Engine discord and web app.",
        logos: [
            {
                id: 'joey',
                label: 'Joey',
                src: '/images/logo-joey.png',
                href: 'https://joeywallet.xyz/',
            },
            {
                id: 'xaman',
                label: 'Xaman',
                src: '/images/logo-xaman.png',
                height: 12,
                href: 'https://xaman.app/download',
            },
        ],
        slides: [
            {
                id: 'wallet-slide-1',
                src: '/images/get-started-slides/joey.png',
                alt: 'Joey wallet onboarding preview',
                caption: 'Joey wallet.',
            },
            {
                id: 'wallet-slide-2',
                src: '/images/get-started-slides/xaman.png',
                alt: 'Xaman wallet onboarding preview',
                caption: 'Xaman wallet.',
            },
        ],
    },
    {
        id: 'set-trustline',
        title: 'Set Trustline',
        description:
            'On the XRPL you set a trustline in order to buy and sell a token. This can be done through a trusted decentralized exchange website. Setting a trustline requires a reserve of 0.2 XRP per token.',
        logos: [
            {
                id: 'first-ledger',
                label: 'First Ledger',
                src: '/images/logo-first-ledger.png',
                href: 'https://firstledger.net/token-v2/rfKYWZ84fm9eVEdoTcsQCo1WdqMPyaUF5z/5349474D41000000000000000000000000000000',
            },
            {
                id: 'xmagnetic',
                label: 'X-Magnetic',
                src: '/images/logo-x-magnetic.png',
                href: 'https://xmagnetic.org/tokens/SIGMA%2BrfKYWZ84fm9eVEdoTcsQCo1WdqMPyaUF5z?network=mainnet&currency=SIGMA&issuer=rfKYWZ84fm9eVEdoTcsQCo1WdqMPyaUF5z',
            },
        ],
        slides: [
            {
                id: 'trustline-slide-1',
                src: '/images/get-started-slides/x-magnetic-trustline.jpg',
                alt: 'Trustline qr code for scanning',
                caption: 'Scan qr code to set trustline on X-Magnetic.',
            },
            {
                id: 'trustline-slide-2',
                src: '/images/get-started-slides/xmagnetic.png',
                alt: 'Trustline setup example',
                caption: 'X-Magnetic.',
            },
        ],
    },
    {
        id: 'buy',
        title: 'Buy 160m $SIGMA',
        description:
            "In order to gain access to the token gated discord and web app, you'll need to be holding 160m $SIGMA. Click one of the two links below to buy $SIGMA directly.",
        logos: [
            {
                id: 'first-ledger',
                label: 'First Ledger',
                src: '/images/logo-first-ledger.png',
                href: 'https://firstledger.net/token-v2/rfKYWZ84fm9eVEdoTcsQCo1WdqMPyaUF5z/5349474D41000000000000000000000000000000',
            },
            {
                id: 'xmagnetic',
                label: 'X-Magnetic',
                src: '/images/logo-x-magnetic.png',
                href: 'https://xmagnetic.org/tokens/SIGMA%2BrfKYWZ84fm9eVEdoTcsQCo1WdqMPyaUF5z?network=mainnet',
            },
        ],
        slides: [
            {
                id: 'buy-first-ledger',
                src: '/images/get-started-slides/buy-sigma-first-ledger.jpg',
                alt: 'Buy $SIGMA on First Ledger',
                caption: 'Buy $SIGMA on First Ledger.',
            },
            {
                id: 'buy-x-magnetic',
                src: '/images/get-started-slides/buy-sigma-x-magnetic.jpg',
                alt: 'Buy $SIGMA on X-Magnetic',
                caption: 'Buy $SIGMA on X-Magnetic.',
            },
        ],
    },
    {
        id: 'verify',
        title: 'Verify in discord',
        description:
            "Click the discord logo below to join the Zen Lounge server. Once you've joined the Zen lounge, go to the #sigma-verify channel and type /sigma_verify and press the enter key. Paste in your wallet address and if you have 160m $SIGMA or more, you'll be granted access.",
        logos: [
            {
                id: 'discord',
                label: 'Discord',
                src: '/images/logo-discord.png',
                href: 'https://discord.com/channels/892551520451702804/1431238626179809370',
            },
        ],
        slides: [
            {
                id: 'discord-slide-1',
                src: '/images/get-started-slides/discord.png',
                alt: 'Token gated discord',
                caption: 'Token gated discord.',
            },
        ],
    },
    {
        id: 'connect',
        title: 'Connect to Web Application',
        description:
            "Click the SIGMA Pro Engine logo below and connect your wallet. If you have 160m $SIGMA or more, you'll be granted access.",
        logos: [
            {
                id: 'sigma-pro',
                label: 'SIGMA Pro Engine',
                src: '/images/logo-sigma-pro-engine.png',
                href: 'https://tradingstyle.sigmalabz.xyz/connect?open_wallet_modal=1',
                height: 70,
            },
        ],
        slides: [
            {
                id: 'web-app-slide-1',
                src: '/images/get-started-slides/web-app.png',
                alt: 'SIGMA Pro Engine web app',
                caption: 'SIGMA Pro Engine web app.',
            },
        ],
    },
];
