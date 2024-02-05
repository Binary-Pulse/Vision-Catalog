"use client";

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <>
      <main className="flex-1">{children}</main>
    </>
  );
}
