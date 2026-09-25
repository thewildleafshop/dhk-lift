export default function PublicHome() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <h1 className="text-5xl font-bold text-navy mb-4">
        Welcome to DHK LIFT
      </h1>
      <p className="text-xl text-ink mb-8">
        Assistance, Giving, Membership, and Global Partnerships — one trusted platform.
      </p>
      <div className="flex gap-4">
        <button className="bg-navy text-white px-8 py-4 rounded-xl font-semibold">
          Find Assistance
        </button>
        <button className="bg-gold text-ink px-8 py-4 rounded-xl font-semibold">
          Donate Now
        </button>
      </div>
    </div>
  );
}