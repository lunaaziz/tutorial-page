import Link from "next/link";
import client from "../../tina/__generated__/client";

export default async function TutorialsPage() {
  const { data } = await client.queries.tutorialConnection();

  const tutorials = data.tutorialConnection.edges || [];
  
  // Group tutorials by category
  const tutorialsByCategory = tutorials.reduce((acc, tutorial) => {
    if (!tutorial?.node) return acc;
    
    const category = tutorial.node.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tutorial.node);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Keyword Tool Tutorials
          </h1>
          <p className="text-xl text-gray-600">
            Learn how to use Keyword Tool with our comprehensive tutorials and guides
          </p>
        </header>

        {Object.entries(tutorialsByCategory).map(([category, categoryTutorials]) => (
          <section key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryTutorials.map((tutorial) => (
                <Link
                  key={tutorial._sys.filename}
                  href={`/tutorials/${tutorial._sys.filename}`}
                  className="block bg-white rounded-lg border hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {tutorial.difficulty}
                      </span>
                      {tutorial.duration && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                          {tutorial.duration}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {tutorial.title}
                    </h3>
                    
                    {tutorial.description && (
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {tutorial.description}
                      </p>
                    )}
                    
                    {tutorial.tags && tutorial.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1">
                        {tutorial.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                        {tutorial.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            +{tutorial.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
        
        {tutorials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tutorials found.</p>
            <p className="text-gray-400 mt-2">
              Visit the <Link href="/admin" className="text-blue-600 hover:underline">admin panel</Link> to create your first tutorial.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export const metadata = {
  title: "Tutorials - Keyword Tool",
  description: "Learn how to use Keyword Tool with our comprehensive tutorials and guides",
};
