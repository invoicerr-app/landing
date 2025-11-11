interface PostItProps {
    className?: string;
    color: 'yellow' | 'pink' | 'blue';
    rotation: number;
    children?: React.ReactNode;
    left?: number; // as vw
    top?: number; // as vh
}

const colors: Record<PostItProps['color'], string> = {
    yellow: 'bg-yellow-300',
    pink: 'bg-pink-400',
    blue: 'bg-sky-400',
};

export function PostIt({ className, color = 'yellow', rotation = 0, children, left = 0, top = 0 }: PostItProps) {
    return (
        <div className={`absolute w-48 h-48 ${colors[color]} shadow-lg transform p-4 ${className || ''}`} style={{ rotate: `${rotation}deg`, left: `${left}vw`, top: `${top}vh` }}>
            {children}
        </div>
    );
}