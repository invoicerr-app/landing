import type { PostItData } from '../types';
import clientApproval from '../assets/writings/client-approval-pending.svg';
import depositWaiting from '../assets/writings/30p-deposit-waiting.svg';
import firstMonthUnpaid from '../assets/writings/first-month-unpaid.svg';

export const postItData: PostItData[] = [
    {
        left: 25,
        top: 15,
        color: 'pink',
        rotation: 20,
        src: clientApproval,
        alt: 'Client Approval Pending',
        imgClassName: 'w-full h-full mx-auto mb-2',
    },
    {
        left: 75,
        top: 30,
        color: 'yellow',
        rotation: -24,
        src: depositWaiting,
        alt: '30% Deposit Waiting',
        imgClassName: 'w-full h-full mx-auto mb-2',
    },
    {
        left: 25,
        top: 65,
        color: 'blue',
        rotation: -20,
        src: firstMonthUnpaid,
        alt: 'First Month Unpaid',
        imgClassName: 'w-full h-full mx-auto mb-2 -rotate-16',
        className: 'z-20',
    },
];
