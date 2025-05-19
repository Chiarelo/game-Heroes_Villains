import { useEffect, useRef } from "react";

export default function TenorGif() {
  const ref = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    ref.current.appendChild(script);
  }, []);

  return (
    <div
      className="tenor-gif-embed"
      data-postid="20761658"
      data-share-method="host"
      data-aspect-ratio="1.82857"
      data-width="100%"
      ref={ref}
    >
      <a href="https://tenor.com/view/comunilce-nilce-moretto-gif-20761658">
        Comunilce Nilce Moretto GIF
      </a>{" "}
      from{" "}
      <a href="https://tenor.com/search/comunilce-gifs">Comunilce GIFs</a>
    </div>
  );
}
