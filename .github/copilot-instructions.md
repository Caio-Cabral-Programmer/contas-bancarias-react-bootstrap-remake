# Copilot Instructions for contas-bancarias-react-bootstrap-remake

## Visão Geral do Projeto

- Projeto React + TypeScript criado com Vite, focado em uma aplicação de contas bancárias.
- Utiliza Bootstrap 5 e Bootstrap Icons para estilização, com integração via importação direta de CSS.
- Estrutura modular: componentes em `src/components/`, páginas em `src/pages/`, rotas centralizadas em `src/AppRoutes.tsx`.
- O projeto tem a intenção de aplicar todas as boas práticas de Clean Architecture, Clean Code e Padrões de Projeto React.

## Arquitetura e Fluxo Principal

- O ponto de entrada é `src/main.tsx`, que importa estilos globais, Bootstrap e Bootstrap Icons.
- O componente `App` (em `src/App.tsx`) encapsula o layout principal, incluindo o `Header` e as rotas.
- As rotas são definidas em `src/AppRoutes.tsx` usando React Router (`Routes` e `Route`). Exemplos:
  - `/` e `/welcome` → `Welcome`
  - `/home` → `Home`
- Navegação entre páginas é feita com `<Link to="...">` ou via hook `useNavigate()`.

## Convenções e Padrões

- Cores customizadas são definidas em `src/colors.ts` e usadas via importação JS/TS, não via SCSS.
- Componentes usam classes utilitárias do Bootstrap para layout e espaçamento (`d-flex`, `px-5`, `ms-3`, etc).
- Ícones do Bootstrap são usados via `<i className="bi bi-*"></i>`, com o CSS importado em `main.tsx`.
- Não há uso de variáveis SCSS diretamente no JSX; para valores dinâmicos, use variáveis JS/TS.

## Workflows de Desenvolvimento

- **Rodar localmente:**
  ```bash
  npm install
  npm run dev
  ```
- **Build de produção:**
  ```bash
  npm run build
  ```
- **Lint:**
  ```bash
  npm run lint
  ```
- **Preview:**
  ```bash
  npm run preview
  ```

## Integrações e Dependências

- React Router DOM para navegação SPA.
- Bootstrap e Bootstrap Icons para UI.
- ESLint com configuração customizada em `eslint.config.js`.
- Há backend ou API integrada neste repositório, que é um CRUD completo.

## Exemplos de Padrão

- Definição de cor primária:
  ```ts
  // src/colors.ts
  export const primaryColor = "#ff6200";
  ```
- Uso de rotas:
  ```tsx
  // src/AppRoutes.tsx
  <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/home" element={<Home />} />
  </Routes>
  ```
- Uso de ícone:
  ```tsx
  <i className="bi bi-house text-white" style={{ fontSize: 24 }}></i>
  ```

## Observações

- Para adicionar novas páginas, crie o componente em `src/pages/` e registre a rota em `src/AppRoutes.tsx`.
- Para customizar estilos, prefira variáveis JS/TS ou sobrescreva CSS global.
- Não use `@import` SCSS do Bootstrap para evitar warnings depreciação; use o CSS pronto.
