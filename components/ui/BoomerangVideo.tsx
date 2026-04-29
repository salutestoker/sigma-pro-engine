'use client';

type BoomerangVideoProps = {
    className?: string;
    pauseAtSeconds?: number;
    playbackRate?: number;
    src: string;
    type?: string;
};

export default function BoomerangVideo({
    className,
    src,
    type = 'video/webm',
}: BoomerangVideoProps) {
    return (
        <video
            autoPlay
            className={className}
            muted
            playsInline
            loop
            preload="auto"
        >
            <source src={src} type={type} />
        </video>
    );
}
