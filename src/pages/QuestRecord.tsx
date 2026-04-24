import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CATEGORY_META, QUESTS, type JourneyRecord } from "@/data/world";
import { saveUserRecord } from "@/data/recordStore";
import { toast } from "sonner";
import StarTrailCelebration from "@/components/StarTrailCelebration";
import {
  CategoryIcon,
  IconCamera,
  IconMap,
  IconMapPin,
  IconMic,
  IconScroll,
  IconSpark,
  IconStarFour,
  IconTag,
} from "@/components/HandIcon";

const FEELINGS = ["轻盈", "平静", "沉重", "混沌", "明亮"] as const;
type Feeling = (typeof FEELINGS)[number];

const QuestRecord = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const quest = QUESTS.find((q) => q.id === id) ?? QUESTS[0];
  const m = CATEGORY_META[quest.category];

  const [text, setText] = useState("");
  const [place, setPlace] = useState("");
  const [feeling, setFeeling] = useState<Feeling>("平静");
  const [step, setStep] = useState<"write" | "echo">("write");
  const [celebrating, setCelebrating] = useState(false);

  const mockEcho = (t = text) => {
    if (!t.trim()) return "听到了，哪怕只是一个字，也算一笔。";
    const lower = t.toLowerCase();
    if (lower.includes("累") || lower.includes("难")) return "听到了。累也是今天的一部分。";
    if (lower.includes("说") || lower.includes("讲")) return "今天你扩张了自己的领地。";
    if (lower.includes("画") || lower.includes("写")) return "丑也是一种认真。";
    return `这一笔，会落在你的「${m.terrain}」上。`;
  };

  const placeHash = (s: string) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    const x = 15 + (Math.abs(h) % 70);
    const y = 15 + (Math.abs(h >> 8) % 60);
    return { x, y };
  };
  const litPos = placeHash(place || quest.title);
  const innerPos = placeHash(quest.id + feeling);

  const submit = (overrideText?: string) => {
    const finalText = overrideText ?? text;
    if (!finalText.trim()) {
      toast("写一个字也好，或者点跳过。");
      return;
    }
    const weatherList = ["☀️", "⛅", "🌧️", "🌙"] as const;
    const newRec: JourneyRecord = {
      id: `u-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      weather: weatherList[new Date().getHours() >= 19 ? 3 : 0],
      questId: quest.id,
      category: quest.category,
      place: place || "未命名地点",
      text: finalText,
      tags: [CATEGORY_META[quest.category].label, quest.title],
      feeling,
      echo: mockEcho(finalText),
      mapPos: place ? { x: litPos.x, y: litPos.y } : undefined,
      innerPos: { x: innerPos.x, y: innerPos.y },
    };
    saveUserRecord(newRec);
    setCelebrating(true);
  };

  if (step === "echo") {
    const echo = mockEcho();
    return (
      <article className="max-w-2xl mx-auto px-5 md:px-10 py-10">
        <section className="ink-card p-8 text-center">
          <p className="font-hand text-sm text-muted-foreground inline-flex items-center gap-1.5">
            <IconStarFour size={12} /> 此刻的回声
          </p>
          <h2 className="font-serif-en text-3xl mt-3 mb-6 ink-bloom">{echo}</h2>

          <div className="dashed-frame bg-secondary/40 p-5 text-left text-sm leading-relaxed mb-6">
            <p className="font-hand text-xs text-muted-foreground mb-2">
              这一笔将同时落在三处：
            </p>
            <ul className="space-y-1.5 text-foreground/85">
              <li className="inline-flex items-center gap-2">
                <IconMapPin size={13} /> 外部世界 · {place || "未命名地点"} 留下了 1 处足迹
              </li>
              <li className="inline-flex items-center gap-2" style={{ color: m.color }}>
                <CategoryIcon category={quest.category} size={13} />
                <span className="text-foreground/85">
                  内心地形 ·「{m.terrain}」长出了一个新的光点
                </span>
              </li>
              <li className="inline-flex items-center gap-2">
                <IconScroll size={13} /> 编年史 · 今日新增 1 条 · 心情：{feeling}
              </li>
            </ul>
          </div>

          <div className="dashed-frame p-4 mb-6 text-left">
            <p className="font-hand text-xs text-muted-foreground mb-2 inline-flex items-center gap-1.5">
              <IconStarFour size={11} /> AI 想再问你一个问题（可以不答）
            </p>
            <p className="text-sm text-foreground/85">
              如果把今天这件事写成一句话送给一个月后的自己，你会说什么？
            </p>
            <Textarea
              placeholder="（可写可不写）"
              className="mt-3 bg-card border-foreground/40"
              rows={2}
            />
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            <Button
              onClick={() =>
                navigate(
                  `/map?surface=inner&lit=${innerPos.x},${innerPos.y}&cat=${quest.category}`,
                )
              }
              className="bg-foreground text-background rounded-sm inline-flex items-center gap-1"
            >
              <IconSpark size={13} /> 去内心地图看光点亮起
            </Button>
            <Button
              onClick={() =>
                navigate(
                  `/map?surface=world&lit=${litPos.x},${litPos.y}&place=${encodeURIComponent(place || quest.title)}`,
                )
              }
              variant="outline"
              className="border-2 border-foreground rounded-sm inline-flex items-center gap-1"
            >
              <IconMap size={13} /> 去外部地图看光点亮起
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="ghost"
              className="font-hand text-muted-foreground"
            >
              先不看，回到今日
            </Button>
          </div>
        </section>
      </article>
    );
  }

  return (
    <article className="max-w-2xl mx-auto px-5 md:px-10 py-10">
      <StarTrailCelebration
        show={celebrating}
        subtitle={`「${quest.title}」· 落进了你的「${m.terrain}」`}
        onDone={() => {
          setCelebrating(false);
          setStep("echo");
        }}
      />
      <Link to={`/quest/${quest.id}`} className="font-hand text-sm text-muted-foreground hover:text-foreground hand-link">
        ← 回到副本
      </Link>

      <section className="ink-card p-6 md:p-8 mt-4 relative">
        <span
          className="absolute -top-3 left-6 border border-foreground px-3 py-0.5 text-[11px] tracking-widest font-bold"
          style={{ background: m.color, color: "hsl(var(--cream))" }}
        >
          归来 · 写下这一笔
        </span>

        <p className="font-hand text-sm text-muted-foreground mt-2 mb-1">
          副本 · {quest.title}
        </p>
        <h2 className="font-serif-en text-2xl mb-6">今天发生了什么？</h2>

        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="或者，此刻你想说什么？……或者，就写「不想写」"
          className="bg-card border-foreground/40 min-h-[140px] text-base leading-relaxed"
        />

        <div className="mt-5 grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
              在哪里发生
            </p>
            <Input
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="比如：滨江公园"
              className="bg-card border-foreground/40"
            />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
              此刻的感受
            </p>
            <div className="flex flex-wrap gap-1.5">
              {FEELINGS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFeeling(f)}
                  className={`px-2.5 py-1 text-xs border rounded-sm transition-colors ${
                    feeling === f
                      ? "bg-foreground text-background border-foreground"
                      : "border-foreground/40 hover:bg-secondary"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 dashed-frame p-3 text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
          <span className="font-hand">可附加：</span>
          <button className="ink-tag inline-flex items-center gap-1"><IconCamera size={12} /> 随手拍</button>
          <button className="ink-tag inline-flex items-center gap-1"><IconMic size={12} /> 一段语音</button>
          <button className="ink-tag inline-flex items-center gap-1"><IconTag size={12} /> 标签</button>
        </div>

        <div className="flex gap-3 mt-6 flex-wrap">
          <Button onClick={() => submit()} className="bg-foreground text-background rounded-sm">
            存档 · 听一句回声
          </Button>
          <Button
            onClick={() => {
              submit("不想写");
            }}
            variant="outline"
            className="border-2 border-foreground rounded-sm"
          >
            不想写 · 也算一笔
          </Button>
        </div>
      </section>
    </article>
  );
};

export default QuestRecord;
