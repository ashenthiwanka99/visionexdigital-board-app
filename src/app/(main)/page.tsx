"use client";

import { useSidebarStore } from "@/store/useSidebarStore";

export default function HomePage() {
  const currentPageTitle = useSidebarStore((s) => s.currentPageTitle);

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {currentPageTitle ? `${currentPageTitle} Page` : 'Welcome'}
            </h1>

            <p className="text-gray-600 text-lg">
              {currentPageTitle
                ? `You selected: "${currentPageTitle}" from the sidebar`
                : 'Please select an item from the sidebar to see its content here.'
              }
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
