import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "@/assets/cover-fairytale.png";

const Cover1 = () => {
  const nav = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = bg;
    const onLoad = () => {
      setImgLoaded(true);
      // 下一帧再触发 visible，让浏览器有时间绘制背景
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    };
    if (img.complete) {
      onLoad();
    } else {
      img.onload = onLoad;
      img.onerror = onLoad;
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    // 展示 2.5s 后开始淡出，淡出 600ms 后跳转
    const leaveTimer = setTimeout(() => setLeaving(true), 2500);
    const navTimer = setTimeout(() => nav("/intro/2"), 3100);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(navTimer);
    };
  }, [visible, nav]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: imgLoaded ? `url(${bg})` : "none",
        backgroundColor: "hsl(222, 38%, 6%)",
        opacity: leaving ? 0 : visible ? 1 : 0,
        transition: leaving
          ? "opacity 600ms ease-in"
          : "opacity 700ms ease-out",
      }}
    >
      <div className="absolute inset-0 bg-black/25" />
      <p
        className="relative font-serif-en text-center px-8 max-w-md text-[hsl(var(--cream))] leading-loose text-lg md:text-xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
        style={{
          opacity: visible && !leaving ? 1 : 0,
          transform: visible && !leaving ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 800ms ease-out 300ms, transform 800ms ease-out 300ms",
        }}
      >
        很久以前，这片世界，<br />
        曾漫有漫天星光，<br />
        万物繁盛，生机盎然。
      </p>
    </div>
  );
};

export default Cover1;
