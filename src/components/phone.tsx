import { motion, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useState } from "react";

import { CheckCircle } from "lucide-react";
import phoneImage from "../assets/phone.png";
import { Notification } from "./ui/animated-list";
import { Icons } from "./icons";

interface PhoneProps {
    scrollYProgress: MotionValue<number>;
}

export default function Phone({ scrollYProgress }: PhoneProps) {
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

    const scaleFactor = (windowSize.height / 885) * 1;
    const width = 400 * scaleFactor;

    const yPhoneLinear = useTransform(
        scrollYProgress,
        [0.09, 0.095],
        [windowSize.height * 1, windowSize.height * -0.1]
    );

    const yPhone = useSpring(yPhoneLinear, { stiffness: 120, damping: 25 });

    const opacitySuccessCard = useTransform(
        scrollYProgress,
        [0.8, 0.82],
        [0, 1]
    );

    const opacitySuccessCardSpring = useSpring(opacitySuccessCard, { stiffness: 120, damping: 25 });

    const opacityNotification = useTransform(
        scrollYProgress,
        [0.18, 0.19, 0.21, 0.22],
        [0, 1, 1, 0]
    );

    const scaleNotification = useTransform(
        scrollYProgress,
        [0.18, 0.2],
        [0.8, 0.85]
    );

    const yNotification = useTransform(
        scrollYProgress,
        [0.18, 0.19, 0.21, 0.22],
        [-60, -20, -20, 0]
    );

    const opacityNotification2 = useTransform(
        scrollYProgress,
        [0.2, 0.21, 0.25, 0.27],
        [0, 1, 1, 0]
    );

    const scaleNotification2 = useTransform(
        scrollYProgress,
        [0.21, 0.23],
        [0.8, 0.85]
    );

    const yNotification2 = useTransform(
        scrollYProgress,
        [0.21, 0.22, 0.25, 0.27],
        [-60, -20, -20, 0]
    );

    return (
        <>
            <motion.div
                style={{
                    position: "fixed",
                    x: (windowSize.width - width) / 2 + width * 0.15,
                    y: yPhone,
                    width: width * 0.7,
                    opacity: opacityNotification,
                    scale: scaleNotification,
                    top: windowSize.height * 0.3,
                    translateY: yNotification,
                    pointerEvents: "none",
                }}
            >
                <Notification
                    name="Sent successfully"
                    description="Invoice sent to the client."
                    icon={<Icons.invoicerr />}
                    color="#fff"
                    time="now"
                />
            </motion.div>

            <motion.div
                style={{
                    position: "fixed",
                    x: (windowSize.width - width) / 2 + width * 0.15,
                    y: yPhone,
                    width: width * 0.7,
                    opacity: opacityNotification2,
                    scale: scaleNotification2,
                    top: windowSize.height * 0.3,
                    translateY: yNotification2,
                    pointerEvents: "none",
                }}
            >
                <Notification
                    name="Paid successfully"
                    description="Invoice paid by the client."
                    icon={<Icons.invoicerr />}
                    color="#fff"
                    time="now"
                />
            </motion.div>

            <motion.div
                className="bg-green-400 flex flex-col items-center justify-center"
                style={{
                    width: width * 0.85,
                    height: width * 2.16 * 0.85,
                    borderRadius: 30,
                    x: (windowSize.width - width) / 2 + width * 0.075,
                    y: -(width * 2.16 * 0.9),
                    opacity: opacitySuccessCardSpring,
                }}
            >
                <CheckCircle className="mx-auto mt-10 mb-4" size={64} color="white" />
                <h2 className="text-4xl font-bold text-white">Success</h2>
                <h3 className="text-xl font-medium text-white">You've just made<br />invoicing simple.</h3>
            </motion.div>
            <motion.img
                src={phoneImage}
                alt="Phone Mockup"
                className="pointer-events-none select-none"
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
