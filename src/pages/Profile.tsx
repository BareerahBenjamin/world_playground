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
import { logout, getPlayerName } from "@/lib/auth";

// 使用 auth 模块实时读取用户名
const playerName = getPlayerName() || PLAYER.name;

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

  // 修复：退出后跳 /login，不经过 /（避免登录循环）
  const handleLogout = () => {
    logout();
    nav("/login", { replace: true });
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
                const angle = (Math.PI * 2 * i) / 4 - Math.PI / 2;
                const lx = 50 + 48 * Math.cos(angle);
                const ly = 50 + 48 * Math.sin(angle);
                const labels: Record<string, string> = {
                  courage: "勇气",
                  create: "创造",
                  flourish: "丰容",
                  solitude: "独处",
                };
                return (
                  <text
                    key={k}
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="5"
                    fill="hsl(var(--ink-faded))"
                  >
                    {labels[k]}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>
      </header>

      {/* 护符 */}
      {equippedCharm && (
        <section className="ink-card p-5 mb-6">
          <h3 className="font-serif-en text-lg mb-3 flex items-center gap-3">
            装备护符
            <span className="flex-1 h-px bg-secondary" />
            <Link to="/codex" className="font-hand text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              图鉴 <IconArrowRight size={11} />
            </Link>
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-3xl">{equippedCharm.emoji}</span>
            <div>
              <p className="font-serif-en">{equippedCharm.name}</p>
              <p className="font-hand text-sm text-muted-foreground">{equippedCharm.desc}</p>
              <p className="text-xs text-muted-foreground mt-1">{equippedCharm.effect}</p>
            </div>
          </div>
        </section>
      )}

      {/* 成就 */}
      <section className="mb-8">
        <h3 className="font-serif-en text-lg mb-4 flex items-center gap-3">
          成就印记
          <span className="flex-1 h-px bg-secondary" />
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {achievements.map((a) => (
            <div
              key={a.id}
              className={`ink-card p-4 flex items-start gap-3 ${!a.got ? "opacity-50" : ""}`}
            >
              <div className="w-9 h-9 rounded-sm border-2 border-foreground flex items-center justify-center flex-shrink-0">
                {a.got ? <AchievementIcon id={a.id} /> : <IconLock size={18} />}
              </div>
              <div className="min-w-0">
                <p className="font-serif-en text-sm leading-snug">{a.name}</p>
                <p className="font-hand text-xs text-muted-foreground mt-0.5">{a.desc}</p>
                {"progress" in a && (
                  <p className="font-serif-en text-xs text-muted-foreground mt-1">{(a as any).progress}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 分类足迹 */}
      <section className="mb-8">
        <h3 className="font-serif-en text-lg mb-4 flex items-center gap-3">
          各地形足迹
          <span className="flex-1 h-px bg-secondary" />
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categoryCounts.map(({ key, count }) => {
            const m = CATEGORY_META[key];
            return (
              <Link
                key={key}
                to={`/map?surface=inner&cat=${key}`}
                className="ink-card p-4 text-center hover:-translate-y-0.5 transition-transform"
                style={{ borderColor: m.color }}
              >
                <p className="text-2xl mb-1">{m.emoji}</p>
                <p className="font-hand text-xs" style={{ color: m.color }}>{m.label}</p>
                <p className="font-serif-en text-xl mt-1">{count}</p>
                <p className="text-[10px] text-muted-foreground">次足迹</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 地点探索 */}
      <section className="mb-8">
        <h3 className="font-serif-en text-lg mb-4 flex items-center gap-3">
          探索版图
          <span className="flex-1 h-px bg-secondary" />
          <Link to="/map" className="font-hand text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            地图 <IconArrowRight size={11} />
          </Link>
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {MAP_PLACES.map((p) => (
            <div key={p.name} className="ink-card p-4 flex items-center gap-3">
              <IconMapPin size={18} className="flex-shrink-0 text-muted-foreground" />
              <div>
                <p className="font-serif-en text-sm">{p.name}</p>
                <p className="font-hand text-xs text-muted-foreground">{p.count} 次到访</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

export default Profile;
