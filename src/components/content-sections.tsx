import type { ContentSection } from '../types';
import { TextReveal } from './ui/text-reveal';

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
        alignment: 'left',
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
        alignment: 'left',
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
                    className={`w-1/3 text-${section.alignment} self-${section.position}`}
                >
                    <TextReveal description={section.description}>
                        {section.title}
                    </TextReveal>
                </section>
            ))}
        </section>
    );
}

export default ContentSections;
