import './index.css'

import { useEffect, useState } from 'react';

import { AnimatedPdf } from './components/animated-pdf';
import Header from './components/header'
import Home from './components/home'
import Phone from './components/phone';
import { PostIt } from './components/post-it'
import { TextReveal } from './components/ui/text-reveal';
import clientApproval from './assets/writings/client-approval-pending.svg';
import { createRoot } from 'react-dom/client'
import depositWaiting from './assets/writings/30p-deposit-waiting.svg';
import doc1 from './assets/documents/doc-1.svg';
import doc2 from './assets/documents/doc-2.svg';
import doc3 from './assets/documents/doc-3.svg';
import firstMonthUnpaid from './assets/writings/first-month-unpaid.svg';

function App() {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const boxes = [
    { asset: doc1, startX: 0, startY: -windowSize.height * 0.975, startRot: 13.6 },
    { asset: doc3, startX: windowSize.width * 0.87, startY: -windowSize.height * 1.1, startRot: -25 },
    { asset: doc2, startX: (windowSize.width / 100) * 3, startY: -windowSize.height / 1.75, startRot: -30 },
  ];

  return (
    <main className='min-h-screen h-[calc(12*100dvh)]'>
      <Header />
      <Home />
      <section className='fixed w-screen h-screen'>
        {boxes.map((box, index) => (
          <AnimatedPdf
            key={index}
            startX={box.startX}
            startY={box.startY}
            startRot={box.startRot}
            asset={box.asset}
            assetAlt={`Document ${index + 1}`}
          />
        ))}
        <Phone />
      </section>
      <section id='content-overlay'>
        <PostIt left={25} top={15} color="pink" rotation={20}>
          <img src={clientApproval} alt="Client Approval Pending" className="w-full h-full mx-auto mb-2" />
        </PostIt>
        <PostIt left={75} top={30} color="yellow" rotation={-24}>
          <img src={depositWaiting} alt="30% Deposit Waiting" className="w-full h-full mx-auto mb-2" />
        </PostIt>
        <PostIt left={25} top={65} color="blue" rotation={-20} className='z-20'>
          <img src={firstMonthUnpaid} alt="First Month Unpaid" className="w-full h-full mx-auto mb-2 -rotate-16" />
        </PostIt>
      </section>
      <section id='content-text' className='flex flex-col items-center space-y-8'>
        <section className='h-[50dvh]'></section>
        <section className="w-1/3 text-center self-end">
          <TextReveal description='Generate quotes, invoices, and receipts in seconds.\nInvoicerr keeps everything organized, so you stay focused\non your work, not the paperwork.'>Create, send, and get paid, faster.</TextReveal>
        </section>
        <section className="w-1/3 text-left self-start">
          <TextReveal description='Sign documents directly inside Invoicerr or\nconnect your favorite tools like Documenso.\nYour workflow, your rules , with zero friction.'>Built-in signatures. Plug-in power.</TextReveal>
        </section>
        <section className="w-1/3 text-center self-end">
          <TextReveal description='Track payments, monitor clients,\nand visualize your business growth.'>Smart insights for real decisions.</TextReveal>
        </section>
        <section className="w-1/3 text-left self-start">
          <TextReveal description='Invoicerr is fully self-hosted.\nNo trackers, no hidden syncs, no third-party access.'>Your data. Your server. Your rules.</TextReveal>
        </section>
      </section>
    </main >
  )
}

createRoot(document.getElementById('root')!).render(<App />);
