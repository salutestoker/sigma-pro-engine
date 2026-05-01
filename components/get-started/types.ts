export type GetStartedLogo = {
    id: string;
    label: string;
    src?: string;
    alt?: string;
    height?: number;
    width?: number;
    href?: string;
};

export type GetStartedSlide = {
    id: string;
    src: string;
    alt: string;
    caption?: string;
};

export type GetStartedStep = {
    id: string;
    title: string;
    description: string;
    logos: GetStartedLogo[];
    slides: GetStartedSlide[];
};
