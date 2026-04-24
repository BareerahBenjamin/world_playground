import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const nav = useNavigate();
  const nicknameRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nickname = nicknameRef.current?.value || "无名旅人";
    localStorage.setItem("player_name", nickname);
    nav("/tower");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[hsl(var(--night-deep))] flex items-center justify-center px-5 py-10">
      <div className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 30% 20%, hsl(var(--cream)) 50%, transparent), radial-gradient(1.5px 1.5px at 80% 70%, hsl(var(--gold-bright)) 50%, transparent), radial-gradient(1px 1px at 50% 50%, hsl(var(--cream)/0.7) 50%, transparent)",
          backgroundSize: "260px 260px",
        }}
      />
      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-sm p-7 rounded-sm paper-in"
        style={{
          background: "linear-gradient(180deg, hsl(var(--cream)), hsl(var(--parchment)))",
          border: "1.5px solid hsl(var(--gold)/0.6)",
          boxShadow: "0 0 50px hsl(var(--gold)/0.2), 0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <div className="text-center mb-6">
          <p className="font-serif-en tracking-[0.3em] text-[10px] text-[hsl(var(--ink-faded))]">SIGN IN</p>
          <h2 className="font-serif-en text-2xl mt-1">推开高塔之门</h2>
          <p className="font-hand text-sm text-[hsl(var(--ink-faded))] mt-1">报上你的名字，旅人</p>
        </div>

        <label className="block mb-4">
          <span className="text-xs tracking-widest text-[hsl(var(--ink-faded))] font-serif-en">昵称</span>
          <input
            ref={nicknameRef}
            type="text"
            required
            placeholder="独行旅人"
            className="mt-1.5 w-full px-4 py-3 rounded-sm bg-transparent border-2 border-[hsl(var(--ink))] font-serif-en text-base focus:outline-none focus:border-[hsl(var(--gold))]"
          />
        </label>
        <label className="block mb-6">
          <span className="text-xs tracking-widest text-[hsl(var(--ink-faded))] font-serif-en">密码</span>
          <input
            type="password"
            required
            placeholder="••••••"
            className="mt-1.5 w-full px-4 py-3 rounded-sm bg-transparent border-2 border-[hsl(var(--ink))] font-serif-en text-base focus:outline-none focus:border-[hsl(var(--gold))]"
          />
        </label>

        <button
          type="submit"
          className="w-full py-4 rounded-sm font-serif-en tracking-widest text-base transition-transform hover:-translate-y-0.5"
          style={{
            background: "hsl(var(--ink))",
            color: "hsl(var(--gold-bright))",
            border: "1.5px solid hsl(var(--gold))",
            boxShadow: "0 4px 0 hsl(var(--ink-soft)), 0 0 18px hsl(var(--gold)/0.35)",
          }}
        >
          登 入 高 塔
        </button>

        <p className="text-center font-hand text-xs text-[hsl(var(--ink-faded))] mt-4">
          首次到访亦可直接登入 · 一切将被温柔记得
        </p>
      </form>
    </div>
  );
};

export default Login;