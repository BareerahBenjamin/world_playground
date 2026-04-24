import { Link } from "react-router-dom";
import { CATEGORY_META, PLAYER, RECORDS, MAP_PLACES } from "@/data/world";
import { GOALS } from "@/data/goals";
import {
  PLAYER_TRAITS,
  TITLES,
  AVATAR_STAGES,
  CHARMS,
} from "@/data/gamification";
import {
  CategoryIcon,
  IconArrowRight,
  IconBook,
  IconCompass,
  IconFlame,
  IconKey,
  IconLeaf,
  IconLock,
  IconLotus,
  IconMapPin,
  IconMountain,
  IconQuill,
  IconSpark,
  IconStarFour,
  IconSunrise,
  WeatherIcon,
} from "@/components/HandIcon";

import { useNavigate } from "react-router-dom";

const playerName = localStorage.getItem("player_name") || PLAYER.name;

const CharmIcon = ({ id }: { id: string }) => {
  const map: Record<string, JSX.Element> = {
    "c-1": <IconLeaf size={22} />,
    "c-2": <IconFlame size={22} />,
    "c-3": <IconLotus size={22} />,
    "c-4": <IconQuill size={22} />,
  };
  return map[id] ?? <IconStarFour size={22} />;
};

const AchievementIcon = ({ id }: { id: string }) => {
  const map: Record<string, JSX.Element> = {
    "a-1": <IconSunrise size={22} />,
    "a-2": <IconKey size={22} />,
    "a-3": <IconLotus size={22} />,
    "a-4": <IconCompass size={22} />,
    "a-5": <IconBook size={22} />,
    "a-6": <IconMountain size={22} />,
  };
  return map[id] ?? <IconStarFour size={22} />;
};

const Profile = () => {
  const totalMilestones = GOALS.reduce((s, g) => s + g.milestones.length, 0);
  const doneMilestones = GOALS.reduce(
    (s, g) => s + g.milestones.filter((m) => m.done).length,
    0,
  );

  const nav = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("player_name");
    nav("/");  // 换成你的登录页路由
  };

  const categoryCounts = (
    Object.keys(CATEGORY_META) as (keyof typeof CATEGORY_META)[]
  ).map((k) => ({ key: k, count: RECORDS.filter((r) => r.category === k).length }));

  const currentStage = [...AVATAR_STAGES]
    .reverse()
    .find((s) => PLAYER.level >= s.lv) ?? AVATAR_STAGES[0];
  const nextStage = AVATAR_STAGES.find((s) => s.lv > PLAYER.level);
  const activeTitle = TITLES.find((t) => t.active);
  const equippedCharm = CHARMS.find((c) => c.equipped);

  const traitKeys: (keyof typeof PLAYER_TRAITS)[] = [
    "courage",
    "create",
    "flourish",
    "solitude",
  ];
  const radarPoints = traitKeys
    .map((k, i) => {
      const angle = (Math.PI * 2 * i) / 4 - Math.PI / 2;
      const r = (PLAYER_TRAITS[k] / 100) * 42;
      const x = 50 + r * Math.cos(angle);
      const y = 50 + r * Math.sin(angle);
      return `${x},${y}`;
    })
    .join(" ");
  const axisPoints = traitKeys.map((_, i) => {
    const angle = (Math.PI * 2 * i) / 4 - Math.PI / 2;
    return {
      x: 50 + 42 * Math.cos(angle),
      y: 50 + 42 * Math.sin(angle),
    };
  });

  const achievements = [
    { id: "a-1", name: "破晓初行", desc: "完成第一个副本", got: true },
    { id: "a-2", name: "勇气钥匙", desc: "完成 5 次勇气试炼", got: true },
    { id: "a-3", name: "静水深流", desc: "连续 7 天独处记录", got: true },
    { id: "a-4", name: "拓荒者", desc: "点亮 10 处足迹", got: false, progress: "8/10" },
    { id: "a-5", name: "织字者", desc: "累计 30 篇记录", got: false, progress: "6/30" },
    { id: "a-6", name: "火山苏醒", desc: "完成 1 个长期目标", got: false, progress: "0/1" },
  ];

  return (
    <article className="max-w-5xl mx-auto px-5 md:px-10 py-8">
      <header className="ink-card p-6 md:p-8 mb-8">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="font-hand text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            · 离开高塔 ·
          </button>
        </div>
        <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 items-center">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 rounded-sm border-2 border-foreground bg-accent flex items-center justify-center font-serif-en text-5xl ink-bloom">
              {currentStage.sigil}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 text-[10px] tracking-widest font-bold border border-foreground bg-card whitespace-nowrap">
                Lv.{PLAYER.level}
              </span>
            </div>
            <p className="font-hand text-xs text-muted-foreground mt-3">
              化身 · {currentStage.desc}
            </p>
          </div>

          <div className="min-w-0">
            <p className="font-hand text-sm text-muted-foreground">Player</p>
            <h2 className="text-2xl md:text-3xl font-serif-en">
              {playerName}
            </h2>
            {activeTitle && (
              <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 text-xs border-2 border-foreground bg-secondary rounded-sm">
                <IconStarFour size={11} /> {activeTitle.name}
              </span>
            )}
            <div className="mt-3">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                <span>XP</span>
                <span>
                  {PLAYER.xp} / {PLAYER.xpMax}
                  {nextStage && ` · 距离「${nextStage.desc}」 ${nextStage.lv - PLAYER.level} 级`}
                </span>
              </div>
              <div className="h-2 border border-foreground bg-secondary overflow-hidden rounded-sm">
                <div
                  className="h-full bg-accent"
                  style={{ width: `${(PLAYER.xp / PLAYER.xpMax) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="w-40 h-40 mx-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {[20, 30, 40].map((r) => (
                <polygon
                  key={r}
                  points={[0, 1, 2, 3]
                    .map((i) => {
                      const a = (Math.PI * 2 * i) / 4 - Math.PI / 2;
                      return `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`;
                    })
                    .join(" ")}
                  fill="none"
                  stroke="hsl(var(--ink) / 0.2)"
                  strokeWidth="0.4"
                />
              ))}
              {axisPoints.map((p, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={p.x}
                  y2={p.y}
                  stroke="hsl(var(--ink) / 0.25)"
                  strokeWidth="0.3"
                />
              ))}
              <polygon
                points={radarPoints}
                fill="hsl(var(--gold) / 0.35)"
                stroke="hsl(var(--gold))"
                strokeWidth="0.7"
              />
              {traitKeys.map((k, i) => {
                const a = (Math.PI * 2 * i) / 4 - Math.PI / 2;
                const x = 50 + 48 * Math.cos(a);
                const y = 50 + 48 * Math.sin(a);
                return (
                  <text
                    key={k}
                    x={x}
                    y={y}
                    fontSize="6"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={CATEGORY_META[k].color}
                    style={{ fontFamily: "Caveat, cursive" }}
                  >
                    {CATEGORY_META[k].label[0]} {PLAYER_TRAITS[k]}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>
      </header>

      {/* 装备护符 */}
      <h3 className="font-serif-en text-lg mb-4 flex items-center gap-3">
        心境护符 · 装备一枚
        <span className="flex-1 h-px bg-secondary" />
        {equippedCharm && (
          <span className="font-hand text-xs text-muted-foreground inline-flex items-center gap-1">
            当前： <CharmIcon id={equippedCharm.id} /> {equippedCharm.name}
          </span>
        )}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {CHARMS.map((c) => (
          <div
            key={c.id}
            className={`ink-card p-4 ${!c.owned ? "opacity-50" : ""} ${
              c.equipped ? "ring-2 ring-[hsl(var(--gold))]" : ""
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-foreground">
                {c.owned ? <CharmIcon id={c.id} /> : <IconLock size={20} />}
              </span>
              <p className="font-serif-en text-base">{c.name}</p>
            </div>
            <p className="text-xs text-foreground/75 leading-snug mb-1">
              {c.desc}
            </p>
            <p className="font-hand text-[11px] text-[hsl(var(--gold))] inline-flex items-center gap-1">
              <IconStarFour size={10} /> {c.effect}
            </p>
            {c.equipped && (
              <p className="font-hand text-[10px] text-muted-foreground mt-1">
                · 已装备 ·
              </p>
            )}
          </div>
        ))}
      </div>

      {/* 称号 */}
      <h3 className="font-serif-en text-lg mb-4 flex items-center gap-3">
        称号收藏
        <span className="flex-1 h-px bg-secondary" />
      </h3>
      <div className="flex flex-wrap gap-2 mb-10">
        {TITLES.map((t) => (
          <span
            key={t.id}
            className={`px-3 py-1 text-xs border-2 rounded-sm inline-flex items-center gap-1.5 ${
              t.unlocked
                ? t.active
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground bg-card"
                : "border-foreground/30 text-muted-foreground bg-secondary/40"
            }`}
            title={t.desc}
          >
            {t.unlocked ? <IconStarFour size={11} /> : <IconLock size={11} />}
            {t.name}
            <span className="font-hand text-[10px] opacity-70">
              {t.desc}
            </span>
          </span>
        ))}
      </div>

      {/* 数据织锦 */}
      <h3 className="font-serif-en text-lg mb-4 flex items-center gap-3">
        数据织锦
        <span className="flex-1 h-px bg-secondary" />
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        <div className="dashed-frame p-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">足迹</p>
          <p className="font-hand text-xl mt-1">{MAP_PLACES.length} 处</p>
        </div>
        <div className="dashed-frame p-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">记录</p>
          <p className="font-hand text-xl mt-1">{RECORDS.length} 笔</p>
        </div>
        <div className="dashed-frame p-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">目标</p>
          <p className="font-hand text-xl mt-1">{GOALS.length} 个</p>
        </div>
        <div className="dashed-frame p-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">里程碑</p>
          <p className="font-hand text-xl mt-1">
            {doneMilestones}/{totalMilestones}
          </p>
        </div>
      </div>

      {/* 四类印记分布 */}
      <h3 className="font-serif-en text-lg mb-4 flex items-center gap-3">
        四类印记分布
        <span className="flex-1 h-px bg-secondary" />
        <Link
          to="/codex"
          className="font-hand text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 hand-link"
        >
          翻开图鉴 <IconArrowRight size={12} />
        </Link>
      </h3>
      <div className="grid md:grid-cols-4 gap-3 mb-10">
        {categoryCounts.map(({ key, count }) => {
          const m = CATEGORY_META[key];
          const max = Math.max(...categoryCounts.map((c) => c.count), 1);
          return (
            <div
              key={key}
              className="ink-card p-4"
              style={{ borderColor: m.color }}
            >
              <p
                className="font-hand text-sm inline-flex items-center gap-1.5"
                style={{ color: m.color }}
              >
                <CategoryIcon category={key} size={13} />
                {m.label}
              </p>
              <div className="h-1.5 bg-secondary rounded-sm overflow-hidden mt-2 mb-2 border border-foreground/30">
                <div
                  className="h-full transition-all duration-700"
                  style={{
                    width: `${(count / max) * 100}%`,
                    background: m.color,
                  }}
                />
              </div>
              <p className="font-hand text-xs text-muted-foreground">
                {count} 笔印记
              </p>
            </div>
          );
        })}
      </div>

      {/* 成就 */}
      <h3 className="font-serif-en text-lg mb-4 flex items-center gap-3">
        成就 · 徽章
        <span className="flex-1 h-px bg-secondary" />
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {achievements.map((a) => (
          <div
            key={a.id}
            className={`ink-card p-4 flex items-center gap-3 ${
              a.got ? "" : "opacity-55"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-sm border-2 border-foreground flex items-center justify-center flex-shrink-0 ${
                a.got ? "bg-accent" : "bg-secondary"
              }`}
            >
              {a.got ? <AchievementIcon id={a.id} /> : <IconLock size={20} />}
            </div>
            <div className="min-w-0">
              <p className="font-serif-en text-base leading-tight">{a.name}</p>
              <p className="text-xs text-muted-foreground leading-snug mt-0.5">
                {a.desc}
              </p>
              {!a.got && a.progress && (
                <p className="font-hand text-[11px] text-muted-foreground mt-1">
                  进度 {a.progress}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 我的记录 */}
      <h3 className="font-serif-en text-lg mb-4 flex items-center gap-3">
        我的记录
        <span className="flex-1 h-px bg-secondary" />
        <Link
          to="/chronicle"
          className="font-hand text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 hand-link"
        >
          翻开编年史 <IconArrowRight size={12} />
        </Link>
      </h3>
      <div className="grid md:grid-cols-2 gap-3">
        {RECORDS.map((r) => {
          const m = r.category ? CATEGORY_META[r.category] : null;
          return (
            <div key={r.id} className="ink-card p-4">
              <div className="flex items-baseline justify-between mb-1">
                <p className="font-hand text-xs text-muted-foreground inline-flex items-center gap-1.5">
                  {r.date}
                  <span className="text-foreground/30">·</span>
                  <WeatherIcon symbol={r.weather} size={11} />
                  <span className="text-foreground/30">·</span>
                  <IconMapPin size={11} /> {r.place}
                </p>
                {m && r.category && (
                  <span style={{ color: m.color }}>
                    <CategoryIcon category={r.category} size={12} />
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground/85 leading-relaxed line-clamp-2 mb-2">
                {r.text}
              </p>
              <p className="font-hand text-xs border-t border-dashed border-foreground/30 pt-2 text-muted-foreground">
                ↳ {r.echo}
              </p>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default Profile;
