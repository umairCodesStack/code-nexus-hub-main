import { useState } from "react";
import { Search } from "lucide-react";
import { courses, categories } from "@/data/mockData";
import CourseCard from "@/components/CourseCard";

export default function Courses() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = activeCategory === "All" || c.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="colorful-page">
      <div className="container py-12">
        <h1 className="font-display text-3xl font-extrabold text-foreground mb-2">
          <span className="text-secondary">ls</span>{" "}
          <span className="colorful-title">~/courses</span>
      </h1>
        <p className="text-muted-foreground font-body mb-8">Browse all courses from top instructors.</p>

      {/* Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search courses, instructors, tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card/95 border-2 border-primary/30 text-foreground pl-10 pr-4 py-2.5 font-display text-sm placeholder:text-muted-foreground focus:outline-none focus:border-secondary"
          />
        </div>
      </div>

      {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`btn-3d px-4 py-2 font-display text-xs ${
              activeCategory === cat
                ? "btn-neon"
                : "bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Grid */}
        <div className="bento-grid">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
        {filtered.length === 0 && (
          <div className="card-3d colorful-card text-center py-12 px-6 text-muted-foreground font-display">
            <p className="text-lg">No courses found matching "{search}"</p>
            <p className="text-sm mt-2">Try a different search term or category.</p>
          </div>
        )}
        </div>
    </div>
  );
}
