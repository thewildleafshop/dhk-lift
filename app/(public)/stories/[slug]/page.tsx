import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  User,
  MapPin,
  Calendar,
  Clock,
  Heart,
  Share2,
  Quote,
  Tag,
  Users,
} from "lucide-react";

// ============ STORIES DATA (slug-based) ============
const storiesData: Record<string, {
  slug: string;
  category: string;
  categoryLabel: string;
  categoryColor: string;
  categoryBg: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  author: string;
  authorRole: string;
  location: string;
  date: string;
  readTime: string;
  quote?: string;
  program?: string;
  programHref?: string;
  relatedStories: string[];
}> = {
  "a-new-beginning-for-amina": {
    slug: "a-new-beginning-for-amina",
    category: "beneficiary",
    categoryLabel: "Beneficiary Story",
    categoryColor: "text-teal",
    categoryBg: "bg-teal/10",
    title: "A New Beginning for Amina",
    excerpt: "After losing her home, Amina's children can finally go back to school thanks to your support.",
    content: [
      "When Amina's husband passed away two years ago, she found herself alone with three young children and no source of income. The family lost their home in a flood, and Amina was forced to move into a small rented room in the outskirts of Karachi.",
      "Her eldest daughter, Sara (12), had been a top student at her school. But with the family's finances in ruins, Sara had to drop out to help her mother earn a living. Amina's two younger children, aged 8 and 5, were also at risk of losing their education.",
      "That's when a local community worker connected Amina with DHK LIFT's Education Support program. Within weeks, our team had verified her case, and the children were enrolled back in school with full tuition, books, and uniforms covered.",
      "Today, Sara is back at the top of her class. Her younger siblings are thriving, and Amina has started a small tailoring business with the support of a micro-grant from our LIFT Community program.",
      "Amina's story is not just about receiving help — it's about a mother's determination to give her children a better future. And it's a story that you helped write.",
    ],
    image: "/images/stories/volunteer.png",
    author: "Amina Bibi",
    authorRole: "Beneficiary, Karachi",
    location: "Karachi, Pakistan",
    date: "Apr 10, 2026",
    readTime: "5 min read",
    quote: "I never thought my children would go back to school. DHK LIFT gave us hope when we had none.",
    program: "Education Support",
    programHref: "/programs/education-support",
    relatedStories: ["healing-hands-a-mothers-journey", "why-i-give-every-month"],
  },
  "healing-hands-a-mothers-journey": {
    slug: "healing-hands-a-mothers-journey",
    category: "beneficiary",
    categoryLabel: "Beneficiary Story",
    categoryColor: "text-teal",
    categoryBg: "bg-teal/10",
    title: "Healing Hands: A Mother's Journey",
    excerpt: "When Fatima's son was diagnosed with a rare disease, she thought all hope was lost. Then LIFT Health stepped in.",
    content: [
      "Fatima's world stopped when her 7-year-old son Bilal was diagnosed with a rare blood disorder. The treatment cost was beyond anything the family could afford.",
      "For months, Fatima and her husband sold their possessions, borrowed from relatives, and even skipped meals to pay for Bilal's treatment. But the medical bills kept piling up.",
      "A doctor at the hospital referred them to DHK LIFT's LIFT Health program. Our team quickly verified Bilal's case and connected the family with the disease fund.",
      "Today, Bilal is receiving regular treatment and is showing remarkable progress. He's back to playing with his siblings, and Fatima says she can finally sleep at night.",
      "Fatima now volunteers at the hospital, helping other families navigate the same journey she went through. 'I want to be the hand that pulls someone else up,' she says.",
    ],
    image: "/images/programs/healthcare.png",
    author: "Fatima Ali",
    authorRole: "Beneficiary, Islamabad",
    location: "Islamabad, Pakistan",
    date: "Mar 20, 2026",
    readTime: "7 min read",
    quote: "DHK LIFT didn't just help my son — they gave my whole family a second chance at life.",
    program: "LIFT Health",
    programHref: "/programs/lift-health",
    relatedStories: ["a-new-beginning-for-amina", "from-volunteer-to-community-leader"],
  },
  "why-i-give-every-month": {
    slug: "why-i-give-every-month",
    category: "donor",
    categoryLabel: "Donor Story",
    categoryColor: "text-gold",
    categoryBg: "bg-gold/10",
    title: "Why I Give Every Month",
    excerpt: "Meet Sarah, a teacher from Dubai who donates monthly to DHK LIFT. She shares why consistent giving creates lasting change.",
    content: [
      "Sarah Ahmed is a high school teacher in Dubai. Every month, on the 1st, she donates $50 to DHK LIFT. It's become a ritual — as routine as her morning coffee.",
      "'I used to give sporadically,' Sarah says. 'But then I realized that consistent giving, even small amounts, creates real momentum for causes.'",
      "Sarah has been a member since 2024. She started with Bronze tier, moved to Silver after her donations crossed $100, and is now working toward Gold.",
      "'What I love about DHK LIFT is the transparency,' she says. 'I get updates on where my money went. I see photos. I get receipts. It's not just a black hole.'",
      "Sarah's monthly donation currently supports Education Support. She hopes to expand to LIFT Health next year.",
      "'Giving is not about how much you have. It's about how committed you are to making a difference.'",
    ],
    image: "/images/programs/education.png",
    author: "Sarah Ahmed",
    authorRole: "Donor, Dubai",
    location: "Dubai, UAE",
    date: "Apr 5, 2026",
    readTime: "4 min read",
    quote: "I don't give because I'm rich. I give because I've seen what consistent giving can do.",
    program: "Education Support",
    programHref: "/programs/education-support",
    relatedStories: ["a-new-beginning-for-amina", "teaching-children-changing-lives"],
  },
  "from-volunteer-to-community-leader": {
    slug: "from-volunteer-to-community-leader",
    category: "volunteer",
    categoryLabel: "Volunteer Story",
    categoryColor: "text-purple",
    categoryBg: "bg-purple/10",
    title: "From Volunteer to Community Leader",
    excerpt: "Ahmed started as a volunteer at a local food kitchen. Today, he leads a team of 50 volunteers serving 500 meals daily.",
    content: [
      "Three years ago, Ahmed Khan walked into a DHK LIFT partner food kitchen in Lahore and asked, 'How can I help?' He had no experience, no training, and no idea where to start.",
      "Today, Ahmed runs that same kitchen. He leads a team of 50 volunteers who serve over 500 meals every single day to families in need.",
      "'The first time I served a meal to a hungry child, something changed inside me,' Ahmed recalls. 'I realized this wasn't just about food. It was about dignity, about hope.'",
      "Ahmed credits DHK LIFT's volunteer training program and the support of the Al-Khidmat Foundation for his growth.",
      "'If I can go from a volunteer to a leader, anyone can. The platform gives you the tools. You just need the heart.'",
    ],
    image: "/images/programs/foodDonation.png",
    author: "Ahmed Khan",
    authorRole: "Community Leader, Lahore",
    location: "Lahore, Pakistan",
    date: "Mar 28, 2026",
    readTime: "6 min read",
    quote: "I came to volunteer for a day. I stayed for a lifetime because I found my purpose.",
    program: "Food Security",
    programHref: "/programs/food-security",
    relatedStories: ["healing-hands-a-mothers-journey", "why-i-give-every-month"],
  },
  "how-al-khidmat-reached-10000-families": {
    slug: "how-al-khidmat-reached-10000-families",
    category: "partner",
    categoryLabel: "Partner Story",
    categoryColor: "text-navy",
    categoryBg: "bg-navy/10",
    title: "How Al-Khidmat Reached 10,000 Families",
    excerpt: "Our global partner shares how the DHK LIFT platform helped them scale their food distribution program across Sindh.",
    content: [
      "Al-Khidmat Foundation has been serving communities in Pakistan for over 30 years. But when they wanted to scale their food distribution program to reach rural Sindh, they faced a challenge: how to fund and track thousands of deliveries.",
      "Partnering with DHK LIFT in 2024 changed everything. The platform gave them access to a global donor network, transparent funding tools, and a verification system.",
      "'Before DHK LIFT, we were working with spreadsheets and WhatsApp groups,' says Director Imran Siddiqui. 'Now we have a full dashboard, real-time funding, and a system that documents every delivery.'",
      "In just 18 months, Al-Khidmat has reached 10,000 families across Sindh. Each delivery is photographed, geotagged, and uploaded to the platform for donors to see.",
      "'The transparency is what makes it work,' Imran says. 'Donors trust us because they can see exactly where their money went.'",
    ],
    image: "/images/programs/disasterRelief.png",
    author: "Imran Siddiqui",
    authorRole: "Director, Al-Khidmat Foundation",
    location: "Sindh, Pakistan",
    date: "Mar 15, 2026",
    readTime: "5 min read",
    quote: "DHK LIFT didn't just give us funding — they gave us a platform to scale with integrity.",
    program: "Food Security",
    programHref: "/programs/food-security",
    relatedStories: ["from-volunteer-to-community-leader", "a-new-beginning-for-amina"],
  },
  "teaching-children-changing-lives": {
    slug: "teaching-children-changing-lives",
    category: "donor",
    categoryLabel: "Donor Story",
    categoryColor: "text-gold",
    categoryBg: "bg-gold/10",
    title: "Teaching Children, Changing Lives",
    excerpt: "A group of students from the UK raised $5,000 for education. Read how small acts of kindness lead to big impact.",
    content: [
      "It started as a small project at Oxford University. A group of 15 students decided to raise funds for education in developing countries. They set a goal of $1,000.",
      "Within three weeks, they had raised $5,000. They chose DHK LIFT's Education Support program to distribute the funds.",
      "'We wanted to make sure our money went where it was actually needed,' says team lead Emma Watson. 'DHK LIFT's transparency made the decision easy.'",
      "The $5,000 funded school supplies for 100 children in rural Pakistan, and full tuition for 15 students for a year.",
      "The students now plan to make this an annual event. 'We're just students,' Emma says. 'But even small acts of kindness can change lives.'",
    ],
    image: "/images/programs/education.png",
    author: "Oxford University Students",
    authorRole: "Donors, UK",
    location: "Oxford, UK",
    date: "Mar 10, 2026",
    readTime: "4 min read",
    quote: "We didn't have much to give. But what we gave created ripples we'll never fully see.",
    program: "Education Support",
    programHref: "/programs/education-support",
    relatedStories: ["why-i-give-every-month", "a-new-beginning-for-amina"],
  },
};

// Generate static params
export function generateStaticParams() {
  return Object.keys(storiesData).map((slug) => ({ slug }));
}

// ============ MAIN COMPONENT ============
export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = storiesData[slug];

  if (!story) {
    notFound();
  }

  const related = story.relatedStories
    .map((s) => storiesData[s])
    .filter(Boolean)
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-cloud">

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-container mx-auto px-6 py-12 md:py-16 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/60 text-sm mb-6 flex-wrap animate-fade-in">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/stories" className="hover:text-gold transition-colors">Stories</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold truncate">{story.title}</span>
          </div>

          <div className="max-w-3xl">
            {/* Category Badge */}
            <span className={`${story.categoryBg} text-xs font-semibold ${story.categoryColor} px-3 py-1.5 rounded-full`}>
              {story.categoryLabel}
            </span>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mt-4 animate-fade-in-up">
              {story.title}
            </h1>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium text-white">{story.author}</span>
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {story.location}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {story.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {story.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="max-w-container mx-auto px-6 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* ================= LEFT: ARTICLE ================= */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Featured Image */}
            <div className="relative h-[300px] md:h-[450px] rounded-card overflow-hidden shadow-xl">
              <Image
                src={story.image}
                alt={story.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Article Content */}
            <article className="bg-white rounded-card p-6 md:p-10 shadow-sm border border-gray-100">
              <div className="prose prose-lg max-w-none">
                {story.content.map((paragraph, i) => (
                  <p key={i} className="text-ink/80 leading-relaxed mb-6 text-base md:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Quote */}
              {story.quote && (
                <div className="mt-8 p-6 bg-gold/5 border-l-4 border-gold rounded-r-card">
                  <Quote className="w-8 h-8 text-gold mb-3" />
                  <p className="text-navy font-display text-lg md:text-xl italic leading-relaxed">
                    "{story.quote}"
                  </p>
                  <p className="text-ink/60 text-sm mt-3">— {story.author}</p>
                </div>
              )}

              {/* Share Row */}
              <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-ink/40" />
                  <span className="text-sm text-ink/60">Share this story</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-3 bg-navy/5 hover:bg-navy/10 text-navy rounded-full transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-3 bg-gold/10 hover:bg-gold/20 text-gold rounded-full transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* ================= RIGHT: SIDEBAR ================= */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Author Card */}
            <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
              <h3 className="font-display font-bold text-navy text-base mb-4">
                About the Author
              </h3>
              <div className="flex items-center gap-3">
                <div className="bg-gold rounded-full w-14 h-14 flex items-center justify-center shrink-0">
                  <span className="font-display font-bold text-ink text-xl">
                    {story.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-navy text-sm">{story.author}</p>
                  <p className="text-ink/60 text-xs">{story.authorRole}</p>
                </div>
              </div>
            </div>

            {/* Related Program */}
            {story.program && (
              <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
                <h3 className="font-display font-bold text-navy text-base mb-4">
                  Related Program
                </h3>
                <Link
                  href={story.programHref || "/programs"}
                  className="flex items-center gap-3 p-3 bg-cloud rounded-input hover:bg-navy/5 transition-colors group"
                >
                  <div className="bg-gold/10 rounded-full p-2.5 shrink-0">
                    <Users className="w-4 h-4 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy text-sm truncate">{story.program}</p>
                    <p className="text-ink/60 text-xs">View program details</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-ink/40 group-hover:text-gold transition-colors shrink-0" />
                </Link>
              </div>
            )}

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-purple to-purple/90 rounded-card p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <Heart className="w-8 h-8 text-gold mb-3" />
                <h3 className="font-display font-bold text-lg">
                  Create the Next Story
                </h3>
                <p className="text-white/80 text-sm mt-2 leading-relaxed">
                  Your donation can change a life. Be part of the next story of hope.
                </p>
                <Link
                  href="/giving"
                  className="btn-lift inline-flex items-center gap-2 bg-gold text-ink font-semibold px-5 py-3 rounded-input hover:bg-gold/90 transition-colors shadow-lg mt-4 text-sm"
                >
                  Donate Now
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Related Stories */}
            {related.length > 0 && (
              <div className="bg-white rounded-card p-6 shadow-sm border border-gray-100">
                <h3 className="font-display font-bold text-navy text-base mb-4">
                  Related Stories
                </h3>
                <div className="space-y-4">
                  {related.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/stories/${rel.slug}`}
                      className="flex items-start gap-3 group"
                    >
                      <div className="relative w-16 h-16 rounded-input overflow-hidden shrink-0">
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-navy text-sm line-clamp-2 group-hover:text-gold transition-colors">
                          {rel.title}
                        </p>
                        <p className="text-ink/50 text-xs mt-1">
                          {rel.readTime}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================= BACK TO STORIES ================= */}
        <div className="mt-12 text-center">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-ink/60 hover:text-navy font-medium transition-colors text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to All Stories
          </Link>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-navy text-white">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Every Story Starts With a Gift
          </h2>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto leading-relaxed">
            Your generosity can write the next chapter of hope. Be part of the story.
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
              href="/stories/submit"
              className="btn-lift border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-input hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              Share Your Story
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}