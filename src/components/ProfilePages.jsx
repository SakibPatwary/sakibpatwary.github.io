import {
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  Code2,
  Layers3,
  Smartphone,
  PenTool,
  MapPin,
  CalendarDays,
  Mail,
  Phone,
  Check,
  Copy,
  UserRound,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { profile, experience, education } from "../data";
import { asset, biography, services, introduction } from "../content";
import ContactForm from "./ContactForm";
import ProfileOverview from "./ProfileOverview";
import {
  GitHubSkills,
  GitHubPersonality,
  GitHubProjects,
} from "./GitHubSections";

export function PageHeading({ eyebrow, title, description, icon: Icon }) {
  return (
    <div className="page-heading">
      {Icon && (
        <div className="page-heading-icon">
          <Icon size={36} />
        </div>
      )}
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}
export function AboutPage() {
  return (
    <>
      <PageHeading
        eyebrow="ABOUT THE ARTIST"
        title="More than the code."
        description="Creative by nature. Developer by craft."
        icon={UserRound}
      />
      <div className="page-body">
        <div className="biography-layout">
          <img
            className="biography-portrait"
            src={asset("avatar.png")}
            alt="Illustrated portrait of Sakib Patwary"
          />
          <div>
            <p className="eyebrow">SAKIB PATWARY · SOFTWARE DEVELOPER</p>
            <h2>{introduction.headline}</h2>
            {biography.map((text) => (
              <p key={text}>{text}</p>
            ))}
            <div className="personal-details">
              <span>
                <MapPin size={15} />
                {profile.location}
              </span>
              <span>
                <CalendarDays size={15} />
                Born <time dateTime="1999-05-22">May 22, 1999</time>
              </span>
            </div>
            <p className="signature">{introduction.signature}</p>
            <a
              href={profile.socials[0][1]}
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              More of my work on GitHub <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <ProfileOverview />
        <GitHubPersonality />
        <Services />
      </div>
    </>
  );
}
function Services() {
  const icons = { code: Code2, design: Layers3, app: Smartphone, pen: PenTool };
  return (
    <section className="services-section">
      <div className="section-title">
        <div>
          <p className="eyebrow">DESIGN & DEVELOPMENT</p>
          <h2>What I do</h2>
          <p>
            Clear interfaces, thoughtful visuals, and practical digital
            experiences.
          </p>
        </div>
      </div>
      <div className="services-grid">
        {services.map((service, index) => {
          const Icon = icons[service.icon];
          return (
            <article key={service.title} className="service-card">
              <span className={`service-art service-art-${index}`}>
                <Icon size={30} />
              </span>
              <div>
                <span className="eyebrow">
                  SIDE {String.fromCharCode(65 + index)}
                </span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <div className="service-deliverables">
                  {service.deliverables?.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
function Episodes({ title, items, icon: Icon }) {
  return (
    <section className="episodes-section">
      <div className="section-title">
        <h2>
          <Icon size={22} />
          {title}
        </h2>
        <span>{items.length} episodes</span>
      </div>
      <ol className="episode-list">
        {items.map((item, index) => (
          <li key={item.role}>
            <div className="episode-art">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Icon size={25} />
            </div>
            <div className="episode-info">
              <p className="eyebrow">{item.date}</p>
              <h3>{item.role}</h3>
              <p className="episode-place">{item.place}</p>
              {item.description && (
                <p className="episode-description">{item.description}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
export function ExperiencePage() {
  return (
    <>
      <PageHeading
        eyebrow="EXPERIENCE & SKILLS"
        title="Always building. Always growing."
        description="The journey so far - one chapter at a time."
        icon={BriefcaseBusiness}
      />
      <div className="page-body">
        <Episodes
          title="Experience"
          icon={BriefcaseBusiness}
          items={experience}
        />
        <Episodes title="Education" icon={GraduationCap} items={education} />
        <GitHubSkills />
        <Services />
        <GitHubProjects />
        <div className="experience-note">
          <Code2 size={20} />
          <div>
            <strong>Curiosity is always in the rotation.</strong>
            <p>
              My toolkit reflects the technologies listed on my GitHub profile.
              Individual project stacks link to their public source
              repositories.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyError(false);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyError(true);
    }
  }
  return (
    <>
      <PageHeading
        eyebrow="CONTACT / SOCIALS"
        title="Let’s make a great mix."
        description="Have an idea? Let’s make it happen."
        icon={Mail}
      />
      <div className="page-body">
        <div className="contact-layout">
          <div className="contact-copy">
            <h2>Let’s connect.</h2>
            <p>
              A project, an opportunity, or just a hello.
              <br />
              I’d love to hear what you’re thinking.
            </p>
            <div className="contact-info">
              <Mail size={18} />
              <div>
                <small>Email</small>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
              <button
                className="icon-button"
                aria-label={copied ? "Email copied" : "Copy email address"}
                onClick={copyEmail}
              >
                {copied ? <Check size={17} /> : <Copy size={17} />}
              </button>
            </div>
            <p className="copy-status" role="status">
              {copied
                ? "Email copied to clipboard."
                : copyError
                  ? "Copy unavailable. Please use the email link."
                  : ""}
            </p>
            <div className="contact-info">
              <Phone size={18} />
              <div>
                <small>Phone</small>
                <a href="tel:+8801628279057">{profile.phone}</a>
              </div>
            </div>
            <div className="contact-info">
              <MapPin size={18} />
              <div>
                <small>Location</small>
                <span>{profile.location}</span>
              </div>
            </div>
            <div className="social-links">
              {profile.socials.map(([name, url]) => (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={name}
                >
                  {name}
                  <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          </div>
          <div className="message-card">
            <p className="eyebrow">THE NEXT TRACK STARTS HERE</p>
            <h2>Send a message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
