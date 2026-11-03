import {
  ArrowUpRight,
  Check,
  MapPin,
  Play,
  Shuffle,
  Code2,
  AudioLines,
} from "lucide-react";
import { asset, introduction } from "../content";
import { profile } from "../data";
import PlaylistTeaser from "./PlaylistTeaser";
import { StackPreview, GitHubProjects } from "./GitHubSections";

export function ArtistHero({ player, navigate }) {
  return (
    <section className="artist-hero">
      <div className="hero-grain" />
      <div className="hero-main">
        <div className="artist-portrait">
          <img
            src={asset("avatar.png")}
            alt="Illustrated portrait of Sakib Patwary"
            fetchPriority="high"
          />
          <span className="portrait-badge">
            <Code2 size={21} />
          </span>
        </div>
        <div className="artist-info">
          <p className="verified">
            <span>
              <Check size={11} strokeWidth={4} />
            </span>{" "}
            THE DEVELOPER COLLECTION
          </p>
          <h1>
            SAKIB PATWARY<span>.</span>
          </h1>
          <p className="hero-subtitle">{introduction.subtitle}</p>
          <p className="hero-tagline">{introduction.headline}</p>
          <div className="artist-stats">
            <span>
              <MapPin size={12} />
              {profile.location}
            </span>
            <i />
            17 projects
            <i />
            <span>Endlessly curious</span>
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <span>
          <AudioLines size={13} /> IN THE MOOD TO BUILD SOMETHING GREAT.
        </span>
        <span>PERSONAL PORTFOLIO · VOL. 01</span>
      </div>
    </section>
  );
}
export function AlbumCard({ project, onDetails, player }) {
  return (
    <article className="album-card">
      <button
        className="album-cover"
        onClick={() => {
          player.select(project, player.playing);
          onDetails(project);
        }}
        aria-label={`Open ${project.name} details`}
      >
        <img
          src={asset(project.image)}
          alt={`${project.name} website preview`}
          loading="lazy"
        />
      </button>
      <button
        className="album-play"
        onClick={() => player.select(project)}
        aria-label={`Play ${project.name} preview`}
      >
        <Play size={19} fill="currentColor" />
      </button>
      <button className="album-title" onClick={() => onDetails(project)}>
        {project.name}
      </button>
      <p>{project.category} · Sakib Patwary</p>
    </article>
  );
}
export default function HomePage({
  projects,
  player,
  onDetails,
  navigate,
  trackList,
}) {
  return (
    <>
      <ArtistHero player={player} navigate={navigate} />
      <div className="page-body">
        <div className="artist-controls">
          <button
            className="large-play"
            onClick={player.toggle}
            aria-label={
              player.playing ? "Pause portfolio tour" : "Play portfolio tour"
            }
          >
            {player.playing ? (
              <span className="pause-bars">
                <i />
                <i />
              </span>
            ) : (
              <Play size={23} fill="currentColor" />
            )}
          </button>
          <button
            className={`icon-button shuffle-large ${player.shuffle ? "active" : ""}`}
            onClick={player.startShuffle}
            aria-label="Shuffle projects"
          >
            <Shuffle size={25} />
          </button>
          <a className="outline-pill" href="#contact">
            Let’s build something <ArrowUpRight size={13} />
          </a>
          <span className="tour-hint">
            <span className={`live-dot ${player.playing ? "pulsing" : ""}`} />
            {player.playing
              ? "Exploring the collection"
              : "Press play. Explore my work."}
          </span>
        </div>
        <div className="section-title">
          <div>
            <p className="eyebrow">CURATED BY SAKIB</p>
            <h2>Made to stand out</h2>
          </div>
          <button onClick={() => navigate("projects")}>
            Show all <ArrowUpRight size={13} />
          </button>
        </div>
        <div className="album-grid">
          {[projects[0], projects[6], projects[2], projects[16]].map(
            (project) => (
              <AlbumCard
                key={project.id}
                project={project}
                onDetails={onDetails}
                player={player}
              />
            ),
          )}
        </div>
        <div className="section-title tracks-heading">
          <div>
            <h2>Popular projects</h2>
            <p>Different industries. The same attention to detail.</p>
          </div>
          <button onClick={() => navigate("projects")}>
            View discography <ArrowUpRight size={13} />
          </button>
        </div>
        {trackList}
        <PlaylistTeaser />
        <StackPreview />
        <GitHubProjects />
        <div className="home-about">
          <div>
            <p className="eyebrow">BEHIND THE CODE</p>
            <h2>
              Creative by nature.
              <br />
              Developer by craft.
            </h2>
            <p>{introduction.description}</p>
            <a href="#about" className="outline-pill">
              About the artist <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="about-disc">
            <span>sp.</span>
            <i />
            <small>GOOD DESIGN MEETS CLEAN CODE</small>
          </div>
        </div>
      </div>
    </>
  );
}
