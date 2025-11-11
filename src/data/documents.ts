import type { DocumentBox, WindowSize } from '../types';

import doc1 from '../assets/documents/doc-1.svg';
import doc2 from '../assets/documents/doc-2.svg';
import doc3 from '../assets/documents/doc-3.svg';

export function getDocumentBoxes(windowSize: WindowSize): DocumentBox[] {
    return [
        {
            asset: doc1,
            startX: 0,
            startY: -windowSize.height * 0.975,
            startRot: 13.6
        },
        {
            asset: doc3,
            startX: windowSize.width * 0.87,
            startY: -windowSize.height * 1.1,
            startRot: -25
        },
        {
            asset: doc2,
            startX: (windowSize.width / 100) * 3,
            startY: -windowSize.height / 1.75,
            startRot: -30
        },
    ];
}
