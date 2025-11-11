interface PostItProps {
    className?: string;
    color: 'yellow' | 'pink' | 'blue';
    rotation: number;
    children?: React.ReactNode;
    left?: number; // in vw
    top?: number;  // in vh
}

const colors: Record<PostItProps['color'], string> = {
    yellow: 'bg-yellow-300',
    pink: 'bg-pink-400',
    blue: 'bg-sky-400',
};

export function PostIt({ className, color = 'yellow', rotation = 0, children, left = 0, top = 0 }: PostItProps) {
    return (
        <div
            className="absolute"
            style={{
                left: `${left}vw`,
                top: `${top}vh`,
                rotate: `${rotation}deg`,
            }}
        >
            {/* Ombre sous le Post-it */}
            <div
                className="absolute w-42 h-2 bg-black/50 filter blur-sm"
                style={{
                    top: 'calc(100% - 2px)',       // juste en dessous du Post-it
                    left: 0,
                    zIndex: -1,
                    borderRadius: '0.25rem', // optionnel pour arrondir l'ombre
                }}
            />
            {/* Le Post-it */}
            <div
                className={`w-42 h-42 ${colors[color]} transform p-4 ${className || ''}`}
                style={{
                    zIndex: 1,
                }}
            >
                {children}
            </div>
        </div>
    );
}
