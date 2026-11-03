import { Clock3, Heart, Play, Search } from "lucide-react";
import { asset, TOUR_DURATION, formatTime } from "../content";
import { Equalizer } from "./Player";

export default function TrackList({
  projects,
  player,
  liked,
  toggleLike,
  onDetails,
  compact = false,
}) {
  return (
    <div className={`track-list ${compact ? "compact" : ""}`}>
      <div className="track-header">
        <span>#</span>
        <span>Title</span>
        <span>Collection</span>
        <span>Stack / focus</span>
        <span />
        <Clock3 size={15} aria-label="Tour preview duration" />
      </div>
      {projects.map((project, index) => (
        <div
          className={`track-row ${player.current?.id === project.id ? "current-track" : ""}`}
          key={project.id}
        >
          <div className="track-number">
            <span>
              {player.current?.id === project.id && player.playing ? (
                <Equalizer playing small />
              ) : (
                String(index + 1).padStart(2, "0")
              )}
            </span>
            <button
              aria-label={`Play ${project.name} preview`}
              onClick={() => player.select(project)}
            >
              <Play size={15} fill="currentColor" />
            </button>
          </div>
          <button
            className="track-title"
            onClick={() => {
              player.select(project, player.playing);
              onDetails(project);
            }}
            aria-label={`Open ${project.name} details`}
          >
            <img src={asset(project.image)} alt="" loading="lazy" />
            <span>
              <strong>{project.name}</strong>
              <small>Sakib Patwary</small>
            </span>
          </button>
          <span className="track-category">{project.category}</span>
          <span
            className={`track-tags ${project.stackStatus === "suggested" ? "draft-stack" : ""}`}
            title={`${project.stackStatus === "suggested" ? "Suggested - not verified: " : ""}${(project.stack || []).join(", ")}`}
          >
            <span>
              {project.stack?.length
                ? project.stack.slice(0, 2).join(" · ")
                : project.category === "Applications"
                  ? "Application"
                  : "Web development"}
            </span>
          </span>
          <button
            className={`icon-button track-like ${liked.includes(project.id) ? "active" : ""}`}
            aria-label={`${liked.includes(project.id) ? "Unlike" : "Like"} ${project.name}`}
            aria-pressed={liked.includes(project.id)}
            onClick={() => toggleLike(project.id)}
          >
            <Heart
              size={16}
              fill={liked.includes(project.id) ? "currentColor" : "none"}
            />
          </button>
          <span
            className="track-duration"
            title="30-second guided project preview"
          >
            {formatTime(TOUR_DURATION)}
          </span>
        </div>
      ))}
      {!projects.length && (
        <div className="empty-state">
          <Search size={32} />
          <h3>No projects in this mix yet.</h3>
          <p>
            Try another search or category, or save a project using its heart
            button.
          </p>
        </div>
      )}
    </div>
  );
}
