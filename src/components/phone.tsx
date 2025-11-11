import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

import phoneImage from "../assets/phone.png";

export default function Phone() {
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
    const width = 400 * scaleFactor;

    const { scrollY } = useScroll();

    const yLinear = useTransform(
        scrollY,
        [1200, 1800],
        [windowSize.height * 1, windowSize.height * -0.05]
    );

    const y = useSpring(yLinear, { stiffness: 120, damping: 25 });

    return (
        <motion.img
            src={phoneImage}
            alt="Phone Mockup"
            style={{
                width,
                x: (windowSize.width - width) / 2,
                y,
                scale: 1.3,
                position: "fixed",
                bottom: 0,
            }}
        />
    );
}
