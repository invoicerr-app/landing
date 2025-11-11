import { MailIcon, Signature, WebhookIcon } from 'lucide-react';

import { OrbitingCircles } from '@/components/ui/orbiting-circles';
import { cn } from '@/lib/utils';

const IconContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn("bg-white border-2 border-gray-200 rounded-full shadow-lg p-2 w-fit", className)}>
        {children}
    </div>
);

export function IntegrationCircle() {
    return (
        <div className="flex flex-col gap-0 w-full">
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
                    <IconContainer>
                        <img
                            src="https://github.com/documenso/documenso/blob/main/apps/documentation/public/favicon-32x32.png?raw=true"
                            alt="Documenso"
                            className="size-6"
                        />
                    </IconContainer>
                    <IconContainer>
                        <img
                            src="https://github.com/docusealco/docuseal/blob/master/public/apple-icon-180x180.png?raw=true"
                            alt="DocuSeal"
                            className="size-6"
                        />
                    </IconContainer>
                    <IconContainer>
                        <img
                            src="https://github.com/OpenSignLabs/OpenSign/blob/ea161805517775d71f105801b4bcd6baa6c652c4/apps/OpenSign/public/logo192.png?raw=true"
                            alt="OpenSign"
                            className="size-6"
                        />
                    </IconContainer>
                    <IconContainer>
                        <Signature className="text-gray-600" size={28} />
                    </IconContainer>
                </OrbitingCircles>

                {/* Storage Services Circle */}
                <OrbitingCircles
                    className="size-[50px] border-none bg-transparent"
                    duration={30}
                    delay={0}
                    radius={140}
                    reverse
                >
                    <IconContainer>
                        <img
                            src="https://avatars.githubusercontent.com/u/695951?s=200&v=4"
                            alt="MinIO"
                            className="size-6 mix-blend-multiply bg-transparent"
                        />
                    </IconContainer>
                    <IconContainer>
                        <img
                            src="https://raw.githubusercontent.com/paperless-ngx/paperless-ngx/refs/heads/dev/src-ui/src/assets/logo-notext.svg"
                            alt="Paperless"
                            className="size-6"
                        />
                    </IconContainer>
                    <IconContainer>
                        <img
                            src="https://avatars.githubusercontent.com/u/19211038?s=200&v=4"
                            alt="Nextcloud"
                            className="size-6"
                        />
                    </IconContainer>
                </OrbitingCircles>

                {/* Communication Services Circle */}
                <OrbitingCircles
                    className="size-[50px] border-none bg-transparent"
                    duration={40}
                    delay={0}
                    radius={200}
                >
                    <IconContainer>
                        <MailIcon />
                    </IconContainer>
                    <IconContainer>
                        <WebhookIcon />
                    </IconContainer>
                    <IconContainer>
                        <img
                            src="https://handbook.mattermost.com/~gitbook/image?url=https%3A%2F%2F4287631337-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-LorODNCmgMboJfZ7MPT%252Fsync%252F6c7ab89bca0b50a48f1d35edf13e76fd6faf5b43.svg%3Fgeneration%3D1614726374299388%26alt%3Dmedia&width=768&dpr=4&quality=100&sign=75d7e244&sv=2"
                            alt="Mattermost"
                            className="size-6"
                        />
                    </IconContainer>
                    <IconContainer>
                        <img
                            src="https://github.com/RocketChat/Rocket.Chat/blob/develop/apps/meteor/public/images/logo/icon.svg?raw=true"
                            alt="Rocket.Chat"
                            className="size-6"
                        />
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
