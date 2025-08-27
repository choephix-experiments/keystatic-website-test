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
      path: "content/blog/*",
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
      path: "content/landing",
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
    termsOfService: singleton({
      label: "Terms of Service",
      path: "content/terms-of-service",
      format: { contentField: "content" },
      schema: {
        title: fields.text({ label: "Title" }),
        content: fields.markdoc({ label: "Content" }),
        // lastUpdated: fields.date({ label: "Last Updated" }),
      },
    }),
    privacyPolicy: singleton({
      label: "Privacy Policy",
      path: "content/privacy-policy",
      format: { contentField: "content" },
      schema: {
        title: fields.text({ label: "Title" }),
        content: fields.markdoc({ label: "Content" }),
        // lastUpdated: fields.date({ label: "Last Updated" }),
      },
    }),
    cookiePolicy: singleton({
      label: "Cookie Policy",
      path: "content/cookie-policy",
      format: { contentField: "content" },
      schema: {
        title: fields.text({ label: "Title" }),
        content: fields.markdoc({ label: "Content" }),
        // lastUpdated: fields.date({ label: "Last Updated" }),
      },
    }),
  },
  ui: {
    brand: {
      name: "Nilo.io • Admin Dash",
      mark: ({}) => (
        <a href="/">
          <img
            src="/images/nilo-n.svg"
            alt="Nilo.io"
            style={{
              marginLeft: ".75rem",
              paddingTop: ".25rem",
              height: "1rem",
              width: "1rem",
            }}
          />
        </a>
      ),
    },
  },
});
