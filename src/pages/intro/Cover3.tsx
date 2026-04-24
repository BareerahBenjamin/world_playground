import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bg from "@/assets/bg-tower-main.png";

const Cover3 = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = bg;
    const onLoad = () => {
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

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-between py-16 px-6 bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundColor: "hsl(222, 38%, 6%)",
        opacity: visible ? 1 : 0,
        transition: "opacity 700ms ease-out",
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div />
      <p
        className="relative font-serif-en text-center max-w-md text-[hsl(var(--cream))] leading-loose text-base md:text-lg drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 800ms ease-out 400ms, transform 800ms ease-out 400ms",
        }}
      >
        散落大陆的光之高塔，<br />
        默默封存着世间最后一缕微光。<br />
        世人独行、离散、迷失、停留，<br />
        而你，正是踏上寻光归途的
        <span className="text-[hsl(var(--gold-bright))]">独行旅人</span>。
      </p>
      <Link
        to="/letter"
        className="relative px-8 py-4 rounded-sm font-serif-en text-base tracking-widest backdrop-blur-sm transition-transform hover:-translate-y-0.5 active:translate-y-0"
        style={{
          background: "hsl(var(--night-deep) / 0.7)",
          border: "1.5px solid hsl(var(--gold) / 0.7)",
          color: "hsl(var(--gold-bright))",
          boxShadow: "0 0 24px hsl(var(--gold) / 0.35), inset 0 0 12px hsl(var(--gold) / 0.15)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 800ms ease-out 700ms, transform 800ms ease-out 700ms",
        }}
      >
        ✦ 来自星光高塔的一封来信
      </Link>
    </div>
  );
};

export default Cover3;
