import {
  ArrowUpRight,
  Github,
  Code2,
  Compass,
  Gamepad2,
  Sprout,
} from "lucide-react";
import { github } from "../github";

export function StackPreview() {
  return (
    <section className="stack-preview">
      <div>
        <span className="eyebrow">MY EVERYDAY ROTATION</span>
        <h2>Tools behind the tracks</h2>
      </div>
      <div className="skill-chips">
        {github.featuredStack.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
      <a href="#experience">
        Explore my stack <ArrowUpRight size={15} />
      </a>
    </section>
  );
}
export function GitHubSkills() {
  return (
    <section className="github-skills">
      <div className="section-title">
        <div>
          <p className="eyebrow">FROM MY GITHUB PROFILE</p>
          <h2>My technology rotation</h2>
          <p>Languages, frameworks, and tools in my creative toolkit.</p>
        </div>
        <a
          href={github.readmeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="github-source"
        >
          View profile <ArrowUpRight size={13} />
        </a>
      </div>
      <div className="skill-groups">
        {github.skillGroups.map((group, index) => (
          <article className="skill-group" key={group.title}>
            <span
              className={`skill-group-art skill-color-${index % 3}`}
              aria-hidden="true"
            >
              {group.code}
            </span>
            <div>
              <h3>{group.title}</h3>
              <div className="skill-chips">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="learning-card">
        <Sprout size={22} />
        <div>
          <p className="eyebrow">NEXT IN THE QUEUE</p>
          <h3>Learning {github.learning.join(" & ")}</h3>
          <p>
            Exploring mobile development alongside my focus on {github.focus}.
          </p>
        </div>
      </div>
    </section>
  );
}
export function GitHubPersonality() {
  return (
    <section className="github-personality" aria-label="More about Sakib">
      <div>
        <Code2 size={19} />
        <span>
          In focus<strong>{github.focus}</strong>
        </span>
      </div>
      <div>
        <Compass size={19} />
        <span>
          Off the clock<strong>I love to travel.</strong>
        </span>
      </div>
      <div>
        <Gamepad2 size={19} />
        <span>
          Also on repeat<strong>Video games.</strong>
        </span>
      </div>
    </section>
  );
}
export function GitHubProjects() {
  return (
    <section className="github-projects">
      <div className="section-title">
        <div>
          <p className="eyebrow">ANOTHER SIDE OF THE COLLECTION</p>
          <h2>From my GitHub</h2>
        </div>
        <a
          className="github-source"
          href={`${github.profileUrl}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
        >
          All repositories <ArrowUpRight size={13} />
        </a>
      </div>
      <div className="repo-grid">
        {github.repositories.map((repo, index) => (
          <article className="repo-card" key={repo.slug}>
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`repo-art skill-color-${index}`}
              aria-label={`View ${repo.name} on GitHub`}
            >
              <span>{repo.monogram}</span>
              <Github size={20} />
            </a>
            <div className="repo-info">
              <a href={repo.url} target="_blank" rel="noopener noreferrer">
                <h3>{repo.name}</h3>
                <ArrowUpRight size={14} />
              </a>
              <p>{repo.description}</p>
              <div className="skill-chips">
                {repo.stack.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
              <a
                className="repo-source"
                href={repo.stackSource}
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.source ? "View dependencies" : "View repository"}{" "}
                <ArrowUpRight size={11} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
