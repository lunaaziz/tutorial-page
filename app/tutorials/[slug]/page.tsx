import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { useTina } from "tinacms/dist/react";
import client from "../../../tina/__generated__/client";

interface Props {
  params: {
    slug: string;
  };
}

export default async function TutorialPage({ params }: Props) {
  const { data } = await client.queries.tutorial({
    relativePath: `${params.slug}.md`,
  });

  if (!data.tutorial) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
              {data.tutorial.category}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {data.tutorial.difficulty}
            </span>
            {data.tutorial.duration && (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {data.tutorial.duration}
              </span>
            )}
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {data.tutorial.title}
          </h1>
          
          {data.tutorial.description && (
            <p className="text-xl text-gray-600 mb-6">
              {data.tutorial.description}
            </p>
          )}
          
          {data.tutorial.date && (
            <time className="text-gray-500">
              {new Date(data.tutorial.date).toLocaleDateString()}
            </time>
          )}
        </header>
        
        {data.tutorial.image && (
          <div className="mb-8">
            <img
              src={data.tutorial.image}
              alt={data.tutorial.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}
        
        <div className="prose prose-lg max-w-none">
          <TinaMarkdown content={data.tutorial._body} />
        </div>
        
        {data.tutorial.video_url && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Video Tutorial</h3>
            <div className="aspect-video">
              <iframe
                src={data.tutorial.video_url}
                className="w-full h-full rounded-lg"
                allowFullScreen
              />
            </div>
          </div>
        )}
        
        {data.tutorial.tags && data.tutorial.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {data.tutorial.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { data } = await client.queries.tutorial({
      relativePath: `${params.slug}.md`,
    });

    return {
      title: data.tutorial.title,
      description: data.tutorial.description,
    };
  } catch {
    return {
      title: "Tutorial Not Found",
    };
  }
}

export async function generateStaticParams() {
  const { data } = await client.queries.tutorialConnection();
  return data.tutorialConnection.edges?.map((tutorial) => ({
    slug: tutorial?.node?._sys.filename,
  }));
}
