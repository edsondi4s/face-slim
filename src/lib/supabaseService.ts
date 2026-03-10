const SUPABASE_URL = 'https://sfyhwvwtrdtclxdnlaow.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_kAKICBWMQF95NcpX0n8lDQ_8p2ncEl6'; 
const CONFIG_ID = '00000000-0000-0000-0000-000000000000';

export const supabaseService = {
    async getConfig() {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/face_slim_natto_sites?select=config&id=eq.${CONFIG_ID}`, {
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                }
            });
            
            if (!response.ok) throw new Error('Falha ao buscar config do Supabase');
            
            const data = await response.json();
            return data[0]?.config || null;
        } catch (error) {
            console.error('Erro no getConfig:', error);
            return null;
        }
    },

    async saveConfig(newConfig: any) {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/face_slim_natto_sites?id=eq.${CONFIG_ID}`, {
                method: 'PATCH',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify({ config: newConfig })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha ao salvar config no Supabase');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Erro no saveConfig:', error);
            throw error;
        }
    }
};
