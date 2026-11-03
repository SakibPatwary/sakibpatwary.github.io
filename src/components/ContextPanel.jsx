import { ArrowUpRight, Code2, Headphones } from "lucide-react";
import { asset, introduction } from "../content";
import { profile } from "../data";
import { Equalizer } from "./Player";

export default function ContextPanel({ player, onDetails, navigate }) {
  const project = player.current;
  return (
    <aside className="context-panel">
      <div className="context-heading">
        <span>{project ? "Now exploring" : "Behind the mix"}</span>
        <Headphones size={17} />
      </div>
      <button
        className={`context-cover ${!project ? "context-portrait" : ""}`}
        onClick={() => (project ? onDetails(project) : navigate("about"))}
        aria-label={
          project ? `Open ${project.name} details` : "About Sakib Patwary"
        }
      >
        <img
          src={asset(project?.image || "avatar.png")}
          alt={
            project
              ? `${project.name} preview`
              : "Illustrated portrait of Sakib Patwary"
          }
        />
      </button>
      <div className="context-title">
        <h2>{project?.name || "Sakib Patwary"}</h2>
        <Equalizer playing={player.playing} />
      </div>
      <p className="context-subtitle">
        {project?.category || "Developer. Designer. Problem solver."}
      </p>
      <div className="context-card">
        <p className="eyebrow">
          {project ? "FROM THE COLLECTION" : "ABOUT THE ARTIST"}
        </p>
        <h3>
          {project
            ? "Built with purpose."
            : "A creative eye. A developer’s mind."}
        </h3>
        <p>{introduction.description}</p>
        <button
          className="outline-pill"
          onClick={() => (project ? onDetails(project) : navigate("about"))}
        >
          {project ? "Explore project" : "Read biography"}
          <ArrowUpRight size={13} />
        </button>
      </div>
      <div className="context-connect">
        <Code2 size={18} />
        <div>
          <strong>Let’s build something.</strong>
          <p>Bring your next idea to life.</p>
        </div>
        <a href="#contact" aria-label="Contact Sakib">
          <ArrowUpRight size={18} />
        </a>
      </div>
      <p className="context-caption">
        A portfolio you can explore on repeat.
        <br />
        {profile.location}
      </p>
    </aside>
  );
}
