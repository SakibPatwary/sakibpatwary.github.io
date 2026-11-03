import {
  Heart,
  ListMusic,
  Maximize2,
  Pause,
  Play,
  Repeat2,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ChevronDown,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { asset, TOUR_DURATION, formatTime, introduction } from "../content";

export function Equalizer({ playing, small = false }) {
  return (
    <span
      className={`equalizer ${playing ? "is-playing" : ""} ${small ? "small" : ""}`}
      aria-hidden="true"
    >
      {[0, 1, 2, 3].map((i) => (
        <i key={i} style={{ animationDelay: `${i * -0.17}s` }} />
      ))}
    </span>
  );
}
export default function Player({
  player,
  liked,
  toggleLike,
  onDetails,
  navigate,
  expanded = false,
}) {
  const project = player.current;
  const [open, setOpen] = useState(false);
  const dialog = useRef(null);
  useEffect(() => {
    if (
      !expanded &&
      player.playing &&
      window.matchMedia("(max-width: 700px)").matches
    ) {
      setOpen(true);
    }
  }, [player.playing, expanded]);
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    element.showModal();
    return () => element.close();
  }, [open]);
  const openDetails = () => {
    if (!expanded && window.matchMedia("(max-width: 1100px)").matches)
      setOpen(true);
    else if (project) onDetails(project);
    else navigate("about");
  };
  return (
    <>
      <footer
        className={`player ${expanded ? "expanded-player" : ""}`}
        aria-label={expanded ? "Expanded portfolio player" : "Portfolio player"}
      >
        <div className="now-playing">
          <button
            className="player-art"
            onClick={openDetails}
            aria-label={
              project ? `Open ${project.name} details` : "Read about Sakib"
            }
          >
            <img src={asset(project?.image || "avatar.png")} alt="" />
            <span>
              <Maximize2 size={14} />
            </span>
          </button>
          <button
            className="now-playing-text player-title-button"
            onClick={openDetails}
            aria-label={
              expanded
                ? "Open project details"
                : "Expand player and project details"
            }
          >
            <strong title={project?.name || "Sakib Patwary - Portfolio Mix"}>
              {project?.name || "Sakib Patwary - Portfolio Mix"}
            </strong>
            <span>
              Sakib Patwary · {project?.category || "The developer collection"}
            </span>
          </button>
          {project && (
            <button
              className={`icon-button like-button ${liked.includes(project.id) ? "active" : ""}`}
              aria-label={
                liked.includes(project.id)
                  ? "Unlike current project"
                  : "Like current project"
              }
              aria-pressed={liked.includes(project.id)}
              onClick={() => toggleLike(project.id)}
            >
              <Heart
                size={17}
                fill={liked.includes(project.id) ? "currentColor" : "none"}
              />
            </button>
          )}
        </div>
        <div className="playback">
          <div className="playback-buttons">
            <button
              className={`icon-button mode-button ${player.shuffle ? "active" : ""}`}
              aria-label="Shuffle tour"
              aria-pressed={player.shuffle}
              onClick={() => player.setShuffle(!player.shuffle)}
            >
              <Shuffle size={17} />
            </button>
            <button
              className="icon-button"
              aria-label="Previous project"
              onClick={() => player.advance(-1)}
            >
              <SkipBack size={19} fill="currentColor" />
            </button>
            <button
              className="play-toggle"
              aria-label={
                player.playing ? "Pause portfolio tour" : "Play portfolio tour"
              }
              onClick={player.toggle}
            >
              {player.playing ? (
                <Pause size={19} fill="currentColor" />
              ) : (
                <Play size={19} fill="currentColor" />
              )}
            </button>
            <button
              className="icon-button"
              aria-label="Next project"
              onClick={() => player.advance(1)}
            >
              <SkipForward size={19} fill="currentColor" />
            </button>
            <button
              className={`icon-button mode-button ${player.repeat ? "active" : ""}`}
              aria-label="Repeat current preview"
              aria-pressed={player.repeat}
              onClick={() => player.setRepeat(!player.repeat)}
            >
              <Repeat2 size={17} />
            </button>
          </div>
          <div className="progress-row">
            <span>{formatTime(player.progress)}</span>
            <input
              aria-label="Project tour progress"
              type="range"
              min="0"
              max={TOUR_DURATION}
              value={player.progress}
              onChange={(event) =>
                player.setProgress(Number(event.target.value))
              }
              style={{
                "--progress": `${(player.progress / TOUR_DURATION) * 100}%`,
              }}
            />
            <span>{formatTime(TOUR_DURATION)}</span>
          </div>
        </div>
        <div className="player-extras">
          <Equalizer playing={player.playing} />
          <span className="tour-label">PROJECT TOUR</span>
          <button
            className="icon-button queue-button"
            aria-label="Open all projects"
            onClick={() => navigate("projects")}
          >
            <ListMusic size={19} />
          </button>
          <button
            className="icon-button volume-button"
            onClick={player.toggleMute}
            aria-label={
              player.volume ? "Mute ambient sound" : "Enable ambient sound"
            }
            title="Soothing piano and warm ambient chords"
          >
            {player.volume ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <input
            className="volume-slider"
            type="range"
            min="0"
            max="100"
            aria-label="Ambient sound volume"
            value={player.volume}
            onChange={(event) => player.changeVolume(event.target.value)}
            style={{ "--progress": `${player.volume}%` }}
          />
        </div>
        <span className="sr-only" role="status">
          {player.audioError}
        </span>
      </footer>
      {!expanded && open && (
        <dialog
          ref={dialog}
          className="mobile-now-playing"
          onCancel={() => setOpen(false)}
          aria-labelledby="now-playing-heading"
        >
          <header className="mobile-player-heading">
            <button
              className="icon-button"
              onClick={() => setOpen(false)}
              aria-label="Minimize player"
            >
              <ChevronDown />
            </button>
            <div>
              <span className="eyebrow">THE DEVELOPER COLLECTION</span>
              <h2 id="now-playing-heading">Now exploring</h2>
            </div>
            <Equalizer playing={player.playing} />
          </header>
          <Player
            player={player}
            liked={liked}
            toggleLike={toggleLike}
            onDetails={(item) => {
              setOpen(false);
              onDetails(item);
            }}
            navigate={(page) => {
              setOpen(false);
              navigate(page);
            }}
            expanded
          />
          <section className="mobile-player-details">
            <p className="eyebrow">BEHIND THE PROJECT</p>
            <h3>{project?.name || "Sakib Patwary"}</h3>
            <p>{project?.description || introduction.description}</p>
            {project?.stack?.length > 0 && (
              <div className="skill-chips">
                {project.stack.map((name) => (
                  <span key={name}>{name}</span>
                ))}
              </div>
            )}
            <button
              className="outline-pill"
              onClick={() => {
                setOpen(false);
                project ? onDetails(project) : navigate("about");
              }}
            >
              {project ? "Explore project" : "Read biography"}
              <Maximize2 size={14} />
            </button>
          </section>
        </dialog>
      )}
    </>
  );
}
