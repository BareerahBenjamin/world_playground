import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORY_META, RECORDS, type JourneyRecord } from "@/data/world";
import { useUserRecords } from "@/data/recordStore";
import {
  CategoryIcon,
  IconArrowRight,
  IconMapPin,
  IconStarFour,
  WeatherIcon,
} from "@/components/HandIcon";

type Tab = "scroll" | "chapter" | "weave";

const Chronicle = () => {
  const [tab, setTab] = useState<Tab>("scroll");
  const userRecs = useUserRecords();
  const allRecords = useMemo(() => [...userRecs, ...RECORDS], [userRecs]);

  return (
    <article className="max-w-5xl mx-auto px-5 md:px-10 py-8">
      <header className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <p className="font-hand text-base text-muted-foreground">Chronicle</p>
          <h2 className="text-3xl md:text-4xl font-serif-en">编年史 · 你的故事</h2>
          <p className="text-sm text-muted-foreground mt-1">
            零散的足迹与心情，正在被悄悄串成一段叙事。
          </p>
        </div>
        <nav className="flex border-2 border-foreground rounded-sm overflow-hidden text-xs">
          {[
            { k: "scroll", label: "时间卷轴" },
            { k: "chapter", label: "主题篇章" },
            { k: "weave", label: "数据织锦" },
          ].map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k as Tab)}
              className={`px-3 py-1.5 border-r-2 border-foreground last:border-r-0 transition-colors ${
                tab === t.k
                  ? "bg-foreground text-background"
                  : "hover:bg-secondary"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      {tab === "scroll" && <ScrollView records={allRecords} />}
      {tab === "chapter" && <ChapterView records={allRecords} />}
      {tab === "weave" && <WeaveView records={allRecords} />}
    </article>
  );
};

export const ScrollView = ({ records }: { records: JourneyRecord[] }) => (
  <div className="relative">
    <div className="absolute left-3 md:left-4 top-2 bottom-2 w-px bg-foreground/30" />
    <div className="space-y-5">
      {records.map((r, i) => {
        const m = r.category ? CATEGORY_META[r.category] : null;
        return (
          <div key={r.id} className="relative pl-10 md:pl-12">
            <span
              className="absolute left-1.5 md:left-2.5 top-3 w-3 h-3 rounded-full border-2 border-foreground"
              style={{ background: m?.color ?? "hsl(var(--ink))" }}
            />
            <div className="ink-card p-5">
              <p className="font-hand text-xs text-muted-foreground mb-1 inline-flex items-center gap-1.5">
                {r.date}
                <span className="text-foreground/30">·</span>
                <WeatherIcon symbol={r.weather} size={11} />
                <span className="text-foreground/30">·</span>
                <IconMapPin size={11} /> {r.place}
              </p>
              <p className="text-sm leading-relaxed text-foreground/90 mb-3">
                {r.text}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {r.tags.map((t) => (
                  <span key={t} className="ink-tag">#{t}</span>
                ))}
              </div>
              <p className="font-hand text-sm border-t border-dashed border-foreground/30 pt-2">
                ↳ {r.echo}
              </p>
            </div>
            {i === 1 && (
              <div className="ml-2 mt-3 dashed-frame p-3 bg-accent/20">
                <p className="font-hand text-xs text-muted-foreground inline-flex items-center gap-1">
                  <IconStarFour size={11} /> 里程碑 · {r.date}
                </p>
                <p className="font-serif-en text-base mt-1">勇气突破</p>
                <p className="text-xs text-foreground/80">
                  这是你这个月第 3 次主动开口。
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

export const ChapterView = ({ records }: { records: JourneyRecord[] }) => {
  const groups = Object.entries(CATEGORY_META).map(([k, m]) => ({
    key: k as keyof typeof CATEGORY_META,
    meta: m,
    items: records.filter((r) => r.category === k),
  }));

  return (
    <div className="grid md:grid-cols-2 gap-5">
      {groups.map((g) => (
        <section key={g.key} className="ink-card p-5">
          <p className="font-hand text-sm inline-flex items-center gap-1.5" style={{ color: g.meta.color }}>
            <CategoryIcon category={g.key} size={13} />
            篇章 · {g.meta.label}
          </p>
          <h3 className="font-serif-en text-xl mt-1 mb-3">
            {g.items.length} 笔印记
          </h3>
          <div className="space-y-3">
            {g.items.length === 0 && (
              <p className="text-sm text-muted-foreground italic">
                这一卷还是空白。下一次副本可以朝这里走。
              </p>
            )}
            {g.items.map((r) => (
              <div
                key={r.id}
                className="border-l-2 pl-3"
                style={{ borderColor: g.meta.color }}
              >
                <p className="font-hand text-xs text-muted-foreground">
                  {r.date} · {r.place}
                </p>
                <p className="text-sm text-foreground/85 leading-relaxed line-clamp-2">
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="ink-card p-6 md:col-span-2 bg-secondary/40">
        <p className="font-hand text-sm text-muted-foreground mb-2 inline-flex items-center gap-1.5">
          <IconStarFour size={12} /> AI 编年史 · 月度叙事
        </p>
        <h3 className="font-serif-en text-xl mb-3">四月：你在练习"开口"</h3>
        <p className="text-sm leading-relaxed text-foreground/85">
          这个月你给自己接了 4 次副本，3 次和"说"有关：
          一次在周会上讲想法，一次在拳馆里打出像样的拳，一次给妈妈打了一个长电话。
          你也允许自己有一次"什么都不做就是累"——
          这是一个被你接住的脆弱时刻，比成就更值得记一笔。
        </p>
      </section>
    </div>
  );
};

export const WeaveView = ({ records }: { records: JourneyRecord[] }) => {
  const counts = Object.entries(CATEGORY_META).map(([k, m]) => ({
    key: k as keyof typeof CATEGORY_META,
    meta: m,
    n: records.filter((r) => r.category === k).length,
  }));
  const max = Math.max(...counts.map((c) => c.n), 1);

  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="ink-card p-6">
        <h3 className="font-serif-en text-xl mb-4">心境分布</h3>
        <div className="space-y-3">
          {counts.map((c) => (
            <div key={c.meta.label}>
              <div className="flex justify-between text-xs mb-1">
                <span
                  className="font-hand inline-flex items-center gap-1.5"
                  style={{ color: c.meta.color }}
                >
                  <CategoryIcon category={c.key} size={12} />
                  {c.meta.label}
                </span>
                <span className="text-muted-foreground">{c.n} 笔</span>
              </div>
              <div className="h-2 border border-foreground bg-secondary rounded-sm overflow-hidden">
                <div
                  className="h-full"
                  style={{ width: `${(c.n / max) * 100}%`, background: c.meta.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ink-card p-6">
        <h3 className="font-serif-en text-xl mb-4">本月情绪</h3>
        <div className="grid grid-cols-5 gap-2 text-center text-xs">
          {(["轻盈", "平静", "明亮", "沉重", "混沌"] as const).map((f) => {
            const n = records.filter((r) => r.feeling === f).length;
            return (
              <div key={f} className="dashed-frame p-3">
                <p className="font-hand text-base">{n}</p>
                <p className="text-muted-foreground">{f}</p>
              </div>
            );
          })}
        </div>
        <p className="font-hand text-xs text-muted-foreground mt-4 leading-relaxed">
          ↳ 这个月你"沉重"和"明亮"几乎一样多。允许两者并存，是这个月的练习。
        </p>
      </div>

      <div className="ink-card p-6 md:col-span-2">
        <h3 className="font-serif-en text-xl mb-4">出现过的关键词</h3>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(records.flatMap((r) => r.tags))).map((t) => (
            <span key={t} className="ink-tag font-hand">
              #{t}
            </span>
          ))}
        </div>
        <Link
          to="/inner"
          className="inline-flex items-center gap-1 mt-5 font-hand text-sm hand-link"
        >
          去内心地形里看它们落在哪 <IconArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
};

export default Chronicle;
