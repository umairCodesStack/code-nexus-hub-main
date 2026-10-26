import { Link } from "react-router-dom";
import { BookOpen, Users, Star } from "lucide-react";
import type { Course } from "@/data/mockData";

const sampleCourseImages: Record<string, string> = {
  "Cyber Security": "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80",
  "Web Development": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
  "Computer Science": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
  "AI / ML": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
  "DevOps": "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=80",
  "Blockchain": "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&w=1200&q=80",
};

const fallbackCourseImage = "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80";

export default function CourseCard({ course }: { course: Course }) {
  const imageUrl = sampleCourseImages[course.category] ?? fallbackCourseImage;

  return (
    <Link to={`/courses/${course.id}`} className="card-3d colorful-card block p-5 group">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/12 via-fuchsia-500/6 to-secondary/14" />

      <div className="mb-4 overflow-hidden border-2 border-border relative">
        <img
          src={imageUrl}
          alt={`${course.title} course cover`}
          loading="lazy"
          className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
        <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-secondary/45 blur-2xl" />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block bg-primary/20 text-primary font-display text-xs px-2 py-1 border border-primary/50 shadow-[0_0_0_1px_rgba(16,185,129,0.15)]">
          {course.category}
        </span>
        <span className="inline-block bg-secondary/20 text-secondary font-display text-xs px-2 py-1 border border-secondary/50 shadow-[0_0_0_1px_rgba(14,165,233,0.15)]">
          {course.level}
        </span>
      </div>

      <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
        {course.title}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 font-body">
        {course.description}
      </p>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-8 h-8 bg-primary/20 text-primary font-display text-xs font-bold border border-primary/40 shadow-[0_0_18px_rgba(16,185,129,0.25)]">
          {course.instructorAvatar}
        </div>
        <span className="text-sm text-muted-foreground">{course.instructor}</span>
      </div>

      <div className="flex items-center justify-between border-t-2 border-border pt-3">
        <div className="flex items-center gap-4 text-xs text-muted-foreground font-display">
          <span className="flex items-center gap-1 text-secondary">
            <BookOpen className="h-3.5 w-3.5" />
            {course.modules.length} modules
          </span>
          <span className="flex items-center gap-1 text-primary">
            <Users className="h-3.5 w-3.5" />
            {course.enrolled.toLocaleString()}
          </span>
          <span className="flex items-center gap-1 text-primary">
            <Star className="h-3.5 w-3.5 fill-primary" />
            {course.rating}
          </span>
        </div>
        <span className="font-display font-bold text-primary text-lg px-2 py-0.5 bg-gradient-to-r from-primary/15 to-secondary/15 border border-primary/40">${course.price}</span>
      </div>
    </Link>
  );
}
