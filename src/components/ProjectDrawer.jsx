import { useEffect, useRef } from "react";
import { ArrowUpRight, Heart, Play, X, Code2, Globe } from "lucide-react";
import { asset } from "../content";

export default function ProjectDrawer({
  project,
  onClose,
  player,
  liked,
  toggleLike,
}) {
  const dialog = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    element.showModal();
    return () => element.close();
  }, []);
  return (
    <dialog
      ref={dialog}
      className="project-drawer"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose();
        }
      }}
      aria-labelledby="drawer-title"
    >
      <div className="drawer-top">
        <span>BEHIND THE TRACK</span>
        <button
          className="round-button"
          onClick={onClose}
          aria-label="Close project details"
        >
          <X size={19} />
        </button>
      </div>
      <div className="drawer-art">
        <img
          src={asset(project.image)}
          alt={`${project.name} website preview`}
        />
      </div>
      <div className="drawer-body">
        <p className="eyebrow">
          {project.category} · PROJECT {String(project.id + 1).padStart(2, "0")}
        </p>
        <h2 id="drawer-title">{project.name}</h2>
        <p className="muted">From the Sakib Patwary collection.</p>
        <div className="drawer-actions">
          <a
            className="button primary"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit website <ArrowUpRight size={17} />
          </a>
          <button
            className="round-button"
            aria-label={`Play ${project.name} tour`}
            onClick={() => player.select(project)}
          >
            <Play size={18} fill="currentColor" />
          </button>
          <button
            className={`round-button ${liked.includes(project.id) ? "active" : ""}`}
            aria-label="Save project"
            aria-pressed={liked.includes(project.id)}
            onClick={() => toggleLike(project.id)}
          >
            <Heart
              size={18}
              fill={liked.includes(project.id) ? "currentColor" : "none"}
            />
          </button>
        </div>
        {project.repositoryUrl && (
          <a
            className="text-link project-repository"
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View source on GitHub <ArrowUpRight size={14} />
          </a>
        )}
        <h3>Project overview</h3>
        <p>
          {project.description ||
            `${project.category === "Applications" ? "An application project" : "A website project"} in the ${project.category.toLowerCase()} collection. Explore the original website and preview from my portfolio.`}
        </p>
        {project.role && (
          <section className="case-study-section">
            <h3>My role</h3>
            <p>{project.role}</p>
          </section>
        )}
        {project.outcomes?.length > 0 && (
          <section className="case-study-section">
            <h3>Outcomes</h3>
            <ul>
              {project.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </section>
        )}
        <div className="project-facts">
          <div>
            <Globe size={18} />
            <span>
              Original destination
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                {project.url} <ArrowUpRight size={12} />
              </a>
            </span>
          </div>
          <div>
            <Code2 size={18} />
            <span>
              Technology stack
              <span
                className={`stack-status stack-${project.stackStatus || "unknown"}`}
              >
                {project.stackStatus === "suggested"
                  ? "Suggested · please verify"
                  : project.stackStatus === "observed"
                    ? "Observed on live site"
                    : "Repository verified"}
              </span>
              <strong>
                {project.stack?.length
                  ? project.stack.join(" · ")
                  : "Not specified in the original portfolio"}
              </strong>
              {project.stackNote && (
                <small className="stack-evidence-note">
                  {project.stackNote}
                </small>
              )}
              {project.stackSource && (
                <a
                  className="stack-source"
                  href={project.stackSource}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View stack source <ArrowUpRight size={12} />
                </a>
              )}
            </span>
          </div>
        </div>
        {!project.description && (
          <p className="drawer-footnote">
            The original portfolio includes this project’s name, preview, and
            link. A detailed case study has not been published.
          </p>
        )}
      </div>
    </dialog>
  );
}
