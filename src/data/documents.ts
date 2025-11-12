import type { DocumentBox, WindowSize } from '../types';

import doc1 from '../assets/documents/doc-1.svg';
import doc2 from '../assets/documents/doc-2.svg';
import doc3 from '../assets/documents/doc-3.svg';

export function getDocumentBoxes(windowSize: WindowSize): DocumentBox[] {
    const finalX = (windowSize.width - (windowSize.documentWidth || 0)) / 2;
    const finalY = (windowSize.height - (windowSize.documentHeight || 0)) / 2 - windowSize.height;

    return [
        {
            asset: doc1,
            scrollXValues: [0, finalX],
            scrollYValues: [-windowSize.height * 0.95, finalY],
            rotateValues: [13.6, 0],
            scrollXSteps: [0, 0.07],
            scrollYSteps: [0, 0.07],
            rotateSteps: [0, 0.085],
        },
        {
            asset: doc3,
            scrollXValues: [windowSize.width * 0.87, finalX],
            scrollYValues: [-windowSize.height * 1.1, finalY],
            rotateValues: [-25, 0],
            scrollXSteps: [0, 0.07],
            scrollYSteps: [0, 0.07],
            rotateSteps: [0, 0.085],
        },
        {
            asset: doc2,
            scrollXValues: [(windowSize.width / 100) * 3, finalX],
            scrollYValues: [-windowSize.height / 1.75, finalY, finalY, finalY*4],
            rotateValues: [-30, 0,],
            
            scrollXSteps: [0, 0.07],
            scrollYSteps: [0, 0.07, 0.15, 0.2],
            rotateSteps: [0, 0.085],
        },
    ];
}
