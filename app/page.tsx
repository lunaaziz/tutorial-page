import React from "react";
import Link from "next/link";
import client from "@/tina/__generated__/client";

export const revalidate = 300;

export default async function Home() {
  // Get recent tutorials
  const { data } = await client.queries.tutorialConnection({ first: 6 });
  const tutorials = data.tutorialConnection.edges || [];

  const categories = [
    { name: "Basics", description: "Learn the basics of Keyword Tool", icon: "🔍" },
    { name: "Find Keywords", description: "Get advance insights", icon: "🎯" },
    { name: "Check Search Volume", description: "Get search volume data for 700 keywords", icon: "📊" },
    { name: "Keyword Basket", description: "Organize your keywords", icon: "🗂️" },
    { name: "My Account", description: "Managing your Account settings", icon: "👤" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Keyword Tool Tutorials</h1>
          <p className="text-xl mb-8 opacity-90">
            Your comprehensive guide to mastering keyword research
          </p>
          <Link
            href="/tutorials"
            className="inline-block bg-white text-red-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Browse All Tutorials
          </Link>
        </div>
      </header>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-red-500 mb-2">
                {tutorials.length}+
              </div>
              <div className="text-gray-600">Tutorials Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500 mb-2">5</div>
              <div className="text-gray-600">Categories Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500 mb-2">∞</div>
              <div className="text-gray-600">Keywords to Discover</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Jump right in
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/tutorials?category=${encodeURIComponent(category.name)}`}
                className="bg-white border rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
              >
                <div className="text-3xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-500 text-sm">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Tutorials */}
      {tutorials.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Latest Tutorials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.slice(0, 3).map((tutorial) => {
                if (!tutorial?.node) return null;
                return (
                  <Link
                    key={tutorial.node._sys.filename}
                    href={`/tutorials/${tutorial.node._sys.filename}`}
                    className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                        {tutorial.node.category}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {tutorial.node.difficulty}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {tutorial.node.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {tutorial.node.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Explore our comprehensive tutorial library and become a keyword research expert
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/tutorials"
              className="bg-white text-red-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Browse Tutorials
            </Link>
            <Link
              href="/admin"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-500 transition"
            >
              Manage Content
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
