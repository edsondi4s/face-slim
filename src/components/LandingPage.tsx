import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Introduction } from './Introduction';
import { InteractiveDiagnosis } from './InteractiveDiagnosis';
import { DataCharts } from './DataCharts';
import { FAQ } from './FAQ';
import { CTA } from './CTA';
import { Footer } from './Footer';
import { SEO } from './SEO';
import { FadeInView } from './FadeInView';
import { FloatingCTA } from './FloatingCTA';
import { MessageCircle } from 'lucide-react';
import { VSLPlayer } from './VSLPlayer';
import { useConfig } from './ConfigProvider';

const STORAGE_KEY = 'face_slim_content_released';

export const LandingPage = () => {
    const { config } = useConfig();
    const [showFloatingCTA, setShowFloatingCTA] = useState(false);
    const [isContentReleased, setIsContentReleased] = useState(() => {
        return localStorage.getItem(STORAGE_KEY) === 'true';
    });

    const handleReveal = () => {
        setIsContentReleased(true);
        localStorage.setItem(STORAGE_KEY, 'true');
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowFloatingCTA(window.scrollY > 800);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen flex flex-col selection:bg-brand-gold/20 selection:text-white bg-stone-950">
            <SEO />
            <Navbar isContentReleased={isContentReleased} />

            <main className="flex-grow">
                {/* VSL Section */}
                <section id="vsl" className="py-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-4xl mx-auto px-4">
                        <h1 className="text-5xl md:text-7xl font-medium mb-8 leading-[1.1] text-white">
                            O Resgate da sua <br />
                            <span className="italic font-light text-stone-400">Identidade Original</span>
                        </h1>
                        <p className="text-xl text-stone-400 max-w-2xl mx-auto font-light leading-relaxed">
                            Assista ao dossiê clínico e descubra como o Método Face Slim restaura a estrutura profunda da face.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto px-4">
                        <VSLPlayer onReveal={handleReveal} />
                    </div>
                </section>

                {isContentReleased && (
                    <>
                        <div id="revealed-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 md:space-y-48 pb-24 text-left">
                            <FadeInView direction="none">
                                <Introduction />
                            </FadeInView>

                            <FadeInView>
                                <InteractiveDiagnosis />
                            </FadeInView>

                            <FadeInView>
                                <DataCharts />
                            </FadeInView>
                        </div>

                        <FadeInView scale={0.95}>
                            <CTA />
                        </FadeInView>

                        <FadeInView>
                            <FAQ />
                        </FadeInView>

                        <Footer />
                    </>
                )}
            </main>

            {isContentReleased && (
                <div className="md:hidden fixed bottom-0 left-0 w-full p-4 z-40 bg-stone-950/80 backdrop-blur-lg border-t border-white/5">
                    <a
                        href={config.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full text-center bg-brand-gold text-stone-950 py-4 rounded-xl font-bold uppercase tracking-widest shadow-xl active:scale-95 transition-transform"
                    >
                        <MessageCircle size={20} />
                        Agendar Avaliação
                    </a>
                </div>
            )}

            <FloatingCTA show={showFloatingCTA && isContentReleased} />
        </div>
    );
};
