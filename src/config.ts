/**
 * Configurações Centrais da Landing Page
 * Altere os valores abaixo para atualizar o site instantaneamente.
 */
const DEFAULT_CONFIG = {
    "whatsappUrl": "https://wa.me/5511999999999?text=Olá! Gostaria de agendar uma avaliação Face Slim.",
    "vsl": {
        "videoId": "HJsrMTV8UjI",
        "revealTimeInSeconds": 10
    },
    "tracking": {
        "metaPixelId": "",
        "googleTagManagerId": ""
    }
};

// Carrega configurações personalizadas do localStorage se existirem
const getInitialConfig = () => {
    if (typeof window === 'undefined') return DEFAULT_CONFIG;
    
    const saved = localStorage.getItem('face_slim_custom_config');
    if (!saved) return DEFAULT_CONFIG;
    
    try {
        return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
    } catch (e) {
        console.error("Erro ao carregar configurações salvas:", e);
        return DEFAULT_CONFIG;
    }
};

export const CONFIG = getInitialConfig();
