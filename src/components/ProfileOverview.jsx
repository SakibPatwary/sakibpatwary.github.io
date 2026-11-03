import {
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  MapPin,
  Sprout,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Music2,
  Code2,
  MessageCircle,
  AtSign,
  Mail,
  ArrowRight,
} from "lucide-react";
import { profile, experience, education } from "../data";
import { github } from "../github";
import projects from "../projects.json";

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Instagram,
  Facebook,
  X: AtSign,
  Spotify: Music2,
  "Google Developer": Code2,
  Discord: MessageCircle,
};
export default function ProfileOverview() {
  const facts = [
    {
      icon: BriefcaseBusiness,
      label: "Current role",
      title: experience[0].role,
      detail: `${experience[0].place} · ${experience[0].date}`,
    },
    {
      icon: GraduationCap,
      label: "Education",
      title: education[0].role,
      detail: education[0].place,
    },
    {
      icon: Code2,
      label: "Development focus",
      title: "Websites & application interfaces",
      detail: "React, JavaScript, TypeScript, and the MERN ecosystem.",
    },
    {
      icon: Sprout,
      label: "Currently exploring",
      title: github.learning.join(" & "),
      detail: "Continuing to grow my mobile development skills.",
    },
  ];
  return (
    <>
      <section className="profile-overview">
        <div className="section-title">
          <div>
            <p className="eyebrow">THE PERSON BEHIND THE PROJECTS</p>
            <h2>A little more about me</h2>
            <p>Software development, design, and a habit of staying curious.</p>
          </div>
          <a className="github-source" href="#experience">
            View my journey <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="profile-facts-grid">
          {facts.map(({ icon: Icon, label, title, detail }) => (
            <article key={label} className="profile-fact">
              <Icon size={21} />
              <div>
                <p className="eyebrow">{label}</p>
                <h3>{title}</h3>
                <p>{detail}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="profile-summary">
          <span>
            <strong>{projects.length}</strong> portfolio projects
          </span>
          <span>
            <MapPin size={16} />
            {profile.location}
          </span>
          <a href="#projects">
            Explore the collection <ArrowUpRight size={14} />
          </a>
        </div>
      </section>
      <section className="profile-social-section">
        <div className="section-title">
          <div>
            <p className="eyebrow">FIND ME AROUND THE WEB</p>
            <h2>Let’s stay connected</h2>
            <p>
              Code, professional updates, creative work, and a little music.
            </p>
          </div>
        </div>
        <div className="profile-social-grid">
          {profile.socials.map(([name, url]) => {
            const Icon = socialIcons[name] || ArrowUpRight;
            return (
              <a
                href={url}
                key={name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="profile-social-icon">
                  <Icon size={21} />
                </span>
                <span>
                  <strong>{name}</strong>
                  <small>
                    {name === "Discord"
                      ? profile.discord
                      : name === "Google Developer"
                        ? "Developer profile"
                        : name === "Spotify"
                          ? "Playlists & listening"
                          : "Connect with Sakib"}
                  </small>
                </span>
                <ArrowUpRight size={15} />
              </a>
            );
          })}
        </div>
        <a className="profile-email" href={`mailto:${profile.email}`}>
          <Mail size={17} />
          <span>
            Prefer a conversation?<strong>{profile.email}</strong>
          </span>
          <ArrowUpRight size={16} />
        </a>
      </section>
      <section className="profile-process">
        <div className="section-title">
          <div>
            <p className="eyebrow">THOUGHTFUL FROM START TO FINISH</p>
            <h2>How I approach a build</h2>
          </div>
        </div>
        <div className="process-grid">
          {[
            [
              "01",
              "Understand the idea",
              "Start with the audience, the purpose, and the content the experience needs to communicate.",
            ],
            [
              "02",
              "Shape the experience",
              "Organize the journey and develop clear layouts, visual direction, and intuitive interactions.",
            ],
            [
              "03",
              "Build & refine",
              "Turn the design into responsive interfaces, then review usability, accessibility, and the details.",
            ],
          ].map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <a className="button primary" href="#contact">
          Talk about a project <ArrowRight size={15} />
        </a>
      </section>
    </>
  );
}
