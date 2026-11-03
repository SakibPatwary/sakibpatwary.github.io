import {
  Home,
  Library,
  ListMusic,
  BriefcaseBusiness,
  Send,
  Plus,
  ArrowUpRight,
  AudioLines,
  Music2,
} from "lucide-react";
import { profile } from "../data";
import { LibraryCollections } from "./LibraryPage";

export default function Sidebar({
  page,
  category,
  setCategory,
  navigate,
  likedCount,
  savedOnly,
  setSavedOnly,
  setQuery,
}) {
  function collection(value) {
    setQuery("");
    setCategory(value);
    setSavedOnly(false);
    navigate("projects");
  }
  return (
    <aside className="sidebar">
      <a className="wordmark" href="#home">
        <AudioLines size={29} />
        <span>
          s<span className="green">.</span>patwary
        </span>
        <span className="portfolio-label">PORTFOLIO</span>
      </a>
      <nav aria-label="Main navigation" className="main-navigation">
        {[
          ["home", Home, "Home"],
          ["projects", ListMusic, "All Projects"],
          ["experience", BriefcaseBusiness, "Experience & Skills"],
          ["music", Music2, "My Playlist"],
          ["contact", Send, "Contact / Socials"],
        ].map(([id, Icon, label]) => (
          <a
            href={`#${id}`}
            key={id}
            aria-current={page === id ? "page" : undefined}
            onClick={() => {
              setSavedOnly(false);
              setQuery("");
              if (id === "projects") setCategory("All");
            }}
          >
            <Icon size={21} />
            <span>{label}</span>
          </a>
        ))}
      </nav>
      <div className="library-heading">
        <span>
          <Library size={20} />
          Your library
        </span>
        <button
          className="icon-button"
          onClick={() => navigate("contact")}
          aria-label="Start a new project"
        >
          <Plus size={19} />
        </button>
      </div>
      <div className="library-pills">
        <button onClick={() => collection("All")}>Playlists</button>
        <button onClick={() => navigate("experience")}>About the artist</button>
      </div>
      <LibraryCollections
        page={page}
        category={category}
        navigate={navigate}
        likedCount={likedCount}
        savedOnly={savedOnly}
        setSavedOnly={setSavedOnly}
        setCategory={setCategory}
        setQuery={setQuery}
      />
      <div className="sidebar-bottom">
        <div className="sidebar-note">
          <span className="eyebrow">GOT SOMETHING IN MIND?</span>
          <h3>Let’s make a great mix.</h3>
          <p>A project, an opportunity, or just a hello.</p>
          <a href="#contact">
            Let’s talk <ArrowUpRight size={15} />
          </a>
        </div>
        <p>Made with intention in Dhaka.</p>
        <div className="sidebar-socials">
          {profile.socials.slice(0, 2).map(([name, url]) => (
            <a href={url} target="_blank" rel="noopener noreferrer" key={name}>
              {name}
              <ArrowUpRight size={11} />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
