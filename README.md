# Contas Bancárias React Bootstrap Remake

## Visão Geral

Aplicação de gerenciamento de contas bancárias desenvolvida em React + TypeScript, utilizando Vite, Bootstrap 5 e Bootstrap Icons. O projeto segue Clean Architecture, Clean Code e padrões modernos de desenvolvimento frontend.

- **Frontend SPA** com React 19 + TypeScript
- **UI moderna** com Bootstrap 5 e Bootstrap Icons
- **CRUD completo** (Create, Read, Update, Delete) integrado a uma API fake via json-server
- **Arquitetura modular**: componentes, páginas, models e services separados
- **Responsivo e com layout profissional**

![Overview](https://github.com/user-attachments/assets/07dac251-b087-431d-a8b0-cd98cd2d4b90)
![Create-page](https://github.com/user-attachments/assets/8c7f01d5-b3b3-4c3a-95ec-9b35b01fdd9d)
![Read-page](https://github.com/user-attachments/assets/59e36575-ff53-435c-8f77-6d6efb826db9)
![Update-page](https://github.com/user-attachments/assets/4bd0b6f7-9cf8-4756-95bf-00d46aa877f3)
![Delete-page](https://github.com/user-attachments/assets/a9319c18-cd2a-450e-91c9-f1913d15331b)

## Estrutura do Projeto

```
contas-bancarias-react-bootstrap-remake/
├── public/
├── src/
│   ├── assets/           # Imagens e ícones
│   ├── components/       # Header, Sidebar, Footer
│   ├── models/           # Tipos TypeScript (User, Account, Card)
│   ├── pages/            # CRUD: Create, Read, Update, Delete, Welcome, Home
│   ├── services/         # userService.ts (API REST)
│   ├── App.tsx           # Layout principal
│   ├── AppRoutes.tsx     # Rotas centralizadas
│   ├── colors.ts         # Cores customizadas
│   └── main.tsx          # Ponto de entrada
├── db.json               # Banco de dados fake para json-server
├── package.json
├── vite.config.ts
└── README.md
```

## Instalação e Execução

1. **Instale as dependências:**
   ```bash
   npm install
   ```
2. **Inicie o json-server (API fake):**
   ```bash
   npx json-server --watch db.json --port 3001
   ```
3. **Rode o frontend:**
   ```bash
   npm run dev
   ```

Acesse em: [http://localhost:5173](http://localhost:5173)

## Scripts Úteis

- `npm run dev` — Inicia o frontend em modo desenvolvimento
- `npm run build` — Gera build de produção
- `npm run preview` — Preview do build
- `npm run lint` — Lint do código

## Padrões e Convenções

- **Cores**: Definidas em `src/colors.ts` e usadas via importação JS/TS
- **Componentes**: Utilizam utilitários Bootstrap (`d-flex`, `px-5`, etc.)
- **Ícones**: `<i className="bi bi-*"></i>`
- **Rotas**: Centralizadas em `src/AppRoutes.tsx` usando React Router DOM
- **Arquitetura**: Clean Architecture, Clean Code, separação clara de responsabilidades

## Exemplos de Código

**Definição de cor primária:**

```ts
// src/colors.ts
export const primaryColor = "#ff6200";
```

**Uso de rotas:**

```tsx
// src/AppRoutes.tsx
<Routes>
  <Route path="/" element={<Welcome />} />
  <Route path="/home" element={<Home />} />
</Routes>
```

**Uso de ícone:**

```tsx
<i className="bi bi-house text-white" style={{ fontSize: 24 }}></i>
```

## Como adicionar novas páginas

1. Crie o componente em `src/pages/`
2. Registre a rota em `src/AppRoutes.tsx`

## Observações

- Não use variáveis SCSS diretamente no JSX; use variáveis JS/TS
- Para customizar estilos, prefira sobrescrever CSS global ou variáveis JS/TS
- Não use `@import` SCSS do Bootstrap; use o CSS pronto
- Commits devem ser claros e descritivos, em inglês, seguindo o padrão: `feat: ...`, `fix: ...`, etc.

## Autor

Caio Cabral — [GitHub](https://github.com/Caio-Cabral-Programmer)

---

Projeto para fins didáticos e demonstração de boas práticas em React + TypeScript + Bootstrap.
