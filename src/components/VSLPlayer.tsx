import React, { useState, useEffect, useRef } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useConfig } from './ConfigProvider';

interface VSLPlayerProps {
    onReveal: () => void;
}

export const VSLPlayer: React.FC<VSLPlayerProps> = ({ onReveal }) => {
    const { config } = useConfig();
    const [player, setPlayer] = useState<any>(null);
    const [progress, setProgress] = useState(0);
    const [visualProgress, setVisualProgress] = useState(0);
    const revealTriggered = useRef(false);

    // Lógica da barra de progresso simulada (fast-to-slow)
    // A barra visual vai na frente do progresso real no início
    useEffect(() => {
        const interval = setInterval(() => {
            if (player) {
                const currentTime = player.getCurrentTime();
                const duration = player.getDuration();

                if (duration > 0) {
                    const realProgress = (currentTime / duration) * 100;
                    setProgress(realProgress);

                    // Simulação visual: no início (real < 30%), a visual é 1.5x a real
                    // Conforme avança, elas se encontram em 100%
                    let vProgress;
                    if (realProgress < 30) {
                        vProgress = realProgress * 1.5;
                    } else {
                        vProgress = 45 + (realProgress - 30) * (55 / 70);
                    }

                    setVisualProgress(Math.min(vProgress, 99.5));

                    // Lógica de Reveal
                    if (currentTime >= config.vsl.revealTimeInSeconds && !revealTriggered.current) {
                        revealTriggered.current = true;
                        onReveal();
                    }
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [player, onReveal, config.vsl.revealTimeInSeconds]);

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        setPlayer(event.target);
    };

    const opts: YouTubeProps['opts'] = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 0,
            controls: 0,          // Esconde controles nativos
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            disablekb: 1,         // Desabilita teclado (espaço, setas)
            iv_load_policy: 3,
        },
    };

    return (
        <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden bg-black shadow-2xl group border border-white/5">
            <YouTube
                videoId={config.vsl.videoId}
                opts={opts}
                onReady={onPlayerReady}
                className="absolute inset-0 w-full h-full"
            />

            {/* Custom Progress Bar Container */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/20 z-30">
                <div
                    className="h-full bg-brand-gold transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(196,160,82,1)]"
                    style={{ width: `${visualProgress}%` }}
                />
            </div>

            {/* Bloqueador de Interação Visual & Play/Pause Controller */}
            <div
                className="absolute inset-0 z-20 cursor-pointer"
                onClick={(e) => {
                    if (player) {
                        const state = player.getPlayerState();
                        if (state === 1) player.pauseVideo();
                        else player.playVideo();
                    }
                }}
            />
        </div>
    );
};
