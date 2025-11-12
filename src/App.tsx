import { AnimatedPdf } from './components/animated-pdf';
import ContentSections from './components/content-sections';
import Header from './components/header';
import Home from './components/home';
import Phone from './components/phone';
import { PostIt } from './components/post-it';
import type { PostItData } from './types';
import { Ripple } from './components/ui/ripple';
import { getDocumentBoxes } from './data/documents';
import { postItData } from './data/post-its';
import { useWindowSize } from './hooks/useWindowSize';
import { useScroll } from 'motion/react';
import { useRef } from 'react';

function App() {
    const windowSize = useWindowSize();
    const documentBoxes = getDocumentBoxes(windowSize);
    const mainRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll();

    return (
        <main ref={mainRef} className='min-h-screen h-[calc(12*100dvh)]'>
            <Header />
            <Home />
            <Ripple className='-z-10' />

            <section className='fixed w-screen h-screen'>
                {documentBoxes.map((box, index) => (
                    <AnimatedPdf
                        key={index}
                        startX={box.startX}
                        startY={box.startY}
                        startRot={box.startRot}
                        asset={box.asset}
                        assetAlt={`Document ${index + 1}`}
                        scrollYProgress={scrollYProgress}
                    />
                ))}
                <Phone scrollYProgress={scrollYProgress} />
            </section>

            <section id='content-overlay'>
                {postItData.map((postIt: PostItData, index: number) => (
                    <PostIt
                        key={index}
                        left={postIt.left}
                        top={postIt.top}
                        color={postIt.color}
                        rotation={postIt.rotation}
                        className={postIt.className}
                    >
                        <img
                            src={postIt.src}
                            alt={postIt.alt}
                            className={postIt.imgClassName}
                        />
                    </PostIt>
                ))}
            </section>

            <ContentSections scrollYProgress={scrollYProgress} />
        </main>
    );
}

export default App;
