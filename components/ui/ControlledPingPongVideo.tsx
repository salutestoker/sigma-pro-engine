'use client';

import HeroVideo from '@/components/ui/HeroVideo';

type ControlledPingPongVideoProps = {
    ariaHidden?: boolean;
    className?: string;
    loopStartSeconds?: number;
    playbackSpeed?: number;
    respectReducedMotion?: boolean;
    src: string;
};

// Deprecated compatibility wrapper.
// Retained temporarily to avoid breakage while moving away from GSAP/currentTime control.
export default function ControlledPingPongVideo({
    className,
    src,
}: ControlledPingPongVideoProps) {
    return <HeroVideo className={className} src={src} />;
}
