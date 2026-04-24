import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "@/assets/cover-desolate.png";

const Cover2 = () => {
  const nav = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = bg;
    const onLoad = () => {
      setImgLoaded(true);
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
    const leaveTimer = setTimeout(() => setLeaving(true), 2500);
    const navTimer = setTimeout(() => nav("/intro/3"), 3100);
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
      <div className="absolute inset-0 bg-black/35" />
      <p
        className="relative font-serif-en text-center px-8 max-w-md text-[hsl(var(--night-text))] leading-loose text-lg md:text-xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
        style={{
          opacity: visible && !leaving ? 1 : 0,
          transform: visible && !leaving ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 800ms ease-out 300ms, transform 800ms ease-out 300ms",
        }}
      >
        直到一场漫长的沉寂缓缓降临，<br />
        光芒散尽，山河褪色，<br />
        无数角落，归于寂静与荒芜。
      </p>
    </div>
  );
};

export default Cover2;
