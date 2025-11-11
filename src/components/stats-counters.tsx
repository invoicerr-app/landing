import { CardContent, CardFooter } from './ui/card';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { MagicCard } from './ui/magic-card';
import { cn } from '@/lib/utils';

interface StatItemProps {
    value: number;
    label: string;
    prefix?: string;
    suffix?: string;
    className?: string;
    decimalPlaces?: number;
    style?: React.CSSProperties;
}

const ScrollBasedStatItem = ({ value, label, prefix, suffix, className, decimalPlaces = 0, style }: StatItemProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [currentValue, setCurrentValue] = useState(0);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const animatedValue = useTransform(scrollYProgress, [0.2, 1], [0, value]);

    useEffect(() => {
        return animatedValue.on('change', (latest) => {
            setCurrentValue(latest);
        });
    }, [animatedValue]);

    return (
        <MagicCard ref={ref} className={cn("flex flex-col items-center gap-2 rounded-lg py-2", className)} style={style}
            gradientColor={"#ffffff00"} gradientFrom={"#9E7AFF"} gradientTo={"#FE8BBB"}>
            <CardContent className="text-4xl font-bold text-green-600 text-center">
                {prefix}
                <motion.span>
                    {decimalPlaces === 0
                        ? Math.round(currentValue).toLocaleString('fr-FR')
                        : currentValue.toFixed(decimalPlaces)
                    }
                </motion.span>
                {suffix}
            </CardContent>
            <CardFooter className="text-sm text-gray-600 text-center font-medium">
                {label}
            </CardFooter>
        </MagicCard>
    );
};

export function StatsCounters() {
    const stats = [
        {
            value: 3212,
            label: "Satisfied Clients",
            suffix: "+",
        },
        {
            value: 22452,
            label: "Invoices Created",
            suffix: "+",
        },
        {
            value: 8.4,
            label: "Millions of Dollars Processed",
            suffix: "M$",
        },
    ];

    const targetRef = useRef<HTMLDivElement | null>(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    })

    const card1XLinear = useTransform(scrollYProgress, [0, 1], ['-350px', '350px']);
    const card3XLinear = useTransform(scrollYProgress, [0, 1], ['350px', '-350px']);

    const card1X = useSpring(card1XLinear, {
        stiffness: 120,
        damping: 30,
    });
    const card3X = useSpring(card3XLinear, {
        stiffness: 120,
        damping: 30,
    });

    return (
        <div ref={targetRef} className="flex flex-col gap-2 w-full">
            <div className="ml-[10%] w-4/5 flex flex-col items-center gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        style={{
                            marginLeft: index === 0 ? card1X : index === 2 ? card3X : '0px',
                        }}
                        className="w-3/5"
                    >
                        <ScrollBasedStatItem
                            value={stat.value}
                            label={stat.label}
                            suffix={stat.suffix}
                            decimalPlaces={index === 2 ? 1 : 0}
                            className="p-4"
                        />
                    </motion.div>
                ))}
            </div>
            {/* Description/Disclaimer */}
            <div className="text-center text-gray-600">
                <p className="text-[10px] leading-relaxed">
                    The numbers above are fictitious,<br /> simply illustrating easy data tracking.
                </p>
            </div>
        </div>
    );
}
