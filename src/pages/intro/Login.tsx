import { FormEvent, useRef, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { isLoggedIn, login } from "@/lib/auth";

const Login = () => {
  const nav = useNavigate();
  const location = useLocation();
  const nicknameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 已登录用户访问登录页 → 直接跳主页（修复退出循环）
  if (isLoggedIn()) {
    const from = (location.state as { from?: Location })?.from?.pathname || "/home";
    return <Navigate to={from} replace />;
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const nickname = nicknameRef.current?.value.trim();
    const password = passwordRef.current?.value;

    // 昵称校验
    if (!nickname) {
      setError("请输入你的旅行者名称");
      nicknameRef.current?.focus();
      return;
    }
    if (nickname.length > 20) {
      setError("名称不超过 20 个字符");
      return;
    }

    // 密码校验（至少 6 位）
    if (!password || password.length < 6) {
      setError("密码至少 6 位，保护你的星之塔");
      passwordRef.current?.focus();
      return;
    }

    // 模拟登录（实际项目接入后端时在此替换）
    setLoading(true);
    setTimeout(() => {
      login(nickname);
      setLoading(false);
      // 登录成功后跳转：优先回到被保护的来源页，否则去 tower
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname;
      nav(from && from !== "/login" ? from : "/tower", { replace: true });
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[hsl(var(--night-deep))] flex items-center justify-center px-5 py-10">
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
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
          <p className="font-serif-en tracking-[0.3em] text-[10px] text-[hsl(var(--ink-faded))]">
            SIGN IN · REGISTER
          </p>
          <h2 className="font-serif-en text-2xl mt-1">推开高塔之门</h2>
          <p className="font-hand text-sm text-[hsl(var(--ink-faded))] mt-1">
            报上你的名字，旅人
          </p>
        </div>

        {/* 错误提示 */}
        {error && (
          <div
            className="mb-4 px-4 py-2.5 rounded-sm font-hand text-sm"
            style={{
              background: "hsl(var(--seal)/0.12)",
              border: "1px solid hsl(var(--seal)/0.4)",
              color: "hsl(var(--seal))",
            }}
          >
            ⚠ {error}
          </div>
        )}

        {/* 昵称 */}
        <label className="block mb-4">
          <span className="text-xs tracking-widest text-[hsl(var(--ink-faded))] font-serif-en">
            昵称
          </span>
          <input
            ref={nicknameRef}
            type="text"
            placeholder="独行旅人"
            maxLength={20}
            className="mt-1.5 w-full px-4 py-3 rounded-sm bg-transparent border-2 border-[hsl(var(--ink))] font-serif-en text-base focus:outline-none focus:border-[hsl(var(--gold))]"
          />
        </label>

        {/* 密码 */}
        <label className="block mb-6">
          <span className="text-xs tracking-widest text-[hsl(var(--ink-faded))] font-serif-en">
            密码
          </span>
          <input
            ref={passwordRef}
            type="password"
            placeholder="••••••"
            className="mt-1.5 w-full px-4 py-3 rounded-sm bg-transparent border-2 border-[hsl(var(--ink))] font-serif-en text-base focus:outline-none focus:border-[hsl(var(--gold))]"
          />
          <p className="mt-1.5 text-[11px] text-[hsl(var(--ink-faded))] font-hand">
            首次登入即自动注册 · 密码至少 6 位
          </p>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-sm font-serif-en tracking-widest text-base transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            background: "hsl(var(--ink))",
            color: "hsl(var(--gold-bright))",
            border: "1.5px solid hsl(var(--gold))",
            boxShadow: "0 4px 0 hsl(var(--ink-soft)), 0 0 18px hsl(var(--gold)/0.35)",
          }}
        >
          {loading ? "推开中…" : "登 入 高 塔"}
        </button>

        <p className="text-center font-hand text-xs text-[hsl(var(--ink-faded))] mt-4">
          首次到访即自动注册 · 一切将被温柔记得
        </p>
      </form>
    </div>
  );
};

export default Login;
