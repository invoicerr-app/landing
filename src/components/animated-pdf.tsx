import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedPdfProps {
    startX: number;
    startY: number;
    startRot: number;
    stopStep?: number;
    children?: React.ReactNode;
}

export function AnimatedPdf({
    startX,
    startY,
    startRot,
    stopStep = 600,
    children,
}: AnimatedPdfProps) {
    const { scrollY } = useScroll();

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

    const xLinear = useTransform(scrollY, [0, stopStep * 1.2], [startX, finalX]);
    const yLinear = useTransform(scrollY, [0, stopStep * 1], [startY, finalY]);
    const rotateLinear = useTransform(scrollY, [0, stopStep * 1.3], [startRot, 0]);

    const x = useSpring(xLinear, { stiffness: 120, damping: 25 });
    const y = useSpring(yLinear, { stiffness: 120, damping: 25 });
    const rotate = useSpring(rotateLinear, { stiffness: 120, damping: 25 });

    return (
        <motion.div
            style={{
                x,
                y,
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
        >
            {children}
        </motion.div>
    );
}
