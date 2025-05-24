export default function Character({
                                      data,
                                      isHero,
                                      onAction,
                                      isHeroTurn,
                                      showVideo,
                                      videoSrc,
                                      showImage,
                                      imageSrc,
                                      showWinVideo,
                                  }) {
    const lifePercent = Math.max(0, data.life) + "%";

    return (
        <div className="character">
            {/* Vídeo ou Imagem dentro do card */}
            <div className="video-container">
                {isHero && showVideo && (
                    <video
                        src={videoSrc}
                        autoPlay
                        muted
                        key={videoSrc} // Força re-render quando muda o src
                    />
                )}
                {!isHero && showImage && (
                    <img
                        src={imageSrc}
                        alt="Villain attack"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '8px'
                        }}
                    />
                )}
            </div>

            <div className="life-bar">
                <div className="life-fill" style={{ width: lifePercent }}></div>
                <div className="life-text">{data.life}</div>
            </div>

            <h1>{data.name}</h1>

            {isHero && onAction && (
                <div className="actions">
                    <button disabled={!isHeroTurn} onClick={() => onAction("attack")}>
                        Atacar
                    </button>
                    <button disabled={!isHeroTurn} onClick={() => onAction("defense")}>
                        Defesa
                    </button>
                    <button disabled={!isHeroTurn} onClick={() => onAction("usePotion")}>
                        Usar Poção
                    </button>
                    <button disabled={!isHeroTurn} onClick={() => onAction("flee")}>
                        Correr
                    </button>
                </div>
            )}
        </div>
    );
}