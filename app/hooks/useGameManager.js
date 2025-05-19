import { useState, useEffect, useRef } from "react";

export default function useGameManager(setHeroVideoVisible, setLog) {
  const initialHero = { life: 100, name: "BRKsEdu" };
  const initialVillain = { life: 100, name: "Leon" };

  const [hero, setHero] = useState(initialHero);
  const [villain, setVillain] = useState(initialVillain);
  const [isHeroTurn, setIsHeroTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [lastAction, setLastAction] = useState("");
  const [isDefending, setIsDefending] = useState(false);
  const [villainVideoVisible, setVillainVideoVisible] = useState(false);

  const bilada = useRef(null);
  const nilce = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      bilada.current = new Audio("/sounds/bilada.mp3");
      nilce.current = new Audio("/sounds/nilce.mp3");
    }
  }, []);

  const modifyLife = (target, amount) => {
    const setter = target === "hero" ? setHero : setVillain;
    setter((prev) => ({ ...prev, life: Math.max(0, prev.life + amount) }));
  };

  const addLog = (msg) => {
    setLastAction(msg);
  };

  const actions = {
    attack: () => {
      modifyLife("villain", -10);
      bilada.current?.play();
      setHeroVideoVisible(true);
      setTimeout(() => setHeroVideoVisible(false), 11000);
      addLog(
        `${hero.name} deu uma surra de bilada no ${villain.name}, causando 10 de dano.`
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
    },
  };

  const handleHeroAction = (action) => {
    if (!isHeroTurn || gameOver) return;

    actions[action]?.();
    setIsHeroTurn(false);

    setTimeout(() => {
      if (action === "flee") return;

      let dmg = 15;
      if (isDefending) {
        dmg = Math.floor(dmg * 0.25);
        setIsDefending(false);
      }

      modifyLife("hero", -dmg);
      nilce.current?.play();
      setVillainVideoVisible(true);
      setTimeout(() => setVillainVideoVisible(false), 6000);
      addLog(
        `${villain.name} deu uma surra de NILCE!!! no ${hero.name} causando ${dmg} de dano.`
      );
      setIsHeroTurn(true);
    }, 11000);
  };

  const resetGame = () => {
    setHero(initialHero);
    setVillain(initialVillain);
    setIsHeroTurn(true);
    setLastAction("");
    setGameOver(false);
    setIsDefending(false);
    setHeroVideoVisible(false);
    setVillainVideoVisible(false);
    setLog([]);
  };

  return {
    hero,
    villain,
    handleHeroAction,
    heroTurn: isHeroTurn,
    resetGame,
    lastAction,
    villainVideoVisible,
  };
}
