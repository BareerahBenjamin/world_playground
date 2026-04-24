import { useMemo, useState } from "react";
import { RECORDS } from "@/data/world";
import { useUserRecords } from "@/data/recordStore";
import { IconScroll, IconStarFour } from "@/components/HandIcon";
import { ScrollView, ChapterView, WeaveView } from "./Chronicle";

type Tab = "scroll" | "chapter" | "weave";

export default function Records() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("scroll");
  const userRecs = useUserRecords();
  const allRecords = useMemo(() => [...userRecs, ...RECORDS], [userRecs]);

  const lastRecord = allRecords[0];

  return (
    <article className="max-w-5xl mx-auto px-5 md:px-10 py-8">
      {/* Stats bar */}
      <div className="ink-card p-4 mb-6 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">足迹总数</p>
            <p className="font-serif-en text-2xl">{allRecords.length}</p>
          </div>
          <div className="w-px h-8 bg-foreground/20" />
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">最近一笔</p>
            <p className="font-hand text-sm">
              {lastRecord ? `${lastRecord.date} · ${lastRecord.place}` : "—"}
            </p>
          </div>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 px-4 py-2 border-2 border-foreground rounded-sm font-hand text-sm transition-colors hover:bg-foreground hover:text-background"
        >
          <IconScroll size={16} />
          {open ? "收起编年史" : "生成编年史"}
        </button>
      </div>

      {/* Empty state */}
      {!open && allRecords.length === 0 && (
        <div className="dashed-frame p-10 text-center">
          <IconStarFour size={24} className="mx-auto mb-3 text-muted-foreground" />
          <p className="font-hand text-muted-foreground">还没有足迹。完成第一个副本后，故事就开始了。</p>
        </div>
      )}

      {/* Chronicle inline panel */}
      {open && (
        <div className="mt-2">
          <header className="flex items-end justify-between mb-6 flex-wrap gap-3">
            <div>
              <p className="font-hand text-base text-muted-foreground">Chronicle</p>
              <h2 className="text-3xl md:text-4xl font-serif-en">编年史 · 你的故事</h2>
              <p className="text-sm text-muted-foreground mt-1">
                零散的足迹与心情，正在被悄悄串成一段叙事。
              </p>
            </div>
            <nav className="flex border-2 border-foreground rounded-sm overflow-hidden text-xs">
              {([
                { k: "scroll",  label: "时间卷轴" },
                { k: "chapter", label: "主题篇章" },
                { k: "weave",   label: "数据织锦" },
              ] as const).map((t) => (
                <button
                  key={t.k}
                  onClick={() => setTab(t.k)}
                  className={`px-3 py-1.5 border-r-2 border-foreground last:border-r-0 transition-colors ${
                    tab === t.k ? "bg-foreground text-background" : "hover:bg-secondary"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </nav>
          </header>

          {tab === "scroll"  && <ScrollView  records={allRecords} />}
          {tab === "chapter" && <ChapterView records={allRecords} />}
          {tab === "weave"   && <WeaveView   records={allRecords} />}
        </div>
      )}
    </article>
  );
}
