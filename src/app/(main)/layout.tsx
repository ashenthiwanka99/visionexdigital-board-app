import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-[264px_1fr]">
        <Sidebar />
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
