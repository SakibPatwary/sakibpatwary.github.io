export const introduction = {
  headline: "Thoughtful design. Purposeful development.",
  description:
    "A software developer with a creative eye. I turn ideas into intuitive, engaging digital experiences that feel as good as they work.",
  subtitle: "Software Developer",
  signature: "DEVELOPER. DESIGNER. PROBLEM SOLVER.",
};
export const biography = [
  "I’m Sakib, a software developer based in Dhaka. I bring together development and design to create websites that are functional, distinctive, and easy to use.",
  "I care about the details: a clear message, an intuitive interaction, and the personal touches that make a product feel like yours. Always curious, I’m continually developing my skills and exploring new ideas.",
];
export const services = [
  {
    title: "Web development",
    text: "Responsive business websites, personal portfolios, and dashboard interfaces built with React, JavaScript, HTML, and CSS.",
    icon: "code",
    deliverables: ["Responsive websites", "React interfaces", "Dashboards"],
  },
  {
    title: "UI/UX design",
    text: "Interface layouts, wireframes, and reusable visual patterns in Figma, with attention to clear navigation, readable content, and responsive behavior.",
    icon: "design",
    deliverables: ["Interface design", "Wireframes", "Figma"],
  },
  {
    title: "App development",
    text: "User-friendly application interfaces, with a growing focus on React Native and NativeWind for mobile development.",
    icon: "app",
    deliverables: [
      "Application UI",
      "React Native · learning",
      "NativeWind · learning",
    ],
  },
  {
    title: "Banner & graphic design",
    text: "Digital banners, social media graphics, and brand visuals using Photoshop, Illustrator, and Canva.",
    icon: "pen",
    deliverables: ["Digital banners", "Social graphics", "Brand visuals"],
  },
];
export const asset = (name) =>
  `${import.meta.env.BASE_URL}assets/optimized/${name.replace(/\.(png|jpe?g)$/i, ".webp")}`;
export const TOUR_DURATION = 30;
export const formatTime = (seconds) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
