import { useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";

export default function HomePage(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  
  const tutorials = data?.tutorialConnection?.edges || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Keyword Tool Tutorials
          </h1>
          <p className="text-lg text-gray-600">
            Learn how to use keyword research tools effectively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial) => {
            const tutorialData = tutorial.node;
            return (
              <div key={tutorialData._sys.filename} className="bg-white rounded-lg shadow-md overflow-hidden">
                {tutorialData.image && (
                  <img 
                    src={tutorialData.image} 
                    alt={tutorialData.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {tutorialData.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {tutorialData.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {tutorialData.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {tutorialData.description}
                  </p>
                  <a 
                    href={`/tutorials/${tutorialData._sys.filename}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read Tutorial →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.tutorialConnection();

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
