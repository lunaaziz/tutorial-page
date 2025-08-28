import type { Collection } from "tinacms";

const Tutorial: Collection = {
  label: "Tutorials",
  name: "tutorial",
  path: "content/tutorials",
  format: "md",
  ui: {
    router: ({ document }) => {
      return `/tutorials/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      label: "Category",
      name: "category",
      options: [
        { label: "Basics", value: "Basics" },
        { label: "Find Keywords", value: "Find Keywords" },
        { label: "Check Search Volume", value: "Check Search Volume" },
        { label: "Keyword Basket", value: "Keyword Basket" },
        { label: "My Account", value: "My Account" },
      ],
    },
    {
      type: "string",
      label: "Difficulty",
      name: "difficulty",
      options: [
        { label: "Beginner", value: "Beginner" },
        { label: "Intermediate", value: "Intermediate" },
        { label: "Advanced", value: "Advanced" },
      ],
    },
    {
      type: "string",
      label: "Duration",
      name: "duration",
      description: "e.g., '5 minutes'",
    },
    {
      type: "image",
      label: "Featured Image",
      name: "image",
    },
    {
      type: "datetime",
      label: "Date",
      name: "date",
    },
    {
      type: "string",
      label: "Video URL",
      name: "video_url",
      description: "Optional YouTube or video URL",
    },
    {
      type: "string",
      label: "Tags",
      name: "tags",
      list: true,
    },
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      isBody: true,
      templates: [
        {
          name: "DateTime",
          label: "Date & Time",
          inline: true,
          fields: [
            {
              name: "format",
              label: "Format",
              type: "string",
              options: ["utc", "iso", "local"],
            },
          ],
        },
        {
          name: "BlockQuote",
          label: "Block Quote",
          fields: [
            {
              name: "children",
              label: "Quote",
              type: "rich-text",
            },
            {
              name: "authorName",
              label: "Author",
              type: "string",
            },
          ],
        },
        {
          name: "NewsletterSignup",
          label: "Newsletter Sign Up",
          fields: [
            {
              name: "children",
              label: "CTA",
              type: "rich-text",
            },
            {
              name: "placeholder",
              label: "Placeholder",
              type: "string",
            },
            {
              name: "buttonText",
              label: "Button Text",
              type: "string",
            },
            {
              name: "disclaimer",
              label: "Disclaimer",
              type: "rich-text",
            },
          ],
          ui: {
            defaultItem: {
              placeholder: "Enter your email",
              buttonText: "Notify Me",
            },
          },
        },
      ],
    },
  ],
};

export default Tutorial;
