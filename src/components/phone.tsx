import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";

import { CheckCircle } from "lucide-react";
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

    const yPhoneLinear = useTransform(
        scrollY,
        [1200, 1800],
        [windowSize.height * 1, windowSize.height * -0.05]
    );
    const yPhone = useSpring(yPhoneLinear, { stiffness: 120, damping: 25 });

    const opacitySuccessCard = useTransform(
        scrollY,
        [8400, 8600, 11000],
        [0, 1, 1]
    );

    const opacitySuccessCardSpring = useSpring(opacitySuccessCard, { stiffness: 120, damping: 25 });

    return (
        <>
            <motion.div
                className="bg-green-400 flex flex-col items-center justify-center"
                style={{
                    width: width * 0.85,
                    height: width * 2.16 * 0.85,
                    marginTop: "-39%",
                    x: (windowSize.width - width) / 2 + width * 0.075,
                    y: windowSize.height * -0.05,
                    opacity: opacitySuccessCardSpring,
                }}
            >
                <CheckCircle className="mx-auto mt-10 mb-4" size={64} color="white" />
                <h2 className="text-4xl font-bold text-white">Success</h2>
                <h3 className="text-xl font-medium text-white">You’ve just made<br />invoicing simple.</h3>
            </motion.div>
            <motion.img
                src={phoneImage}
                alt="Phone Mockup"
                style={{
                    width,
                    x: (windowSize.width - width) / 2,
                    y: yPhone,
                    scale: 1.3,
                    position: "fixed",
                    bottom: 0,
                }}
            />
        </>
    );
}
