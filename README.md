# 🕹️ Herói vs Vilão – Jogo de Turnos em React

<p align="center">
  Um mini game de turnos com animações em vídeo, onde a Lara Croft enfrenta o Konstantin da Trindade em uma batalha épica!
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-rodar">Como Rodar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-estrutura">Estrutura</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Licença</a>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=0F172A&labelColor=1D4ED8">
  <img alt="React" src="https://img.shields.io/badge/React-18.0+-61DAFB?style=flat&logo=react&logoColor=white">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-14.0+-000000?style=flat&logo=next.js&logoColor=white">
</p>

---

## 📂 Sobre o Projeto

<p align="center">
  <img alt="Imagem do Projeto" src="https://github.com/user-attachments/assets/3e3d3f3e-1dee-4ced-b619-ecbfc20c9913" width="800px">
</p>

Este é um projeto de jogo de turnos inspirado em clássicos como Final Fantasy. O jogo apresenta um sistema de combate estratégico onde os jogadores podem escolher entre diferentes ações: atacar, defender, recuperar vida ou desistir da batalha.

O projeto foi desenvolvido com foco em:
- **Mecânicas de RPG clássico**: Sistema de turnos, pontos de vida, ações estratégicas
- **Experiência audiovisual**: Animações em vídeo e efeitos sonoros imersivos
- **Interface responsiva**: Adaptável para desktop e dispositivos móveis
- **Código limpo**: Arquitetura modular com hooks personalizados

---

## ⚡ Funcionalidades

### 🎮 Sistema de Combate
- **Ataques**: Cause dano ao oponente
- **Defesa**: Reduza o dano recebido no próximo turno
- **Recuperação**: Restaure pontos de vida
- **Desistência**: Termine a batalha antecipadamente

### 🎬 Elementos Visuais
- **Animações em vídeo**: Cada ação possui sua animação única
- **Efeitos sonoros**: Trilha sonora e efeitos de combate
- **Barras de vida animadas**: Acompanhe a saúde dos personagens em tempo real
- **Interface responsiva**: Experiência otimizada para todos os dispositivos

### 📊 Sistema de Jogo
- **Turnos alternados**: Mecânica clássica de RPG
- **Histórico de ações**: Acompanhe todas as jogadas da partida
- **Reinício rápido**: Comece uma nova batalha a qualquer momento
- **Estados de jogo**: Controle preciso de vitória, derrota e empate

---

## 🚀 Tecnologias

- **[React](https://reactjs.org/)** - Biblioteca para interfaces de usuário
- **[Next.js](https://nextjs.org/)** - Framework React com App Router
- **[JavaScript ES6+](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)** - Linguagem de programação
- **[CSS Modules](https://github.com/css-modules/css-modules)** - Estilização modular
- **[HTML5 Video](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/video)** - Reprodução de animações

---

## 💻 Como Rodar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/heroi-vs-vilao.git
cd heroi-vs-vilao
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Execute em modo de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

4. **Acesse no navegador**
```
http://localhost:3000
```

### Build para Produção
```bash
npm run build
npm start
```

---

## 📁 Estrutura do Projeto

```
📦 heroi-vs-vilao/
├── 📁 app/
│   ├── 📁 components/
│   │   └── 📄 Character.jsx         # Componente dos personagens
│   ├── 📁 hooks/
│   │   └── 📄 useGameManager.js     # Lógica principal do jogo
│   ├── 📁 styles/
│   │   └── 📄 globals.css           # Estilos globais
│   └── 📄 page.jsx                  # Página principal
├── 📁 public/
│   └── 📁 assets/
│       ├── 📁 gifs/                 # Vídeos das animações
│       └── 📁 sounds/               # Efeitos sonoros
├── 📄 package.json
└── 📄 README.md
```

---

## 🧠 Como Funciona

### Sistema de Turnos
O jogo utiliza um estado `heroTurn` para controlar de quem é a vez:

```javascript
const handleHeroAction = (action) => {
  // Aplica a ação do herói
  // Exibe animação correspondente
  // Registra no histórico
  // Passa a vez para o vilão
};
```

### Controle de Animações
Cada personagem possui controle independente de vídeo:

```javascript
const [heroVideoVisible, setHeroVideoVisible] = useState(false);
const [villainVideoVisible, setVillainVideoVisible] = useState(false);
```

### Histórico Inteligente
O sistema evita duplicações no log de ações:

```javascript
if (lastAction && log[log.length - 1] !== lastAction) {
  setLog((prev) => [...prev, lastAction]);
}
```

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Vinícius Chiarelo**

- LinkedIn: [Seu Nome](https://linkedin.com/in/chiarelo)

---
