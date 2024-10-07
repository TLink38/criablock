const { createServer } = require('bedrock-protocol');
const fs = require('fs');
const path = require('path');

// Carregar configurações
const configPath = path.join(__dirname, 'config.json');
let config;

try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (error) {
    console.error('Erro ao carregar o arquivo de configuração:', error);
    process.exit(1);
}

// Criar servidor
const server = createServer({
    host: config.host,
    port: config.port,
    version: config.version,
});

// Exibir mensagem de inicialização
console.log(`Servidor CriaBlock rodando em ${config.host}:${config.port} na versão ${config.version}`);

server.on('connect', (client) => {
    console.log(`${client.username} conectou ao servidor CriaBlock!`);
});

server.on('disconnect', (client) => {
    console.log(`${client.username} saiu do servidor.`);
});

server.on('error', (error) => {
    console.error("Erro no servidor:", error);
});
