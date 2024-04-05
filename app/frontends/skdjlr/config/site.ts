export const siteConfig = {
  name: "skdjlr",
  url: "https://skdjlr.com",
  ogImage: "", // link to logo
  description:
    "Managing a schedule shouldn't take up so much of your own schedule",
  links: {
    github: "https://github.com/duexcoast",
  },
  mainNav: [
    {
      title: "Schedule Designer",
      href: "/scheduler",
    },
    {},
    {
      title: "Employees",
      href: "/employees",
    },
    {
      title: "Templates",
      href: "/templates",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
