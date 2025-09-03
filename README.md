# BankMore Frontend - NextJS

Frontend em NextJS para o sistema bancário BankMore, desenvolvido com TypeScript, Tailwind CSS e integração completa com as APIs do backend.

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **React Hook Form** - Gerenciamento de formulários
- **Axios** - Cliente HTTP para APIs
- **React Hot Toast** - Notificações
- **Lucide React** - Ícones
- **js-cookie** - Gerenciamento de cookies

## 📋 Funcionalidades

### ✅ Autenticação
- [x] Login com CPF e senha
- [x] Cadastro de nova conta
- [x] Autenticação JWT
- [x] Proteção de rotas

### ✅ Dashboard
- [x] Visualização do saldo atual
- [x] Informações da conta
- [x] Depósitos e saques
- [x] Navegação para outras funcionalidades

### ✅ Transferências
- [x] Transferência entre contas
- [x] Validação de conta de destino
- [x] Confirmação de operação
- [x] Feedback visual

### ✅ Tarifas
- [x] Histórico de tarifas
- [x] Detalhes das cobranças
- [x] Totalizadores

## 🏗️ Estrutura do Projeto

```
BankMore-Frontend-NextJs/
├── src/
│   ├── app/                    # App Router do Next.js
│   │   ├── dashboard/          # Página do dashboard
│   │   ├── fees/              # Página de tarifas
│   │   ├── login/             # Página de login
│   │   ├── register/          # Página de cadastro
│   │   ├── transfer/          # Página de transferências
│   │   ├── globals.css        # Estilos globais
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Página inicial
│   ├── lib/
│   │   └── api.ts             # Configuração do Axios
│   ├── services/              # Serviços de API
│   │   ├── authService.ts     # Serviços de autenticação
│   │   ├── accountService.ts  # Serviços de conta
│   │   ├── transferService.ts # Serviços de transferência
│   │   └── feeService.ts      # Serviços de tarifas
│   └── types/
│       └── index.ts           # Definições de tipos TypeScript
├── public/                    # Arquivos estáticos
├── package.json              # Dependências e scripts
├── tailwind.config.ts        # Configuração do Tailwind
├── tsconfig.json            # Configuração do TypeScript
└── next.config.js           # Configuração do Next.js
```

## 🔧 Configuração e Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Backend BankMore rodando (APIs nas portas 5001, 5002, 5003)

### Instalação

1. **Clone o repositório**
```bash
git clone <repository-url>
cd BankMore-Frontend-NextJs
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente** (opcional)
```bash
# Crie um arquivo .env.local se necessário
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. **Execute o projeto**
```bash
npm run dev
# ou
yarn dev
```

5. **Acesse a aplicação**
```
http://localhost:3000
```

## 🔗 Integração com APIs

O frontend se comunica com as seguintes APIs do backend:

### Account API (Porta 5001)
- `POST /api/account/register` - Cadastro de conta
- `POST /api/account/login` - Login
- `GET /api/account/balance` - Consulta saldo
- `POST /api/account/movement` - Movimentações
- `GET /api/account/exists/{accountNumber}` - Verificar conta

### Transfer API (Porta 5002)
- `POST /api/transfer` - Realizar transferência

### Fee API (Porta 5003)
- `GET /api/fee/{accountNumber}` - Consultar tarifas
- `GET /api/fee/fee/{id}` - Consultar tarifa específica

## 🎨 Design System

### Cores Principais
- **Primary**: Azul (#3b82f6)
- **Success**: Verde (#10b981)
- **Error**: Vermelho (#ef4444)
- **Warning**: Amarelo (#f59e0b)

### Componentes
- Formulários responsivos
- Botões com estados de loading
- Cards informativos
- Modais de confirmação
- Notificações toast

## 🔒 Segurança

### Autenticação
- JWT tokens armazenados em cookies
- Interceptadores Axios para tokens
- Redirecionamento automático em caso de token expirado
- Proteção de rotas privadas

### Validações
- Validação de CPF
- Validação de formulários com React Hook Form
- Sanitização de inputs
- Verificação de contas de destino

## 📱 Responsividade

- Design mobile-first
- Breakpoints do Tailwind CSS
- Interface adaptável para diferentes tamanhos de tela
- Componentes otimizados para touch

## 🚦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar versão de produção
npm run start

# Linting
npm run lint
```

## 🔄 Fluxo de Uso

### 1. Cadastro/Login
1. Usuário acessa a página inicial
2. Escolhe entre "Entrar" ou "Criar Conta"
3. Preenche os dados necessários
4. Sistema valida e autentica

### 2. Dashboard
1. Após login, usuário é redirecionado para o dashboard
2. Visualiza saldo, informações da conta
3. Pode realizar depósitos, saques
4. Navega para outras funcionalidades

### 3. Transferências
1. Usuário clica em "Transferir"
2. Informa conta de destino e valor
3. Sistema valida a conta de destino
4. Confirma a operação
5. Transferência é processada

### 4. Consulta de Tarifas
1. Usuário acessa "Tarifas"
2. Visualiza histórico completo
3. Vê detalhes de cada cobrança
4. Consulta totalizadores

## 🐛 Tratamento de Erros

- Interceptadores Axios para erros HTTP
- Notificações toast para feedback
- Validações de formulário em tempo real
- Estados de loading e erro

## 🔧 Configurações do Next.js

### Rewrites
O `next.config.js` está configurado para fazer proxy das requisições para as APIs do backend:

```javascript
async rewrites() {
  return [
    {
      source: '/api/account/:path*',
      destination: 'http://localhost:5001/api/account/:path*'
    },
    {
      source: '/api/transfer/:path*',
      destination: 'http://localhost:5002/api/transfer/:path*'
    },
    {
      source: '/api/fee/:path*',
      destination: 'http://localhost:5003/api/fee/:path*'
    }
  ]
}
```

## 📦 Build e Deploy

### Build Local
```bash
npm run build
npm run start
```

### Deploy
- Compatível com Vercel, Netlify, AWS
- Configurar variáveis de ambiente para produção
- Ajustar URLs das APIs para ambiente de produção

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Para suporte e dúvidas:
- Abra uma issue no repositório
- Consulte a documentação do backend
- Verifique os logs do console do navegador

---

**Desenvolvido com ❤️ usando Next.js e TypeScript**
