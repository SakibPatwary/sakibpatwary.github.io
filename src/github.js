// Public profile and repository sources reviewed on 2026-11-03.
// This is build-time content: the deployed portfolio does not call GitHub APIs.
export const github = {
  profileUrl: "https://github.com/SakibPatwary",
  readmeUrl: "https://github.com/SakibPatwary/SakibPatwary/blob/main/README.md",
  reviewedOn: "2026-11-03",
  focus: "MERN stack and related technologies",
  learning: ["React Native", "NativeWind"],
  interests: ["Travel", "Video games"],
  featuredStack: [
    "React",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Tailwind CSS",
    "Figma",
    "C#",
  ],
  skillGroups: [
    {
      title: "Languages",
      code: "</>",
      skills: [
        "JavaScript",
        "TypeScript",
        "HTML5",
        "CSS3",
        "C",
        "C#",
        "C++",
        "Java",
        "PHP",
      ],
    },
    {
      title: "Frontend & mobile",
      code: "{ }",
      skills: [
        "React",
        "React Native",
        "React Router",
        "Redux",
        "Tailwind CSS",
        "Bootstrap",
        "Sass",
        "Stylus",
        "Styled Components",
      ],
    },
    {
      title: "Backend & databases",
      code: "db",
      skills: ["Node.js", "MongoDB", "MySQL", "Microsoft SQL Server", "Oracle"],
    },
    {
      title: "Cloud & deployment",
      code: "↑",
      skills: ["Azure", "Vercel", "Netlify", "Heroku"],
    },
    {
      title: "Design",
      code: "✦",
      skills: [
        "Figma",
        "Framer",
        "Adobe Illustrator",
        "Adobe Photoshop",
        "Adobe Lightroom",
        "Canva",
      ],
    },
    {
      title: "Developer workflow",
      code: "⌘",
      skills: ["npm", "Yarn", "ESLint", "Babel", "Postman", "Jira", "Trello"],
    },
  ],
  repositories: [
    {
      name: "Vromon",
      slug: "Vromon",
      description:
        "A travel services aggregation platform built as a university capstone software system project.",
      stack: ["React", "Node.js", "Express", "MongoDB", "Redux"],
      source: "package.json",
      monogram: "VR",
    },
    {
      name: "Nanango Star Motel",
      slug: "NanangoStarMotel",
      description:
        "A website for Nanango Star Motel built with React, with responsive layouts and interactive visual elements.",
      stack: ["React", "Bootstrap", "Framer Motion", "EmailJS"],
      source: "package.json",
      monogram: "NS",
    },
    {
      name: "Ecommerce Website",
      slug: "Ecommerce_Website",
      description:
        "A Web Technology course project with separate Admin, Customer, Employee, and Seller areas.",
      stack: ["PHP", "JavaScript", "CSS", "HTML"],
      source: "",
      monogram: "EC",
    },
  ].map((repo) => ({
    ...repo,
    url: `https://github.com/SakibPatwary/${repo.slug}`,
    stackSource: repo.source
      ? `https://github.com/SakibPatwary/${repo.slug}/blob/main/${repo.source}`
      : `https://github.com/SakibPatwary/${repo.slug}`,
  })),
};
