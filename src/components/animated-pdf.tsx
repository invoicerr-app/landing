import { motion, MotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";

interface AnimatedPdfProps {
    scrollYProgress: MotionValue<number>;
    startX: number;
    startY: number;
    startRot: number;
    stopStep?: number;
    asset: string;
    assetAlt?: string;
}

export function AnimatedPdf({
    scrollYProgress,
    startX,
    startY,
    startRot,
    asset,
    assetAlt,
}: AnimatedPdfProps) {

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const scaleFactor = (windowSize.height / 885) * 1.1;
    const height = 566 * scaleFactor;
    const width = 400 * scaleFactor;

    const finalX = (windowSize.width - width) / 2;
    const finalY = (windowSize.height - height) / 2 - windowSize.height;

    const xLinear = useTransform(scrollYProgress, [0, 0.07], [startX, finalX]);
    const yLinear = useTransform(scrollYProgress, [0, 0.07], [startY, finalY]);
    const rotateLinear = useTransform(scrollYProgress, [0, 0.085], [startRot, 0]);

    const x = useSpring(xLinear, { stiffness: 120, damping: 25 });
    const y = useSpring(yLinear, { stiffness: 120, damping: 25 });
    const rotate = useSpring(rotateLinear, { stiffness: 120, damping: 25 });

    const scaleLiner = useTransform(scrollYProgress, [0.085, 0.09, 0.1], [1, 0.75, 0.6]);
    const scale = useSpring(scaleLiner, { stiffness: 120, damping: 25 });

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
