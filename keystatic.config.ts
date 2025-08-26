import { config, collection, singleton, fields } from "@keystatic/core";

export const markdocConfig = fields.markdoc.createMarkdocConfig({});

const isProduction = process.env.NODE_ENV === "production";

export default config({
  storage: isProduction
    ? {
        kind: "github",
        repo: { owner: "choephix-experiments", name: "keystatic-website-test" },
      }
    : {
        kind: "local",
      },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
  },
  singletons: {
    landing: singleton({
      label: "Landing Page",
      path: "content/landing/content",
      format: { data: "yaml" },
      schema: {
        title: fields.text({ label: "Title" }),
        subtitle: fields.text({ label: "Subtitle" }),
        heroImage: fields.image({
          label: "Hero Image",
          directory: "public/images",
        }),
        features: fields.array(
          fields.object({
            title: fields.text({ label: "Feature Title" }),
            description: fields.text({ label: "Feature Description" }),
            icon: fields.text({ label: "Icon (emoji or icon name)" }),
          }),
          {
            label: "Features",
            itemLabel: (props) => props.fields.title.value || "Feature",
          }
        ),
        ctaText: fields.text({ label: "Call to Action Text" }),
        ctaLink: fields.text({ label: "Call to Action Link" }),
      },
    }),
  },
});
