import { ComputerIcon, DatabaseIcon, Laptop2Icon, ServerIcon, SmartphoneIcon } from 'lucide-react';
import { forwardRef, useRef } from 'react';

import { AnimatedBeam } from '@/components/ui/animated-beam';
import { cn } from '@/lib/utils';

const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 flex size-16 items-center justify-center rounded-full border-2 bg-white shadow-lg",
                className,
            )}
        >
            {children}
        </div>
    );
});

Circle.displayName = "Circle";

export function ServerConnections() {
    const containerRef = useRef<HTMLDivElement>(null);
    const serverRef = useRef<HTMLDivElement>(null);
    const desktopRef = useRef<HTMLDivElement>(null);
    const laptopRef = useRef<HTMLDivElement>(null);
    const phoneRef = useRef<HTMLDivElement>(null);
    const databaseRef = useRef<HTMLDivElement>(null);

    return (
        <div className="flex flex-col gap-2 w-full">
            <div
                className="relative flex h-[400px] py-8 w-full items-center justify-center overflow-hidden"
                ref={containerRef}
            >
                <div className="flex size-full flex-col max-w-md items-stretch justify-between gap-8">
                    <div className="flex flex-row items-center justify-between">
                        <Circle ref={laptopRef} className="border-green-500 bg-green-50">
                            <Laptop2Icon className="size-8 text-green-600" />
                        </Circle>
                        <Circle ref={desktopRef} className="border-blue-500 bg-blue-50">
                            <ComputerIcon className="size-8 text-blue-600" />
                        </Circle>

                        <Circle ref={phoneRef} className="border-orange-500 bg-orange-50">
                            <SmartphoneIcon className="size-8 text-orange-600" />
                        </Circle>
                    </div>

                    {/* Middle row - Server center, Laptop left, Phone right */}
                    <div className="flex flex-row items-center justify-center">
                        <Circle ref={serverRef} className="size-20 border-purple-500 bg-purple-50 border-4">
                            <ServerIcon className="size-10 text-purple-600" />
                        </Circle>
                    </div>

                    <div className="flex flex-row items-center justify-center">
                        <Circle ref={databaseRef} className="border-yellow-500 bg-yellow-50">
                            <DatabaseIcon className="size-8 text-yellow-600" />
                        </Circle>
                    </div>
                </div>

                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={databaseRef}
                    toRef={serverRef}
                    gradientStartColor="#eab308"
                    gradientStopColor="#ca8a04"
                    duration={3}
                    delay={0}
                />

                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={serverRef}
                    toRef={laptopRef}
                    gradientStartColor="#10b981"
                    gradientStopColor="#059669"
                    duration={2}
                    delay={3}
                />
                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={serverRef}
                    toRef={desktopRef}
                    gradientStartColor="#3b82f6"
                    gradientStopColor="#1d4ed8"
                    duration={2}
                    delay={3}
                />
                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={serverRef}
                    toRef={phoneRef}
                    gradientStartColor="#f97316"
                    gradientStopColor="#ea580c"
                    duration={2}
                    delay={3}
                />
            </div>
            <div className="text-center text-gray-600">
                <p className="text-sm leading-relaxed">
                    Your data <span className="text-yellow-600 font-medium">centralized</span> and
                    <span className="text-purple-600 font-medium"> distributed</span> securely.
                </p>
            </div>
        </div>
    );
}
