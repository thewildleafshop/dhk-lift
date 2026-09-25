export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cloud flex items-center justify-center p-8">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}