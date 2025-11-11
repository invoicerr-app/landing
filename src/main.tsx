import './index.css'

import Header from './components/header'
import Home from './components/home'
import { PostIt } from './components/post-it'
import clientApproval from './assets/writings/client-approval-pending.svg';
import { createRoot } from 'react-dom/client'
import depositWaiting from './assets/writings/30p-deposit-waiting.svg';
import firstMonthUnpaid from './assets/writings/first-month-unpaid.svg';

createRoot(document.getElementById('root')!).render(
  <main className='min-h-screen h-[500dvh]'>
    <Header />
    <Home />
    <section id='content-overlay'>
      <PostIt left={15} top={15} color="pink" rotation={20}>
        <img src={clientApproval} alt="Client Approval Pending" className="w-full h-full mx-auto mb-2" />
      </PostIt>
      <PostIt left={75} top={30} color="yellow" rotation={-24}>
        <img src={depositWaiting} alt="30% Deposit Waiting" className="w-full h-full mx-auto mb-2" />
      </PostIt>
      <PostIt left={25} top={65} color="blue" rotation={-20}>
        <img src={firstMonthUnpaid} alt="First Month Unpaid" className="w-full h-full mx-auto mb-2 -rotate-16" />
      </PostIt>
    </section>
  </main>
)
