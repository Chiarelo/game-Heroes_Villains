# 🕹️ Herói vs Vilão – Jogo em React

Um mini game de turnos com **animações em vídeo**, onde um herói enfrenta um vilão em batalhas dinâmicas. Desenvolvido com **React + Next.js**, o projeto traz lógica de combate, histórico de ações e reinício de partida.

---

## 🚀 Tecnologias Utilizadas

* **React**
* **Next.js (App Router com `use client`)**
* **Hooks personalizados**
* **CSS Modules**
* **Vídeos MP4 para animações**

---

## 📁 Estrutura de Pastas

```
app/
├── components/
│   └── Character.jsx         # Componente dos personagens
├── hooks/
│   └── useGameManager.js     # Hook com a lógica do jogo
└── page.jsx                  # Página principal
public/
└── assets/gifs/              # Vídeos dos personagens
```

---

## 📄 Funcionamento Geral

### 🎮 Lógica de Turnos

* O estado `heroTurn` define se é a vez do herói.
* `handleHeroAction`:

  * Aplica dano ao vilão
  * Exibe o vídeo do herói
  * Registra ação no log
  * Inicia o turno do vilão após delay

> O vilão ataca automaticamente após o herói, criando a dinâmica de turnos.

---

### 🧠 Histórico de Ações

```js
if (lastAction && log[log.length - 1] !== lastAction) {
  setLog((prev) => [...prev, lastAction]);
}
```

* `log`: array que armazena as ações da partida
* `lastAction`: atualizado a cada ataque no `useGameManager`

> Garante que apenas ações novas sejam adicionadas, evitando repetições.

---

### 💥 Controle de Vida

* Herói e vilão têm um campo `hp`
* Ataques diminuem a vida do oponente
* Pode ser usado para mostrar barras de vida ou definir fim de jogo

---

### 🎬 Animações em Vídeo

* Cada personagem possui um vídeo (`videoSrc`)
* Exibição controlada por `heroVideoVisible` e `villainVideoVisible`
* Vídeos aparecem temporariamente a cada ação

> Substitui animações complexas com uma abordagem simples e impactante.

---

### 🔄 Reinício da Partida

A função `resetGame`:

* Restaura a vida dos personagens
* Reinicia o turno para o herói
* Limpa o histórico
* Oculta os vídeos

> Permite jogar novamente sem recarregar a página.

---

## 🧩 Componentes em Destaque

```jsx
<Character
  data={hero}
  isHero={true}
  onAction={handleHeroAction}
  isHeroTurn={heroTurn}
  showVideo={heroVideoVisible}
  videoSrc="/assets/gifs/bilada.mp4"
/>

<Character
  data={villain}
  isHero={false}
  onAction={null}
  isHeroTurn={false}
  showVideo={villainVideoVisible}
  videoSrc="/assets/gifs/leoncofre.mp4"
/>
```

* Componente reutilizável para herói e vilão
* Vídeos são controlados individualmente
* Somente o herói executa ações com clique

---

## ✅ Funcionalidades Implementadas

* [x] Turnos entre herói e vilão
* [x] Histórico de ações
* [x] Animações com vídeo
* [x] Reinício da partida

---

## 📌 Melhorias Futuras

* [ ] Barra de vida animada
* [ ] Efeitos sonoros
* [ ] Responsividade mobile
* [ ] Novos personagens com habilidades distintas

---

## 📸 Demonstração

> 💡 Adicione aqui um **GIF** ou **link do Vercel** com a demonstração do jogo funcionando.

---

## 🧑‍💻 Autor

Feito por **Vinícius Chiarelo** como parte dos estudos com **React e Next.js**
🎯 Inspirado por jogos de turno como **Final Fantasy**

---