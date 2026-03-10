import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(express.json());

// Permitir CORS para o desenvolvimento local
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    next();
});

app.post('/api/save-config', (req, res) => {
    const newConfig = req.body;
    const configPath = path.join(__dirname, 'src', 'config.ts');

    const fileContent = `/**
 * Configurações Centrais da Landing Page
 * Altere os valores abaixo para atualizar o site instantaneamente.
 */
export const CONFIG = ${JSON.stringify(newConfig, null, 4)};
`;

    fs.writeFile(configPath, fileContent, (err) => {
        if (err) {
            console.error('Erro ao salvar arquivo:', err);
            return res.status(500).json({ error: 'Erro ao salvar configuração' });
        }
        console.log('Configuração atualizada com sucesso!');
        res.json({ message: 'Configuração salva com sucesso' });
    });
});

app.listen(port, () => {
    console.log(`Servidor de configuração rodando em http://localhost:${port}`);
});
