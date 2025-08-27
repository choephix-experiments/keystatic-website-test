import Markdoc from '@markdoc/markdoc';
import React from 'react';

import { reader } from '@/app/reader';
import { markdocConfig } from '@/keystatic.config';

import '@/app/styles.css';

export default async function CookiePolicy() {
  const cookiePolicy = await reader.singletons.cookiePolicy.read();

  if (!cookiePolicy) return <div>Cookie Policy not found!</div>;

  const { node } = await cookiePolicy.content();

  const errors = Markdoc.validate(node, markdocConfig);
  if (errors.length) {
    console.error('🚨 Markdoc validation errors:', errors);
    throw new Error('Invalid content');
  }

  const renderable = Markdoc.transform(node, markdocConfig);

  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <article className='bg-white rounded-lg shadow-md p-8'>
        <h1 className='text-4xl font-bold text-gray-900 mb-6'>{cookiePolicy.title}</h1>
        <div className='prose prose-lg max-w-none'>
          {Markdoc.renderers.react(renderable, React)}
        </div>
      </article>
    </div>
  );
}
