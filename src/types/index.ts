export interface WindowSize {
    width: number;
    height: number;
}

export interface DocumentBox {
    asset: string;
    startX: number;
    startY: number;
    startRot: number;
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
