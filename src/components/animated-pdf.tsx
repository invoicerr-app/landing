import { motion, MotionValue, useSpring, useTransform } from "motion/react";

interface AnimatedPdfProps {
    scrollYProgress: MotionValue<number>;
    scrollYSteps?: number[]
    scrollXSteps?: number[]
    scrollYValues: number[]
    scrollXValues: number[]
    rotateSteps: number[]
    rotateValues: number[]
    width?: number;
    height?: number;
    asset: string;
    assetAlt?: string;
}

export function AnimatedPdf({
    scrollYProgress,
    scrollYSteps = [0, 0.07],
    scrollXSteps = [0, 0.07],
    scrollYValues = [0, 0],
    scrollXValues = [0, 0],
    rotateSteps = [0, 0.085],
    rotateValues = [0, 0],
    width = 400,
    height = 566,
    asset,
    assetAlt,
}: AnimatedPdfProps) {
    const xLinear = useTransform(scrollYProgress, scrollXSteps, scrollXValues);
    const yLinear = useTransform(scrollYProgress, scrollYSteps, scrollYValues);
    const rotateLinear = useTransform(scrollYProgress, rotateSteps, rotateValues);

    const x = useSpring(xLinear, { stiffness: 120, damping: 25 });
    const y = useSpring(yLinear, { stiffness: 120, damping: 25 });
    const rotate = useSpring(rotateLinear, { stiffness: 120, damping: 25 });

    const scaleLiner = useTransform(scrollYProgress, [0.085, 0.09, 0.1], [1, 0.75, 0.6]);
    const scale = useSpring(scaleLiner, { stiffness: 120, damping: 25 });

    const opacity = useTransform(scrollYProgress, [0.82, 0.83], [1, 0]);


    return (
        <motion.img
            src={asset}
            alt={assetAlt || "Animated PDF Document"}
            style={{
                x,
                y,
                scale,
                rotate,
                width,
                height,
                opacity,
                backgroundColor: "white",
                margin: "0 auto",
                display: "block",
                position: "absolute",
                filter: "drop-shadow(0 0 15px rgba(0, 0, 0, 0.1))",
                willChange: "transform",
            }}
        />
    );
}
