"use client";

import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-6">
        {/* Page content goes here */}
        <h1 className="text-xl font-semibold">Welcome to Board App</h1>
      </div>
    </main>
  );
}
