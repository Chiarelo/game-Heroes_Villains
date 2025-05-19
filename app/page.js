"use client";
import Character from "@/app/components/Character";
import useGameManager from "@/app/hooks/useGameManager";
import NilceComunista from "./components/NilceGif";
import { useState, useEffect } from "react";

export default function Home() {
  const [heroVideoVisible, setHeroVideoVisible] = useState(false);
  const [log, setLog] = useState([]);

  const {
    hero,
    villain,
    handleHeroAction,
    heroTurn,
    resetGame,
    lastAction,
    villainVideoVisible,
  } = useGameManager(setHeroVideoVisible, setLog);

  useEffect(() => {
    if (lastAction && log[log.length - 1] !== lastAction) {
      setLog((prev) => [...prev, lastAction]);
    }
  }, [lastAction]);

  return (
    <div className="container">
      <h1 className="title">Game: Herói vs Vilão</h1>

      <div className="battlefield">
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
      </div>

      <div className="log">
        <h2>Histórico de Ações</h2>
        <ul>
          {log.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <button className="button-restart" onClick={resetGame}>
        Reiniciar Jogo
      </button>
    </div>
  );
}
