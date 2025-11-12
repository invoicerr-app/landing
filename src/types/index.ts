export interface WindowSize {
    width: number;
    height: number;
    documentWidth?: number;
    documentHeight?: number;
}

export interface DocumentBox {
    asset: string;
    scrollXValues: number[];
    scrollYValues: number[];
    rotateValues: number[];
    scrollXSteps: number[];
    scrollYSteps: number[];
    rotateSteps: number[];
}

export interface PostItData {
    left: number;
    top: number;
    color: 'pink' | 'yellow' | 'blue';
    rotation: number;
    src: string;
    alt: string;
    imgClassName: string;
    className?: string;
}

export interface ContentSection {
    title: string;
    description: string;
    alignment: 'left' | 'center';
    position: 'start' | 'end';
}
