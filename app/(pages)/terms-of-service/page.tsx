import '../../styles.css';
import React from 'react';
import Markdoc from '@markdoc/markdoc';
import { reader } from '../../reader';
import { markdocConfig } from '../../../keystatic.config';

export default async function TermsOfService() {
  const tos = await reader.singletons.termsOfService.read();

  if (!tos) return <div>Terms of Service not found!</div>;

  const { node } = await tos.content();

  const errors = Markdoc.validate(node, markdocConfig);
  if (errors.length) {
    console.error(errors);
    throw new Error('Invalid content');
  }

  const renderable = Markdoc.transform(node, markdocConfig);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">{tos.title}</h1>
      <div className="prose prose-lg max-w-none">
        {Markdoc.renderers.react(renderable, React)}
      </div>
      <div className="text-sm text-gray-500 mt-8">
        Last updated: {tos.lastUpdated}
      </div>
    </div>
  );
}
