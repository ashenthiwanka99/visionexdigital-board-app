import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-[288px_1fr]">
        <Sidebar />
        <main className="pt-4 pb-6 px-4 md:pt-6 md:pr-6 md:pb-6 md:pl-0 max-[760px]:px-4">
          {children}
        </main>
      </div>
    </div>
  );
}
