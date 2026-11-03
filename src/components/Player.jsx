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
} from "lucide-react";
import { asset, TOUR_DURATION, formatTime } from "../content";

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
}) {
  const project = player.current;
  return (
    <footer className="player" aria-label="Portfolio player">
      <div className="now-playing">
        <button
          className="player-art"
          onClick={() => (project ? onDetails(project) : navigate("about"))}
          aria-label={
            project ? `Open ${project.name} details` : "Read about Sakib"
          }
        >
          <img src={asset(project?.image || "avatar.png")} alt="" />
          <span>
            <Maximize2 size={14} />
          </span>
        </button>
        <div className="now-playing-text">
          <strong title={project?.name || "Sakib Patwary - Portfolio Mix"}>
            {project?.name || "Sakib Patwary - Portfolio Mix"}
          </strong>
          <span>
            Sakib Patwary · {project?.category || "The developer collection"}
          </span>
        </div>
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
            onChange={(event) => player.setProgress(Number(event.target.value))}
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
          title="Optional synthesized ambient sound"
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
  );
}
