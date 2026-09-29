"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, Loader2, ChevronRight } from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      if (!query) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-navy animate-spin" />
      </div>
    );
  }

  const hasResults = results?.programs?.length > 0 || results?.projects?.length > 0 || results?.stories?.length > 0;

  return (
    <div className="max-w-container mx-auto px-6 py-12 md:py-16">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-navy mb-2">
        Search Results
      </h1>
      <p className="text-ink/60 mb-8">
        Showing results for: <span className="font-semibold text-navy">{query}</span>
      </p>

      {!hasResults && (
        <div className="text-center py-16 bg-white rounded-card border border-gray-100">
          <Search className="w-16 h-16 text-ink/20 mx-auto mb-4" />
          <h3 className="font-display text-xl font-bold text-navy">No results found</h3>
          <p className="text-ink/60 mt-2">Try a different search term.</p>
          <Link href="/" className="inline-block mt-6 text-navy font-semibold hover:text-gold transition-colors">
            Back to Home
          </Link>
        </div>
      )}

      {/* Programs */}
      {results?.programs?.length > 0 && (
        <div className="mb-10">
          <h2 className="font-display text-xl font-bold text-navy mb-4 flex items-center gap-2">
            Programs <span className="text-sm font-normal text-ink/50">({results.programs.length})</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.programs.map((p: any) => (
              <Link
                key={p.id}
                href={`/programs/${p.slug}`}
                className="bg-white rounded-card p-5 border border-gray-100 hover:border-navy/20 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-purple bg-purple/10 px-2.5 py-1 rounded-full">
                      {p.category}
                    </span>
                    <h3 className="font-semibold text-navy text-lg mt-2">{p.name}</h3>
                    <p className="text-ink/60 text-sm mt-1 line-clamp-2">{p.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-ink/30 group-hover:text-navy group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {results?.projects?.length > 0 && (
        <div className="mb-10">
          <h2 className="font-display text-xl font-bold text-navy mb-4 flex items-center gap-2">
            Projects <span className="text-sm font-normal text-ink/50">({results.projects.length})</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.projects.map((p: any) => (
              <Link
                key={p.id}
                href={`/projects/${p.slug}`}
                className="bg-white rounded-card p-5 border border-gray-100 hover:border-navy/20 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-teal bg-teal/10 px-2.5 py-1 rounded-full">
                      {p.location}
                    </span>
                    <h3 className="font-semibold text-navy text-lg mt-2">{p.title}</h3>
                    <p className="text-ink/60 text-sm mt-1 line-clamp-2">{p.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-ink/30 group-hover:text-navy group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Stories */}
      {results?.stories?.length > 0 && (
        <div className="mb-10">
          <h2 className="font-display text-xl font-bold text-navy mb-4 flex items-center gap-2">
            Stories <span className="text-sm font-normal text-ink/50">({results.stories.length})</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.stories.map((s: any) => (
              <Link
                key={s.id}
                href={`/stories/${s.slug}`}
                className="bg-white rounded-card p-5 border border-gray-100 hover:border-navy/20 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full">
                      {s.category}
                    </span>
                    <h3 className="font-semibold text-navy text-lg mt-2">{s.title}</h3>
                    <p className="text-ink/60 text-sm mt-1 line-clamp-2">{s.excerpt}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-ink/30 group-hover:text-navy group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}