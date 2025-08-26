import { config, collection, fields } from '@keystatic/core';

export const markdocConfig = fields.markdoc.createMarkdocConfig({});

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
    landingPage: collection({
      label: 'Landing Page',
      slugField: 'title',
      path: 'content/landing/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Meta Description', multiline: true }),
        hero: fields.object({
          title: fields.text({ label: 'Hero Title' }),
          subtitle: fields.text({ label: 'Hero Subtitle', multiline: true }),
          ctaText: fields.text({ label: 'CTA Button Text' }),
          ctaLink: fields.text({ label: 'CTA Button Link' }),
        }, { label: 'Hero Section' }),
        features: fields.array(
          fields.object({
            title: fields.text({ label: 'Feature Title' }),
            description: fields.text({ label: 'Feature Description', multiline: true }),
            icon: fields.text({ label: 'Icon Name' }),
          }),
          { label: 'Features', itemLabel: (props) => props.fields.title.value || 'Feature' }
        ),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});
