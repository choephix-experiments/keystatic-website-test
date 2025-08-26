import '../../styles.css';
import React from 'react';
import Markdoc from '@markdoc/markdoc';
import { reader } from '../../reader';
import { markdocConfig } from '../../../keystatic.config';

export default async function CookiePolicy() {
  const cookiePolicy = await reader.singletons.cookiePolicy.read();

  if (!cookiePolicy) return <div>Cookie Policy not found!</div>;

  const { node } = await cookiePolicy.content();

  const errors = Markdoc.validate(node, markdocConfig);
  if (errors.length) {
    console.error(errors);
    throw new Error('Invalid content');
  }

  const renderable = Markdoc.transform(node, markdocConfig);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">{cookiePolicy.title}</h1>
      <div className="prose prose-lg max-w-none">
        {Markdoc.renderers.react(renderable, React)}
      </div>
      <div className="text-sm text-gray-500 mt-8">
        Last updated: {cookiePolicy.lastUpdated}
      </div>
    </div>
  );
}
