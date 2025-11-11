import type { ContentSection } from '../types';
import { IntegrationCircle } from './integration-circle';
import { ServerConnections } from './server-connections';
import { StatsCounters } from './stats-counters';
import { TextReveal } from './ui/text-reveal';
import { cn } from '@/lib/utils';

const contentSections: ContentSection[] = [
    {
        title: 'Create, send, and get paid, faster.',
        description: 'Generate quotes, invoices, and receipts in seconds.\nInvoicerr keeps everything organized, so you stay focused\non your work, not the paperwork.',
        alignment: 'center',
        position: 'end',
    },
    {
        title: 'Built-in signatures. Plug-in power.',
        description: 'Sign documents directly inside Invoicerr or\nconnect your favorite tools like Documenso.\nYour workflow, your rules , with zero friction.',
        alignment: 'center',
        position: 'start',
    },
    {
        title: 'Smart insights for real decisions.',
        description: 'Track payments, monitor clients,\nand visualize your business growth.',
        alignment: 'center',
        position: 'end',
    },
    {
        title: 'Your data. Your server. Your rules.',
        description: 'Invoicerr is fully self-hosted.\nNo trackers, no hidden syncs, no third-party access.',
        alignment: 'center',
        position: 'start',
    },
];

function ContentSections() {
    return (
        <section id='content-text' className='flex flex-col items-center space-y-8'>
            <section className='h-[50dvh]'></section>

            {contentSections.map((section, index) => (
                <section
                    key={index}
                    className={cn(
                        index === 1
                            ? "w-full flex flex-row justify-between items-start"
                            : index === 2
                                ? "w-full flex flex-row justify-between items-start"
                                : index === 3
                                    ? "w-full flex flex-row justify-between items-start"
                                    : `w-1/3 text-${section.alignment} self-${section.position}`
                    )}
                >

                    {/* Ajouter les compteurs de stats après "Smart insights" */}
                    {index === 2 && (
                        <div className="w-1/3">
                            <div className="relative z-0 h-[200vh]">
                                <div className="sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-4 py-20">
                                    <StatsCounters />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={index === 1 || index === 2 || index === 3 ? "w-1/3" : "w-full"}>
                        <TextReveal description={section.description}>
                            {section.title}
                        </TextReveal>
                    </div>

                    {/* Ajouter le diagramme d'intégration après "Built-in signatures" */}
                    {index === 1 && (
                        <div className="w-1/3">
                            <div className="relative z-0 h-[200vh]">
                                <div className="sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-4 py-20">
                                    <IntegrationCircle />
                                </div>
                            </div>
                        </div>
                    )}

                    {index === 3 && (
                        <div className="w-1/3">
                            <div className="relative z-0 h-[200vh]">
                                <div className="sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-4 py-20">
                                    <ServerConnections />
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            ))}
        </section>
    );
}

export default ContentSections;
