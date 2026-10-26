import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  filename?: string;
  className?: string;
  code?: string;
  speedMs?: number;
  editorHeight?: string;
};

const DEFAULT_CODE = `const user = {
  name: 'Developer',
  level: 99,
  startLearning: function() {
    return 'Future Unlocked';
  }
};`;

export default function CodeEditorPreview({
  filename = "script.js",
  className = "",
  code = DEFAULT_CODE,
  speedMs = 18,
  editorHeight = "240px",
}: Props) {
  const [typed, setTyped] = useState("");
  const preRef = useRef<HTMLPreElement | null>(null);

  const text = useMemo(() => code.replace(/\r\n/g, "\n"), [code]);

  useEffect(() => {
    let i = 0;
    let raf: number | null = null;
    let timeout: number | null = null;

    const tick = () => {
      i += 1;
      setTyped(text.slice(0, i));

      if (i >= text.length) {
        timeout = window.setTimeout(() => {
          i = 0;
          setTyped("");
          raf = window.requestAnimationFrame(tick);
        }, 1200);
        return;
      }

      timeout = window.setTimeout(() => {
        raf = window.requestAnimationFrame(tick);
      }, speedMs);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      if (timeout) window.clearTimeout(timeout);
    };
  }, [text, speedMs]);

  useEffect(() => {
    const el = preRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [typed]);

  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border border-white/10",
        "bg-[#141335] text-white shadow-[0_30px_90px_rgba(0,0,0,0.35)]",
        className,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />

      {/* header */}
      <div className="relative flex items-center justify-between px-5 py-4">
        {/* window buttons (left) */}
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>

        {/* status + filename (right) */}
        <div className="flex items-center gap-3">
          {/* ONLINE blinking dot (moved here) */}
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>
            <span className="text-[11px] font-mono text-emerald-200/80">
              online
            </span>
          </span>

          <div className="text-xs font-mono text-white/60">{filename}</div>
        </div>
      </div>

      <div className="relative h-px w-full bg-white/10" />

      <div className="relative p-6">
        <pre
          ref={preRef}
          className="font-mono text-sm leading-6 text-white/90 whitespace-pre-wrap overflow-auto pr-2"
          style={{ height: editorHeight }}
        >
          <CodeHighlight text={typed} />
          <span className="inline-block w-[10px] translate-y-[2px] border-r-2 border-sky-300/90 animate-pulse" />
        </pre>
      </div>
    </div>
  );
}

function CodeHighlight({ text }: { text: string }) {
  const parts = tokenize(text);

  return (
    <>
      {parts.map((p, idx) => {
        if (p.type === "kw") return <span key={idx} className="text-fuchsia-300">{p.value}</span>;
        if (p.type === "fn") return <span key={idx} className="text-sky-300">{p.value}</span>;
        if (p.type === "num") return <span key={idx} className="text-emerald-300">{p.value}</span>;
        if (p.type === "str") return <span key={idx} className="text-amber-300">{p.value}</span>;
        if (p.type === "sym") return <span key={idx} className="text-white/80">{p.value}</span>;
        return <span key={idx} className="text-white/90">{p.value}</span>;
      })}
    </>
  );
}

type Tok = { type: "kw" | "fn" | "num" | "str" | "sym" | "txt"; value: string };

function tokenize(input: string): Tok[] {
  const out: Tok[] = [];
  const regex =
    /(\bconst\b|\breturn\b|\bfunction\b)|(\bstartLearning\b)|(\b\d+\b)|('([^'\\]|\\.)*')|([{}():;=,[\]])/g;

  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = regex.exec(input)) !== null) {
    if (m.index > last) out.push({ type: "txt", value: input.slice(last, m.index) });

    if (m[1]) out.push({ type: "kw", value: m[1] });
    else if (m[2]) out.push({ type: "fn", value: m[2] });
    else if (m[3]) out.push({ type: "num", value: m[3] });
    else if (m[4]) out.push({ type: "str", value: m[4] });
    else if (m[6]) out.push({ type: "sym", value: m[6] });

    last = regex.lastIndex;
  }

  if (last < input.length) out.push({ type: "txt", value: input.slice(last) });
  return out;
}