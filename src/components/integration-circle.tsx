import { OrbitingCircles } from '@/components/ui/orbiting-circles';
import { Signature } from 'lucide-react';
import { cn } from '@/lib/utils';

// Icon component for signature
const SignatureIcon = ({ className }: { className?: string }) => (
    <svg className={cn("size-6", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2v4l-3 3h3v11c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9h3l-3-3V2" />
        <path d="m16 7-1.5 1.5" />
    </svg>
);

// Icon component for email
const EmailIcon = ({ className }: { className?: string }) => (
    <svg className={cn("size-6", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-10 5L2 7" />
    </svg>
);

// Icon component for webhook
const WebhookIcon = ({ className }: { className?: string }) => (
    <svg className={cn("size-6", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2" />
        <path d="m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06" />
        <path d="m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8" />
    </svg>
);

const IconContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn("bg-white border-2 border-gray-200 rounded-full p-3 shadow-lg", className)}>
        {children}
    </div>
);

export function IntegrationCircle() {
    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="bg-green-50 border-4 border-green-500 rounded-full p-4 shadow-xl">
                        <img
                            src="/favicon.svg"
                            alt="Invoicerr"
                            className="size-10"
                        />
                    </div>
                </div>

                {/* Signature Services Circle */}
                <OrbitingCircles
                    className="size-[50px] border-none bg-transparent"
                    duration={20}
                    delay={0}
                    radius={80}
                >
                    <IconContainer className="border-[#9fe36f] bg-[#9fe26e70] w-fit p-2">
                        <img
                            src="https://github.com/documenso/documenso/blob/main/apps/documentation/public/favicon-32x32.png?raw=true"
                            alt="Documenso"
                            className="w-7! h-7!"
                        />
                    </IconContainer>
                    <IconContainer className="border-[#aa968c] bg-[#aa968c70] w-fit p-2">
                        <img
                            src="https://github.com/docusealco/docuseal/blob/master/public/apple-icon-180x180.png?raw=true"
                            alt="DocuSeal"
                            className="w-7! h-7!"
                        />
                    </IconContainer>
                    <IconContainer className="border-[#0c336f] w-fit p-2">
                        <img
                            src="https://github.com/OpenSignLabs/OpenSign/blob/ea161805517775d71f105801b4bcd6baa6c652c4/apps/OpenSign/public/logo192.png?raw=true"
                            alt="OpenSign"
                            className="w-7! h-7!"
                        />
                    </IconContainer>
                    <IconContainer className="border-gray-200 w-fit p-2">
                        <Signature className="text-gray-600" size={28} />
                    </IconContainer>
                </OrbitingCircles>

                {/* Storage Services Circle */}
                <OrbitingCircles
                    className="size-[50px] border-none bg-transparent"
                    duration={25}
                    delay={5}
                    radius={140}
                    reverse
                >
                    <IconContainer className="border-blue-200">
                        <div className="text-xs font-bold text-blue-600">S3</div>
                    </IconContainer>
                    <IconContainer className="border-green-200">
                        <img
                            src="https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/refs/heads/dev/src-ui/src/assets/logo-notext.svg"
                            alt="Paperless"
                            className="size-6"
                        />
                    </IconContainer>
                    <IconContainer className="border-orange-200">
                        <div className="text-xs font-bold text-orange-600">Drive</div>
                    </IconContainer>
                    <IconContainer className="border-indigo-200">
                        <div className="text-xs font-bold text-indigo-600">Dropbox</div>
                    </IconContainer>
                </OrbitingCircles>

                {/* Communication Services Circle */}
                <OrbitingCircles
                    className="size-[50px] border-none bg-transparent"
                    duration={30}
                    delay={10}
                    radius={200}
                >
                    <IconContainer className="border-red-200">
                        <EmailIcon className="text-red-600" />
                    </IconContainer>
                    <IconContainer className="border-blue-200">
                        <WebhookIcon className="text-blue-600" />
                    </IconContainer>
                    <IconContainer className="border-green-200">
                        <div className="text-xs font-bold text-green-600">Slack</div>
                    </IconContainer>
                    <IconContainer className="border-purple-200">
                        <div className="text-xs font-bold text-purple-600">Teams</div>
                    </IconContainer>
                </OrbitingCircles>
            </div>

            {/* Description/Disclaimer */}
            <div className="text-center text-gray-600">
                <p className="text-sm leading-relaxed">
                    Connect <span className="text-blue-600 font-medium">Invoicerr</span> with your favorite tools.
                    <br />
                    <span className='text-xs text-neutral-400'>Current integrations are under development, but the plugin<br />system will make these goals achievable.</span>
                </p>
            </div>
        </div>
    );
}
