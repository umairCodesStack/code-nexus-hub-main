import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  Shield,
  Brain,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { courses, testimonials } from "@/data/mockData";
import CourseCard from "@/components/CourseCard";
import TestimonialCard from "@/components/TestimonialCard";
import { useRef } from "react";
import CodeEditorPreview from "@/components/CodeEditorPreview";

const stats = [
  { label: "Active Students", value: "24,000+" },
  { label: "Courses", value: "120+" },
  { label: "Instructors", value: "50+" },
  { label: "Completion Rate", value: "94%" },
];

const features = [
  {
    icon: Code2,
    title: "Live IDE Practice",
    desc: "Split-screen coding environment with real-time execution.",
  },
  {
    icon: Shield,
    title: "Cyber Security Labs",
    desc: "Ethical hacking challenges in sandboxed environments.",
  },
  {
    icon: Brain,
    title: "AI-Powered Quizzes",
    desc: "Adaptive assessments that match your skill level.",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    desc: "Automated code review and test case validation.",
  },
];

// little helper: gives each feature card its own accent
const featureAccents = [
  "from-sky-500/20 via-transparent to-transparent",
  "from-emerald-500/20 via-transparent to-transparent",
  "from-fuchsia-500/20 via-transparent to-transparent",
  "from-amber-500/20 via-transparent to-transparent",
];

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const courseScrollRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement>, dir: "left" | "right") => {
    ref.current?.scrollBy({ left: dir === "left" ? -350 : 350, behavior: "smooth" });
  };

  return (
    <div className="relative overflow-hidden">
      {/* soft colorful background glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-24 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />

      {/* Hero */}
      <section className="container py-20 md:py-28 relative">
        {/* 2 columns on large screens, stacked on mobile */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* LEFT: Text */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/20 via-fuchsia-500/15 to-sky-500/15 text-primary font-display text-xs px-4 py-2 border border-primary/30 mb-6 animate-fade-in">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.7)]" />
              &gt; NEW: Cyber Security Track now live_
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-6 animate-fade-in">
              Learn to Code.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-fuchsia-400 to-sky-400">
                Build Real Things.
              </span>
            </h1>

            <p
              className="text-lg text-muted-foreground font-body max-w-xl mb-8 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              A marketplace for developers who learn by doing. Courses with articles, quizzes, and hands-on IDE practice — from the best instructors in tech.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Link
                to="/courses"
                className="btn-3d px-8 py-3 font-display text-sm inline-flex items-center gap-2
                           bg-gradient-to-r from-primary via-fuchsia-500 to-sky-500 text-primary-foreground
                           shadow-[0_10px_30px_rgba(56,189,248,0.25)]"
              >
                Browse Courses <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/instructor"
                className="btn-3d bg-card text-foreground px-8 py-3 font-display text-sm
                           border border-fuchsia-500/20 hover:border-sky-500/30 transition-colors"
              >
                Become an Instructor
              </Link>
            </div>
          </div>

          {/* RIGHT: Editor (fits like the screenshot) */}
          <div className="w-full lg:flex lg:justify-end">
            <CodeEditorPreview className="w-full max-w-[560px] lg:max-w-[640px]" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <div
              key={s.label}
              className="card-3d p-5 text-center relative overflow-hidden border border-primary/10"
            >
              {/* tiny top gradient accent */}
              <div
                className={[
                  "pointer-events-none absolute inset-x-0 top-0 h-1",
                  idx % 4 === 0 ? "bg-gradient-to-r from-sky-400 to-fuchsia-400" : "",
                  idx % 4 === 1 ? "bg-gradient-to-r from-emerald-400 to-sky-400" : "",
                  idx % 4 === 2 ? "bg-gradient-to-r from-amber-400 to-fuchsia-400" : "",
                  idx % 4 === 3 ? "bg-gradient-to-r from-fuchsia-400 to-emerald-400" : "",
                ].join(" ")}
              />
              <p className="font-display text-2xl md:text-3xl font-extrabold text-primary">
                {s.value}
              </p>
              <p className="text-sm text-muted-foreground mt-1 font-display">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses Carousel */}
      <section className="container pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground">
            <span className="text-secondary">$</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-fuchsia-400 to-sky-400">
              Featured_Courses
            </span>
          </h2>

          <div className="flex gap-2">
            <button
              onClick={() => scroll(courseScrollRef, "left")}
              className="btn-3d bg-card text-foreground p-2 border border-sky-500/20 hover:border-sky-500/40 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll(courseScrollRef, "right")}
              className="btn-3d bg-card text-foreground p-2 border border-fuchsia-500/20 hover:border-fuchsia-500/40 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={courseScrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {courses.map((course) => (
            <div key={course.id} className="min-w-[280px] md:min-w-[300px] flex-shrink-0">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container pb-16">
        <h2 className="font-display text-2xl font-bold text-foreground mb-8">
          <span className="text-secondary">{"// "}</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-fuchsia-400 to-emerald-400">
            Why CyberAcademy?
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => (
            <div
              key={f.title}
              className="card-3d p-6 relative overflow-hidden border border-primary/10"
            >
              {/* colorful wash background */}
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${
                  featureAccents[idx % featureAccents.length]
                }`}
              />
              <div className="relative">
                <f.icon className="h-8 w-8 text-primary mb-4 drop-shadow-[0_0_18px_rgba(99,102,241,0.35)]" />
                <h3 className="font-display text-sm font-bold text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="container pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground">
            <span className="text-primary">{">"}</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-sky-400 to-fuchsia-400">
              Student_Reviews
            </span>
          </h2>

          <div className="flex gap-2">
            <button
              onClick={() => scroll(scrollRef, "left")}
              className="btn-3d bg-card text-foreground p-2 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll(scrollRef, "right")}
              className="btn-3d bg-card text-foreground p-2 border border-amber-500/20 hover:border-amber-500/40 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-20">
        <div className="card-3d p-10 md:p-16 text-center relative overflow-hidden border border-primary/10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/10 via-fuchsia-500/10 to-sky-500/10" />

          <div className="relative">
            <h2 className="font-display text-3xl font-extrabold text-foreground mb-4">
              Ready to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-fuchsia-400 to-sky-400">
                level up
              </span>
              ?
            </h2>

            <p className="text-muted-foreground font-body mb-8 max-w-lg mx-auto">
              Join thousands of developers building real skills with hands-on courses.
            </p>

            <Link
              to="/courses"
              className="btn-3d px-10 py-3 font-display text-sm inline-flex items-center gap-2
                         bg-gradient-to-r from-primary via-fuchsia-500 to-sky-500 text-primary-foreground
                         shadow-[0_14px_40px_rgba(217,70,239,0.20)]"
            >
              Start Learning <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}