import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "@/assets/cover-fairytale.png";

const Cover1 = () => {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 图片预加载：加载完成后才开始计时
  useEffect(() => {
    const img = new Image();
    img.src = bg;
    const start = () => {
      setReady(true);
      timerRef.current = setTimeout(() => nav("/intro/2"), 3000);
    };
    if (img.complete) {
      start();
    } else {
      img.onload = start;
      // 加载失败也不卡住，直接开始计时
      img.onerror = start;
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [nav]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: ready ? `url(${bg})` : "none",
        backgroundColor: ready ? undefined : "hsl(var(--night-deep))",
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="absolute inset-0 bg-black/25" />
      {ready && (
        <p className="relative font-serif-en text-center px-8 max-w-md text-[hsl(var(--cream))] leading-loose text-lg md:text-xl paper-in drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
          很久以前，这片世界，<br />
          曾漫有漫天星光，<br />
          万物繁盛，生机盎然。
        </p>
      )}
    </div>
  );
};
export default Cover1;
