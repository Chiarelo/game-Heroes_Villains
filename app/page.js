"use client";
import Character from "@/app/components/Character";
import useGameManager from "@/app/hooks/useGameManager";
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
        villainImageVisible,
        gameOver,
        winner,
        heroVideoType,
        showWinVideo,
    } = useGameManager(setHeroVideoVisible, setLog);

    useEffect(() => {
        if (lastAction && log[log.length - 1] !== lastAction) {
            setLog((prev) => [...prev, lastAction]);
        }
    }, [lastAction]);

    return (
        <div className="container">
            <h1 className="title">Game: Herói vs Vilão</h1>

            {gameOver && (
                <div className="game-over">
                    <h2>🎮 Jogo Finalizado!</h2>
                    {winner && <p className="winner">Vencedor: {winner}</p>}
                </div>
            )}

            <div className="battlefield">
                <Character
                    data={hero}
                    isHero={true}
                    onAction={handleHeroAction}
                    isHeroTurn={heroTurn && !gameOver}
                    showVideo={heroVideoVisible}
                    videoSrc={heroVideoType === "win" ? "/assets/gifs/laraWins.mp4" : "/assets/gifs/laraAtack.mp4"}
                    showWinVideo={showWinVideo}
                />
                <Character
                    data={villain}
                    isHero={false}
                    onAction={null}
                    isHeroTurn={false}
                    showImage={villainImageVisible}
                    imageSrc="/assets/gifs/konstantin.jpg"
                />
            </div>

            <div className="log">
                <h2>Histórico de Ações</h2>
                <div className="log-container">
                    {log.length === 0 ? (
                        <p>Nenhuma ação realizada ainda...</p>
                    ) : (
                        <ul>
                            {log.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <button className="button-restart" onClick={resetGame}>
                {gameOver ? "Novo Jogo" : "Reiniciar Jogo"}
            </button>
        </div>
    );
}