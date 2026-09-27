import Link from "next/link";
import {
  Search,
  ChevronRight,
  Heart,
  User,
  Quote,
  BookOpen,
  Users,
  Filter,
  Star,
  Clock,
} from "lucide-react";

// ============ CATEGORY FILTERS ============
const categories = [
  { id: "all", label: "All Stories" },
  { id: "beneficiary", label: "Beneficiaries" },
  { id: "donor", label: "Donors" },
  { id: "volunteer", label: "Volunteers" },
  { id: "partner", label: "Partners" },
];

// ============ DEMO STORIES DATA ============
const stories = [
  {
    id: 1,
    category: "beneficiary",
    slug: "a-new-beginning-for-amina",
    categoryLabel: "Beneficiary Story",
    categoryColor: "text-teal",
    categoryBg: "bg-teal/10",
    title: "A New Beginning for Amina",
    excerpt: "After losing her home, Amina's children can finally go back to school thanks to your support. Read how one donation changed an entire family's future.",
    image: "/images/stories/volunteer.png",
    author: "Amina Bibi",
    location: "Karachi, Pakistan",
    date: "Apr 10, 2026",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    category: "donor",
    categoryLabel: "Donor Story",
    categoryColor: "text-gold",
    categoryBg: "bg-gold/10",
    title: "Why I Give Every Month",
    excerpt: "Meet Sarah, a teacher from Dubai who donates monthly to DHK LIFT. She shares why consistent giving creates lasting change.",
    image: "/images/programs/education.png",
    author: "Sarah Ahmed",
    location: "Dubai, UAE",
    date: "Apr 5, 2026",
    readTime: "4 min read",
    featured: true,
  },
  {
    id: 3,
    category: "volunteer",
    categoryLabel: "Volunteer Story",
    categoryColor: "text-purple",
    categoryBg: "bg-purple/10",
    title: "From Volunteer to Community Leader",
    excerpt: "Ahmed started as a volunteer at a local food kitchen. Today, he leads a team of 50 volunteers serving 500 meals daily.",
    image: "/images/programs/foodDonation.png",
    author: "Ahmed Khan",
    location: "Lahore, Pakistan",
    date: "Mar 28, 2026",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 4,
    category: "beneficiary",
    categoryLabel: "Beneficiary Story",
    categoryColor: "text-teal",
    categoryBg: "bg-teal/10",
    title: "Healing Hands: A Mother's Journey",
    excerpt: "When Fatima's son was diagnosed with a rare disease, she thought all hope was lost. Then LIFT Health stepped in.",
    image: "/images/programs/healthcare.png",
    author: "Fatima Ali",
    location: "Islamabad, Pakistan",
    date: "Mar 20, 2026",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 5,
    category: "partner",
    categoryLabel: "Partner Story",
    categoryColor: "text-navy",
    categoryBg: "bg-navy/10",
    title: "How Al-Khidmat Reached 10,000 Families",
    excerpt: "Our global partner shares how the DHK LIFT platform helped them scale their food distribution program across Sindh.",
    image: "/images/programs/disasterRelief.png",
    author: "Al-Khidmat Foundation",
    location: "Sindh, Pakistan",
    date: "Mar 15, 2026",
    readTime: "5 min read",
    featured: false,
  },
  {
    id: 6,
    category: "donor",
    categoryLabel: "Donor Story",
    categoryColor: "text-gold",
    categoryBg: "bg-gold/10",
    title: "Teaching Children, Changing Lives",
    excerpt: "A group of students from the UK raised $5,000 for education. Read how small acts of kindness lead to big impact.",
    image: "/images/programs/education.png",
    author: "Oxford University Students",
    location: "Oxford, UK",
    date: "Mar 10, 2026",
    readTime: "4 min read",
    featured: false,
  },
];

// ============ FEATURED STORIES ============
const featuredStories = stories.filter((s) => s.featured);
const regularStories = stories.filter((s) => !s.featured);

// ============ MAIN COMPONENT ============
export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-cloud">

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-container mx-auto px-6 py-16 md:py-24 relative z-10 text-center">
          <div className="bg-gold/20 rounded-full p-4 w-fit mx-auto mb-6 animate-fade-in">
            <BookOpen className="w-10 h-10 text-gold" />
          </div>
          <p className="text-gold font-semibold tracking-wider uppercase text-xs md:text-sm animate-fade-in">
            Stories of Hope
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-4 animate-fade-in-up">
            Real People. <br />
            <span className="text-gradient-gold">Real Impact.</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6 leading-relaxed animate-fade-in-up delay-100">
            Every donation creates a story. Every story changes a life. 
            Read the stories of hope from our global community.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-8 animate-fade-in-up delay-200">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
              <input
                type="text"
                placeholder="Search stories by title, author, or location..."
                className="w-full pl-14 pr-32 py-4 md:py-5 rounded-input border-0 bg-white text-ink placeholder:text-ink/40 focus:outline-none focus:ring-4 focus:ring-gold/30 shadow-2xl text-base"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gold text-ink font-semibold px-6 py-3 rounded-input hover:bg-gold/90 transition-colors text-sm">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS BAR ================= */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-container mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-navy">1,200+</p>
              <p className="text-ink/70 mt-1 text-xs md:text-sm">Stories Shared</p>
            </div>
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-navy">50,000+</p>
              <p className="text-ink/70 mt-1 text-xs md:text-sm">Lives Touched</p>
            </div>
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-navy">25+</p>
              <p className="text-ink/70 mt-1 text-xs md:text-sm">Countries</p>
            </div>
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-navy">100%</p>
              <p className="text-ink/70 mt-1 text-xs md:text-sm">Verified</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORY FILTERS ================= */}
      <section className="max-w-container mx-auto px-6 py-8">
        <div className="bg-white rounded-card p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="w-4 h-4 text-ink/40 shrink-0" />
            {categories.map((category, i) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  i === 0
                    ? "bg-navy text-white"
                    : "bg-cloud text-ink/70 hover:bg-navy/5 hover:text-navy"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED STORIES ================= */}
      <section className="max-w-container mx-auto px-6 pb-8">
        <div className="flex items-center gap-2 mb-6">
          <Star className="w-5 h-5 text-gold" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-navy">
            Featured Stories
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredStories.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.slug}`}
              className="card-hover bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden group"
            >
              <div className="relative h-64 md:h-72 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className={`${story.categoryBg} backdrop-blur-sm text-xs font-semibold ${story.categoryColor} px-3 py-1.5 rounded-full`}>
                    {story.categoryLabel}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl font-bold text-white">
                    {story.title}
                  </h3>
                  <p className="text-white/80 text-sm mt-2 line-clamp-2">
                    {story.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mt-4 text-xs text-white/70">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {story.author}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {story.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= ALL STORIES ================= */}
      <section className="max-w-container mx-auto px-6 pb-16 md:pb-24">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-5 h-5 text-navy" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-navy">
            More Stories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularStories.map((story) => (
            <Link
              key={story.id}
              href={`/stories/${story.id}`}
              className="card-hover bg-white rounded-card shadow-sm border border-gray-100 overflow-hidden flex flex-col group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className={`${story.categoryBg} backdrop-blur-sm text-xs font-semibold ${story.categoryColor} px-3 py-1.5 rounded-full`}>
                    {story.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display font-bold text-navy text-lg line-clamp-2">
                  {story.title}
                </h3>
                <p className="text-ink/70 text-sm mt-3 leading-relaxed flex-1 line-clamp-3">
                  {story.excerpt}
                </p>

                {/* Meta */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-ink/60">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span className="truncate">{story.author}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3" />
                    {story.readTime}
                  </div>
                </div>

                {/* Read More */}
                <div className="mt-3 text-gold font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Full Story
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="btn-lift bg-navy text-white font-semibold px-8 py-3.5 rounded-input hover:bg-navy/90 transition-colors shadow-lg">
            Load More Stories
          </button>
        </div>
      </section>

      {/* ================= SUBMIT YOUR STORY CTA ================= */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-container mx-auto px-6 py-16 md:py-24">
          <div className="bg-gradient-to-br from-purple to-purple/90 rounded-card p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <Quote className="w-10 h-10 text-gold mb-4" />
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  Share Your Story
                </h2>
                <p className="text-white/80 mt-4 leading-relaxed">
                  Have you been helped by DHK LIFT? Or has your donation created 
                  a story worth sharing? We'd love to hear from you.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/stories/submit"
                    className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
                  >
                    <Heart className="w-5 h-5" />
                    Submit Your Story
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="bg-white/10 backdrop-blur-sm rounded-card p-6 border border-white/20">
                  <p className="text-white/90 text-sm italic leading-relaxed">
                    "When I shared my story, I didn't realize how many people would be inspired. 
                    Every donation I received helped me rebuild my life. Now I want to give back."
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="bg-gold rounded-full w-10 h-10 flex items-center justify-center">
                      <span className="font-display font-bold text-ink">A</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">Amina Bibi</p>
                      <p className="text-white/60 text-xs">Beneficiary, Karachi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-navy text-white">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Be Part of the Next Story
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed">
            Your donation can create the next story of hope. Every contribution matters.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/giving"
              className="btn-lift bg-gold text-ink font-semibold px-8 py-4 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Donate Now
            </Link>
            <Link
              href="/assistance/apply"
              className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Users className="w-5 h-5" />
              Apply for Assistance
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}