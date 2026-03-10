import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CONFIG as DEFAULT_CONFIG } from '../config';
import { supabaseService } from '../lib/supabaseService';

interface ConfigContextType {
    config: typeof DEFAULT_CONFIG;
    updateConfig: (newConfig: typeof DEFAULT_CONFIG) => Promise<void>;
    isLoading: boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [config, setConfig] = useState(DEFAULT_CONFIG);
    const [isLoading, setIsLoading] = useState(true);

    // Carrega a configuração inicial
    useEffect(() => {
        const loadInitialConfig = async () => {
            setIsLoading(true);
            try {
                // Tenta carregar do Supabase primeiro
                const remoteConfig = await supabaseService.getConfig();
                if (remoteConfig) {
                    setConfig(remoteConfig);
                    // Sincroniza o localStorage para garantir fallback offline
                    localStorage.setItem('face_slim_custom_config', JSON.stringify(remoteConfig));
                } else {
                    // Fallback para localStorage se o Supabase falhar ou estiver vazio
                    const localSaved = localStorage.getItem('face_slim_custom_config');
                    if (localSaved) {
                        setConfig(JSON.parse(localSaved));
                    }
                }
            } catch (error) {
                console.error("Erro ao carregar configurações:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadInitialConfig();
    }, []);

    const updateConfig = async (newConfig: typeof DEFAULT_CONFIG) => {
        try {
            // Salva no Supabase
            await supabaseService.saveConfig(newConfig);
            
            // Atualiza estado local e localStorage
            setConfig(newConfig);
            localStorage.setItem('face_slim_custom_config', JSON.stringify(newConfig));
        } catch (error) {
            console.error("Erro ao salvar configuração:", error);
            throw error;
        }
    };

    return (
        <ConfigContext.Provider value={{ config, updateConfig, isLoading }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
};
