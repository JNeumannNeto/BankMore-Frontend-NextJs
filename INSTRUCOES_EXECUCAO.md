# Instruções de Execução - BankMore Frontend NextJS

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn
- Backend BankMore rodando nas portas 5001, 5002, 5003

### 1. Instalação das Dependências
```bash
cd BankMore-Frontend-NextJs
npm install
```

### 2. Executar em Modo Desenvolvimento
```bash
npm run dev
```
O projeto estará disponível em: http://localhost:3000

### 3. Build para Produção
```bash
npm run build
npm run start
```

## 🐳 Executar com Docker

### Build da Imagem
```bash
docker build -t bankmore-frontend .
```

### Executar Container
```bash
docker run -p 3000:3000 bankmore-frontend
```

### Executar com Docker Compose
```bash
docker-compose up --build
```

## 📋 Funcionalidades Disponíveis

### ✅ Páginas Implementadas
- **/** - Página inicial com apresentação do sistema
- **/login** - Login com CPF e senha
- **/register** - Cadastro de nova conta
- **/dashboard** - Dashboard principal com saldo e operações
- **/transfer** - Página de transferências
- **/fees** - Histórico de tarifas

### ✅ Funcionalidades
- Autenticação JWT
- Proteção de rotas
- Validação de formulários
- Notificações toast
- Design responsivo
- Integração completa com APIs do backend

## 🔧 Configurações

### APIs Backend
O projeto está configurado para se comunicar com:
- Account API: http://localhost:5001
- Transfer API: http://localhost:5002
- Fee API: http://localhost:5003

### Proxy de APIs
O Next.js está configurado para fazer proxy das requisições através do `next.config.js`

## 🎯 Fluxo de Teste

### 1. Cadastro
1. Acesse http://localhost:3000
2. Clique em "Criar Conta"
3. Preencha: Nome, CPF (11 dígitos), Senha
4. Anote o número da conta gerado

### 2. Login
1. Faça login com CPF e senha
2. Será redirecionado para o dashboard

### 3. Operações
- **Depósito/Saque**: Use os botões no dashboard
- **Transferência**: Clique em "Transferir", informe conta destino e valor
- **Consultar Tarifas**: Clique em "Tarifas" para ver histórico

## 🔍 Troubleshooting

### Erro de Conexão com APIs
- Verifique se o backend está rodando
- Confirme as portas 5001, 5002, 5003

### Erro de Dependências
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro de Build
```bash
npm run lint
npm run build
```

## 📱 Compatibilidade
- Chrome, Firefox, Safari, Edge
- Dispositivos móveis (responsivo)
- Tablets e desktops

## 🔒 Segurança
- Tokens JWT em cookies httpOnly
- Validação de formulários
- Sanitização de inputs
- Proteção CSRF

---

**Projeto criado com Next.js 14, TypeScript e Tailwind CSS**
