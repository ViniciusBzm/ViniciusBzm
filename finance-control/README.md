# 💰 Finance Control

Sistema completo de controle financeiro pessoal com backend em Node.js + Fastify e frontend em HTML, CSS e JavaScript puro.

## 📋 Descrição

O Finance Control permite que você gerencie suas finanças pessoais de forma simples e eficiente. Com ele, você pode:

- ✅ Registrar receitas e despesas
- 📊 Visualizar todas as transações em uma tabela organizada
- ✏️ Editar transações existentes
- 🗑️ Excluir registros
- 💵 Ver saldo total atualizado automaticamente
- 📈 Acompanhar receitas, despesas e saldo final

## 🏗️ Estrutura do Projeto

```
finance-control/
├── backend/
│   ├── src/
│   │   ├── server.ts              # Servidor Fastify
│   │   ├── routes/
│   │   │   └── transactions.ts    # Rotas da API
│   │   ├── controllers/
│   │   │   └── TransactionController.ts  # Lógica de negócio
│   │   ├── prisma/
│   │   │   └── client.ts          # Cliente Prisma
│   │   └── schemas/
│   │       └── transactionSchema.ts  # Validação com Zod
│   ├── prisma/
│   │   ├── schema.prisma          # Schema do banco de dados
│   │   └── dev.db                 # Banco SQLite (gerado)
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── index.html    # Interface do usuário
    ├── style.css     # Estilos responsivos
    └── script.js     # Lógica e integração com API
```

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Fastify** - Framework web rápido e eficiente
- **Prisma** - ORM moderno para TypeScript
- **SQLite** - Banco de dados leve e portátil
- **Zod** - Validação de dados com TypeScript

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna e responsiva
- **JavaScript (ES6+)** - Lógica e interação
- **Fetch API** - Comunicação com backend

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Passo 1: Configurar o Backend

```bash
# Navegue até a pasta do backend
cd finance-control/backend

# Instale as dependências
npm install

# Gere o cliente Prisma
npm run prisma:generate

# Execute as migrações do banco de dados
npm run prisma:migrate

# Inicie o servidor de desenvolvimento
npm run dev
```

O backend estará rodando em `http://localhost:3000`

### Passo 2: Configurar o Frontend

```bash
# Navegue até a pasta do frontend
cd finance-control/frontend

# Abra o arquivo index.html em um navegador ou use um servidor HTTP
# Opção 1: Abrir diretamente
# Opção 2: Usar um servidor local (recomendado)

# Com Python 3:
python -m http.server 8080

# Com Node.js (npx):
npx serve

# Com extensão Live Server do VS Code:
# Clique com botão direito em index.html > Open with Live Server
```

O frontend estará acessível em `http://localhost:8080` (ou porta configurada)

## 📡 API Endpoints

### Transações

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/transactions` | Lista todas as transações |
| GET | `/transactions/:id` | Busca uma transação por ID |
| POST | `/transactions` | Cria uma nova transação |
| PUT | `/transactions/:id` | Atualiza uma transação |
| DELETE | `/transactions/:id` | Exclui uma transação |

### Exemplo de Corpo da Requisição (POST/PUT)

```json
{
  "title": "Salário",
  "type": "income",
  "amount": 5000.00,
  "category": "Trabalho"
}
```

## 💡 Funcionalidades

### ✨ Principais Recursos

1. **Adicionar Transação**
   - Preencha o formulário com título, valor, tipo e categoria
   - Clique em "Adicionar" para salvar

2. **Listar Transações**
   - Visualize todas as transações em ordem decrescente
   - Veja informações detalhadas de cada registro

3. **Editar Transação**
   - Clique no botão "✏️ Editar" na linha desejada
   - Modifique os campos no formulário
   - Clique em "Atualizar" para salvar

4. **Excluir Transação**
   - Clique no botão "🗑️ Excluir" na linha desejada
   - Confirme a exclusão

5. **Visualizar Resumo**
   - Acompanhe o total de receitas
   - Veja o total de despesas
   - Monitore o saldo final atualizado automaticamente

### 🎨 Design Responsivo

- Interface adaptável para desktop, tablet e mobile
- Design moderno com gradientes e animações
- Cards informativos com cores diferenciadas
- Tabela responsiva com scroll horizontal

## 🔒 Segurança

- Validação de dados no backend com Zod
- Tratamento de erros adequado
- CORS configurado para comunicação segura
- IDs validados antes de operações no banco

## 🧪 Testes

Para testar a API, você pode usar:

- **Postman** ou **Insomnia** para testes manuais
- **curl** via linha de comando

Exemplo com curl:

```bash
# Criar transação
curl -X POST http://localhost:3000/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Salário",
    "type": "income",
    "amount": 5000.00,
    "category": "Trabalho"
  }'

# Listar transações
curl http://localhost:3000/transactions
```

## 📦 Scripts Disponíveis (Backend)

- `npm run dev` - Inicia o servidor em modo desenvolvimento com hot reload
- `npm run build` - Compila o TypeScript para JavaScript
- `npm start` - Inicia o servidor em produção
- `npm run prisma:generate` - Gera o cliente Prisma
- `npm run prisma:migrate` - Executa migrações do banco de dados

## 🌟 Melhorias Futuras

Possíveis funcionalidades para expandir o projeto:

- [ ] Adicionar filtros por categoria, tipo ou data
- [ ] Exportar histórico em CSV ou PDF
- [ ] Implementar dark mode alternável
- [ ] Adicionar gráficos de visualização
- [ ] Criar sistema de autenticação
- [ ] Permitir anexar comprovantes
- [ ] Adicionar metas financeiras
- [ ] Implementar notificações

## 📝 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido por **Vinicius** como projeto de estudo de desenvolvimento full-stack.

---

**Finance Control** - Gerencie suas finanças de forma simples e eficiente! 💰
