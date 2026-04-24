import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CATEGORY_META, QUESTS, RECORDS, PLAYER } from "@/data/world";
import { SOCIAL_QUESTS } from "@/data/goals";
import { RARITY_META } from "@/data/gamification";
import { toast } from "sonner";
import StreakLanternCard from "@/components/StreakLanternCard";
import WeeklyBossCard from "@/components/WeeklyBossCard";
import {
  CategoryIcon,
  IconArrowRight,
  IconClock,
  IconFlame,
  IconMap,
  IconMapPin,
  IconSpark,
  IconStarFour,
  IconSword,
  InkAvatar,
  WeatherIcon,
} from "@/components/HandIcon";

const Today = () => {
  const navigate = useNavigate();
  
  const replayIntro = () => {
    sessionStorage.removeItem("seenIntro");
    navigate("/intro/1");
  };
  const main = QUESTS[1];
  const sides = [QUESTS[0], QUESTS[2], QUESTS[4]];
  const recent = RECORDS.slice(0, 2);
  const today = new Date().toLocaleDateString("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const mainRarity = RARITY_META[main.rarity];

  return (
    <article className="max-w-4xl mx-auto px-5 md:px-10 py-10 md:py-14">
      {/* 回到开头 · 重温序章动画按钮 */}
      <div className="mb-5 flex justify-end">
        <button
          onClick={replayIntro}
          className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-sm font-serif-en text-xs tracking-[0.2em] transition-transform hover:-translate-y-0.5 active:translate-y-0"
          style={{
            background: "hsl(var(--ink))",
            color: "hsl(var(--gold-bright))",
            border: "1.5px solid hsl(var(--gold) / 0.7)",
            boxShadow:
              "0 3px 0 hsl(var(--ink-soft)), 0 0 16px hsl(var(--gold) / 0.35), inset 0 0 8px hsl(var(--gold) / 0.15)",
          }}
          aria-label="重温序章动画"
        >
          <span className="relative inline-block w-3 h-3">
            <span
              className="absolute inset-0 rounded-full animate-pulse"
              style={{
                background: "hsl(var(--gold-bright))",
                boxShadow: "0 0 8px hsl(var(--gold-bright))",
              }}
            />
          </span>
          ✦ 回到开头 · 重温序章
        </button>
      </div>
      {/* 地图快捷入口 */}
      <Link
        to="/map"
        className="flex items-center justify-between px-4 py-3 mb-6 dashed-frame hover:bg-secondary transition-colors"
      >
        <span className="font-hand text-sm inline-flex items-center gap-2">
          <IconMap size={15} /> 去地图 · 查看你的版图
        </span>
        <IconArrowRight size={13} className="text-muted-foreground" />
      </Link>

      <header className="flex items-start justify-between mb-8">
        <div>
          <p className="font-hand text-base text-muted-foreground">{today}</p>
          <h2 className="text-3xl md:text-4xl font-serif-en mt-1">
            Today's Playground
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            等级 {PLAYER.level} · 已点亮 {PLAYER.placesLit} 处 · 记下{" "}
            {PLAYER.records} 笔
          </p>
        </div>
        <span className="stamp">每日一封 · 等你拆开</span>
      </header>

      {/* 主线副本 */}
      <section
        className="ink-card p-6 md:p-8 mb-8 relative"
        style={{
          boxShadow: `4px 4px 0 hsl(var(--foreground)), 0 0 32px ${mainRarity.glow}`,
        }}
      >
        <span className="absolute -top-3 left-6 bg-accent border border-foreground px-3 py-0.5 text-[11px] tracking-widest font-bold">
          今日副本
        </span>
        <span
          className="absolute -top-3 right-6 px-2 py-0.5 text-[10px] tracking-widest font-bold border-2 bg-card inline-flex items-center gap-1"
          style={{ borderColor: mainRarity.color, color: mainRarity.color }}
        >
          <IconStarFour size={10} /> {mainRarity.label} · ×{mainRarity.xpMul} XP
        </span>
        <p
          className="font-hand text-sm flex items-center gap-2 mb-2 mt-2"
          style={{ color: CATEGORY_META[main.category].color }}
        >
          <span className="inline-block w-5 h-px bg-current" />
          <CategoryIcon category={main.category} size={14} />
          {CATEGORY_META[main.category].label} ·{" "}
          {CATEGORY_META[main.category].hand}
        </p>
        <h3 className="font-serif-en text-2xl mb-3">{main.title}</h3>
        <p className="text-[0.95rem] leading-relaxed text-foreground/80 border-l-[3px] border-secondary pl-4 mb-6">
          {main.desc}
        </p>

        <div className="flex gap-6 mb-6 text-sm flex-wrap">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              难度
            </p>
            <p className="font-hand text-base text-[hsl(var(--rust))]">
              {main.difficulty}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              经验
            </p>
            <p
              className="font-hand text-base"
              style={{ color: "hsl(var(--gold))" }}
            >
              +{Math.round(main.xp * mainRarity.xpMul)} XP
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              掉落
            </p>
            <p className="font-hand text-base inline-flex items-center gap-1.5">
              <IconFlame size={14} className="text-[hsl(var(--rust))]" />
              火之碎片 ×1
              <span className="text-foreground/30">·</span>
              <IconSword size={14} />
              BOSS 伤害 +12
            </p>
          </div>
        </div>

        <div className="dashed-frame bg-secondary/40 p-4 mb-6 relative">
          <span className="absolute -top-2.5 left-3 bg-secondary px-2 font-hand text-xs text-muted-foreground">
            来自 AI 的小提示
          </span>
          <p className="text-sm italic text-foreground/80 leading-relaxed">
            不必完美。你最近写过两次"想说但没说"——今天可以是那个"说"。
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <Button
            asChild
            className="bg-foreground text-background hover:bg-ink-soft rounded-sm"
          >
            <Link to={`/quest/${main.id}`}>接受副本</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-2 border-foreground rounded-sm"
          >
            <Link to={`/quest/${main.id}/record`}>已经做了 · 直接记录</Link>
          </Button>
          <Button
            variant="ghost"
            className="border border-dashed border-foreground/40 rounded-sm text-muted-foreground"
          >
            换一个
          </Button>
        </div>
      </section>

      {/* 支线 */}
      <h3 className="font-serif-en text-lg mb-4 flex items-center gap-3">
        支线 · 三选一
        <span className="flex-1 h-px bg-secondary" />
      </h3>
      <div className="grid md:grid-cols-3 gap-4 mb-12">
        {sides.map((q) => {
          const m = CATEGORY_META[q.category];
          const r = RARITY_META[q.rarity];
          return (
            <Link
              key={q.id}
              to={`/quest/${q.id}`}
              className="ink-card p-5 hover:-translate-y-0.5 transition-transform relative"
              style={{ boxShadow: `4px 4px 0 hsl(var(--foreground)), 0 0 18px ${r.glow}` }}
            >
              <div className="flex items-center justify-between mb-2">
                <p
                  className="font-hand text-xs inline-flex items-center gap-1.5"
                  style={{ color: m.color }}
                >
                  <CategoryIcon category={q.category} size={12} />
                  {m.label}
                </p>
                <span
                  className="text-[10px] font-bold tracking-widest px-1.5 py-0.5 border rounded-sm inline-flex items-center gap-1"
                  style={{ borderColor: r.color, color: r.color }}
                >
                  <IconStarFour size={9} /> {r.label}
                </span>
              </div>
              <h4 className="font-serif-en text-lg mb-2">{q.title}</h4>
              <p className="text-xs text-foreground/70 leading-relaxed line-clamp-3">
                {q.desc}
              </p>
              <p className="mt-3 font-hand text-xs text-muted-foreground">
                {q.difficulty} · +{Math.round(q.xp * r.xpMul)} XP
              </p>
            </Link>
          );
        })}
      </div>

      {/* 小型社交副本 */}
      <h3 className="font-serif-en text-lg mb-4 flex items-center gap-3">
        要不要顺便加入一件小事
        <span className="flex-1 h-px bg-secondary" />
        <Link
          to="/goals"
          className="font-hand text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 hand-link"
        >
          找长期搭子 <IconArrowRight size={12} />
        </Link>
      </h3>
      <div className="grid md:grid-cols-3 gap-4 mb-12">
        {SOCIAL_QUESTS.map((sq) => {
          const m = CATEGORY_META[sq.category];
          return (
            <div key={sq.id} className="ink-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <InkAvatar label={sq.author.name} size={28} />
                <p className="font-hand text-xs inline-flex items-center gap-1">
                  {sq.author.name} 想{" "}
                  <span style={{ color: m.color }}>
                    <CategoryIcon category={sq.category} size={12} />
                  </span>
                </p>
              </div>
              <h4 className="font-serif-en text-base leading-snug mb-1">
                {sq.title}
              </h4>
              <p className="text-xs text-foreground/70 leading-relaxed line-clamp-2 mb-2">
                {sq.desc}
              </p>
              <p className="font-hand text-[11px] text-muted-foreground mb-3 inline-flex items-center gap-1.5">
                <IconMapPin size={11} /> {sq.place}
                <span className="text-foreground/30">·</span>
                <IconClock size={11} /> {sq.date}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-1.5 items-center">
                  {sq.joiners.slice(0, 4).map((p, i) => (
                    <InkAvatar
                      key={i}
                      label={p.name}
                      size={20}
                      tone="ink"
                    />
                  ))}
                  <span className="ml-2 font-hand text-[11px] text-muted-foreground self-center">
                    {sq.joiners.length}/{sq.capacity}
                  </span>
                </div>
                <button
                  onClick={() => toast("我也去！已加入。")}
                  className="text-xs font-hand px-2 py-1 border border-foreground rounded-sm hover:bg-foreground hover:text-background transition-colors inline-flex items-center gap-1"
                >
                  <IconSpark size={11} /> 加入
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 近期足迹预览 */}
      <h3 className="font-serif-en text-lg mb-4 flex items-center gap-3">
        最近的足迹
        <span className="flex-1 h-px bg-secondary" />
        <Link
          to="/records"
          className="font-hand text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 hand-link"
        >
          翻开编年史 <IconArrowRight size={12} />
        </Link>
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {recent.map((r) => (
          <div key={r.id} className="ink-card p-5">
            <p className="font-hand text-xs text-muted-foreground mb-1 inline-flex items-center gap-1.5">
              {r.date}
              <span className="text-foreground/30">·</span>
              <WeatherIcon symbol={r.weather} size={11} />
              <span className="text-foreground/30">·</span>
              <IconMapPin size={11} /> {r.place}
            </p>
            <p className="text-sm text-foreground/85 leading-relaxed line-clamp-2 mb-2">
              {r.text}
            </p>
            <p className="font-hand text-sm border-t border-dashed border-foreground/30 pt-2">
              ↳ {r.echo}
            </p>
          </div>
        ))}
      </div>

      {/* 连击 + 心魔 */}
      <h3 className="font-serif-en text-lg mt-10 mb-4 flex items-center gap-3">
        旅途的呼吸
        <span className="flex-1 h-px bg-secondary" />
        <span className="font-hand text-xs text-muted-foreground tracking-wider whitespace-nowrap">
          节奏 · 阴影
        </span>
      </h3>
      <div className="grid md:grid-cols-2 gap-4 items-stretch">
        <StreakLanternCard />
        <WeeklyBossCard />
      </div>
    </article>
  );
};

export default Today;
