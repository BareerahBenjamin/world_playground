import { Link } from "react-router-dom";
import bg from "@/assets/bg-tower-main.png";

const buttons = [
  { to: "/goals", label: "开启心愿征程，步履生光", hint: "GOALS · 关卡" },
  { to: "/", label: "接受副本挑战，探索世界", hint: "TODAY · 今日" },
  { to: "/chronicle", label: "留下心境絮语，闪光自愈", hint: "CHRONICLE · 编年史" },
];

const Tower = () => {
  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />

      {/* 飞向星之塔的流星（装饰） */}
      <span className="meteor-to-tower" />

      <div className="relative min-h-full flex flex-col items-center justify-between py-12 px-6">
        <div className="text-center">
          <p className="font-serif-en tracking-[0.4em] text-[10px] text-[hsl(var(--gold-bright))]/80">
            STAR · TOWER
          </p>
          <h1 className="font-serif-en text-2xl md:text-3xl text-[hsl(var(--cream))] mt-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            你的星之塔
          </h1>
        </div>

        <p className="relative max-w-md text-center font-serif-en text-[15px] leading-loose text-[hsl(var(--cream))] drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] my-10">
          这里，有一座永远等你归来的星之塔。<br />
          它收藏所有独行之人的<span className="text-[hsl(var(--gold-bright))]">心事、温柔与细碎星光</span>。<br />
          不必追赶世界的节奏，慢慢走，自愈生长。<br />
          前路漫漫，星光为伴，高塔为岸，<br />
          你，本就是<span className="text-[hsl(var(--gold-bright))]">捍卫自我的勇敢勇士</span>。
        </p>

        <div className="w-full max-w-sm flex flex-col gap-4">
          {buttons.map((b, i) => (
            <Link
              key={b.to}
              to={b.to}
              className="block px-5 py-4 rounded-sm font-serif-en text-center tracking-wider text-[15px] backdrop-blur-sm transition-transform hover:-translate-y-0.5 active:translate-y-0"
              style={{
                background: "hsl(var(--night-deep) / 0.6)",
                border: "1.5px solid hsl(var(--gold) / 0.55)",
                color: "hsl(var(--cream))",
                boxShadow:
                  "0 0 18px hsl(var(--gold) / 0.25), inset 0 0 10px hsl(var(--gold) / 0.1)",
                animation: `paperFadeIn 600ms ${i * 120}ms both`,
              }}
            >
              <span className="block text-[10px] tracking-[0.3em] text-[hsl(var(--gold-bright))]/80 mb-1">
                {b.hint}
              </span>
              {b.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Tower;
