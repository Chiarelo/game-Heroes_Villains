"use client";
import { useState, useEffect, useRef } from "react";

export default function useGameManager(setHeroVideoVisible, setLog) {
  const initialHero = { life: 100, name: "Lara" };
  const initialVillain = { life: 100, name: "Konstantin" };

  const [hero, setHero] = useState(initialHero);
  const [villain, setVillain] = useState(initialVillain);
  const [isHeroTurn, setIsHeroTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [lastAction, setLastAction] = useState("");
  const [isDefending, setIsDefending] = useState(false);
  const [villainImageVisible, setVillainImageVisible] = useState(false);
  const [winner, setWinner] = useState("");
  const [heroVideoType, setHeroVideoType] = useState("attack"); // "attack" ou "win"
  const [showWinVideo, setShowWinVideo] = useState(false);

  const larita = useRef(null);
  const heroVideoTimeoutRef = useRef(null);
  const villainImageTimeoutRef = useRef(null);
  const turnTimeoutRef = useRef(null);
  const heroAudioTimeoutRef = useRef(null);
  const winVideoTimeoutRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      larita.current = new Audio("/sounds/laritaAudio.mp3");
    }
  }, []);

  // Verifica se o jogo terminou após mudanças na vida dos personagens
  useEffect(() => {
    if (hero.life <= 0 && !gameOver) {
      setGameOver(true);
      setWinner(villain.name);
      addLog(`🏆 ${villain.name} venceu a batalha!`);
      clearAllTimeouts();
      setHeroVideoVisible(false);
      setVillainImageVisible(false);
    } else if (villain.life <= 0 && !gameOver) {
      setGameOver(true);
      setWinner(hero.name);
      addLog(`🏆 ${hero.name} venceu a batalha!`);
      clearAllTimeouts();
      setVillainImageVisible(false);

      // Mostrar vídeo de vitória
      setHeroVideoType("win");
      setShowWinVideo(true);
      setHeroVideoVisible(true);

      // Para o vídeo de vitória após 6 segundos
      winVideoTimeoutRef.current = setTimeout(() => {
        setShowWinVideo(false);
        setHeroVideoVisible(false);
      }, 6000);
    }
  }, [hero.life, villain.life, gameOver, hero.name, villain.name]);

  const clearAllTimeouts = () => {
    if (heroVideoTimeoutRef.current) {
      clearTimeout(heroVideoTimeoutRef.current);
      heroVideoTimeoutRef.current = null;
    }
    if (villainImageTimeoutRef.current) {
      clearTimeout(villainImageTimeoutRef.current);
      villainImageTimeoutRef.current = null;
    }
    if (turnTimeoutRef.current) {
      clearTimeout(turnTimeoutRef.current);
      turnTimeoutRef.current = null;
    }
    if (heroAudioTimeoutRef.current) {
      clearTimeout(heroAudioTimeoutRef.current);
      heroAudioTimeoutRef.current = null;
    }
    if (winVideoTimeoutRef.current) {
      clearTimeout(winVideoTimeoutRef.current);
      winVideoTimeoutRef.current = null;
    }

    // Para os áudios se estiverem tocando
    if (larita.current) {
      larita.current.pause();
      larita.current.currentTime = 0;
    }
  };

  const modifyLife = (target, amount) => {
    const setter = target === "hero" ? setHero : setVillain;
    setter((prev) => ({ ...prev, life: Math.max(0, prev.life + amount) }));
  };

  const addLog = (msg) => {
    setLastAction(msg);
  };

  const actions = {
    attack: () => {
      if (larita.current) {
        larita.current.pause();
        larita.current.currentTime = 0;
        larita.current.play();
      }
      modifyLife("villain", -15);
      setHeroVideoType("attack");
      setHeroVideoVisible(true);

      // Para o vídeo e áudio do herói após 4 segundos
      heroVideoTimeoutRef.current = setTimeout(() => {
        setHeroVideoVisible(false);
        if (larita.current) {
          larita.current.pause();
          larita.current.currentTime = 0;
        }
      }, 4000);

      addLog(
          `${hero.name} te caçou como um animal selvagem  ${villain.name}, causando 10 de dano.`
      );
    },
    defense: () => {
      setIsDefending(true);
      addLog(`${hero.name} se defendeu e reduzirá o próximo dano em 75%.`);
    },
    usePotion: () => {
      modifyLife("hero", +20);
      addLog(`${hero.name} usou uma poção e recuperou 20 de vida.`);
    },
    flee: () => {
      addLog(`${hero.name} fugiu da batalha.`);
      setGameOver(true);
      setWinner(villain.name);
    },
  };

  const handleHeroAction = (action) => {
    if (!isHeroTurn || gameOver) return;

    actions[action]?.();
    setIsHeroTurn(false);

    // Se fugiu, não executa o turno do vilão
    if (action === "flee") return;

    // Turno do vilão após 4 segundos
    turnTimeoutRef.current = setTimeout(() => {
      // Verifica se o jogo ainda não terminou antes de executar o turno do vilão
      if (gameOver || villain.life <= 0) return;

      let dmg = 15;
      if (isDefending) {
        dmg = Math.floor(dmg * 0.25);
        setIsDefending(false);
      }

      modifyLife("hero", -dmg);

      // Mostrar imagem do vilão atacando
      setVillainImageVisible(true);

      // Esconder a imagem do vilão após 2 segundos
      villainImageTimeoutRef.current = setTimeout(() => {
        setVillainImageVisible(false);
      }, 2000);

      addLog(
          `${villain.name} ncontrou o seu destino ${hero.name} causando ${dmg} de dano.`
      );
      setIsHeroTurn(true);
    }, 4000);
  };

  const resetGame = () => {
    // Limpa todos os timeouts antes de resetar
    clearAllTimeouts();

    setHero(initialHero);
    setVillain(initialVillain);
    setIsHeroTurn(true);
    setLastAction("");
    setGameOver(false);
    setWinner("");
    setIsDefending(false);
    setHeroVideoVisible(false);
    setVillainImageVisible(false);
    setShowWinVideo(false);
    setHeroVideoType("attack");
    setLog([]);
  };

  // Cleanup dos timeouts quando o componente for desmontado
  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  return {
    hero,
    villain,
    handleHeroAction,
    heroTurn: isHeroTurn,
    resetGame,
    lastAction,
    villainImageVisible,
    gameOver,
    winner,
    heroVideoType,
    showWinVideo,
  };
}