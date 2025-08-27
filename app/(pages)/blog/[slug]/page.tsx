import React from 'react';
import Markdoc from '@markdoc/markdoc';
import { reader } from '@/app/reader';
import { markdocConfig } from '@/keystatic.config';

import '@/app/styles.css';

export default async function Post(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;

  const post = await reader.collections.posts.read(slug);

  if (!post) return <div>Post not found!</div>;

  const { node } = await post.content();

  const errors = Markdoc.validate(node, markdocConfig);
  if (errors.length) {
    console.error('🚨 Markdoc validation errors:', errors);
    throw new Error('Invalid content');
  }

  const renderable = Markdoc.transform(node, markdocConfig);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
        <div className="prose prose-lg max-w-none">
          {Markdoc.renderers.react(renderable, React)}
        </div>
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await reader.collections.posts.list();

  return slugs.map(slug => ({
    slug,
  }));
}
