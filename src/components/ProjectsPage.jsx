import { Heart, Play, Search, Shuffle } from "lucide-react";
import { PageHeading } from "./ProfilePages";
import TrackList from "./TrackList";
import { LibraryCollections } from "./LibraryPage";

export default function ProjectsPage({
  projects,
  allProjects,
  category,
  setCategory,
  query,
  setQuery,
  savedOnly,
  setSavedOnly,
  player,
  liked,
  toggleLike,
  onDetails,
  navigate,
}) {
  return (
    <>
      <section
        className="mobile-project-library"
        aria-labelledby="mobile-library-title"
      >
        <div className="mobile-library-heading">
          <h2 id="mobile-library-title">Your library</h2>
          <span>Swipe to explore</span>
        </div>
        <div className="mobile-library-strip">
          <LibraryCollections
            page="projects"
            category={category}
            navigate={navigate}
            likedCount={liked.length}
            savedOnly={savedOnly}
            setSavedOnly={setSavedOnly}
            setCategory={setCategory}
            setQuery={setQuery}
          />
        </div>
      </section>
      <div className={`playlist-heading ${savedOnly ? "is-liked" : ""}`}>
        <div className="playlist-cover">
          {savedOnly ? (
            <Heart size={58} fill="currentColor" />
          ) : (
            <span>
              ALL
              <br />
              THE
              <br />
              <i>BUILDS.</i>
            </span>
          )}
          <small>SAKIB PATWARY · COLLECTION 01</small>
        </div>
        <div>
          <p className="eyebrow">
            {savedOnly
              ? "SAKIB’S TOP PICKS · YOUR COLLECTION"
              : "THE COMPLETE COLLECTION"}
          </p>
          <h1>{savedOnly ? "Liked projects" : "All Projects"}</h1>
          <p>
            {savedOnly
              ? "A handpicked starting mix of my top projects. Use the hearts to make it your own."
              : "A selection of websites and digital experiences."}
          </p>
          <div className="playlist-meta">
            <span className="mini-avatar">S</span>
            <strong>Sakib Patwary</strong>
            <span>· {projects.length} projects</span>
            <span>· 30-second tour previews</span>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="playlist-toolbar">
          <button
            className="large-play"
            aria-label="Play filtered collection"
            disabled={!projects.length}
            onClick={() => player.playCollection(projects)}
          >
            <Play size={23} fill="currentColor" />
          </button>
          <button
            className="icon-button"
            aria-label="Shuffle filtered collection"
            disabled={!projects.length}
            onClick={() => player.playCollection(projects, true)}
          >
            <Shuffle size={24} />
          </button>
          <p>Different industries. The same attention to detail.</p>
        </div>
        <div className="project-filters" aria-label="Project categories">
          {[
            "All",
            ...new Set(allProjects.map((project) => project.category)),
          ].map((value) => (
            <button
              aria-pressed={category === value}
              key={value}
              onClick={() => setCategory(value)}
            >
              {value}
            </button>
          ))}
          {savedOnly && (
            <button className="clear-saved" onClick={() => setSavedOnly(false)}>
              Show all projects
            </button>
          )}
        </div>
        {query && (
          <div className="search-summary" role="status">
            <Search size={16} />
            <span>
              {projects.length} results for “{query}”
            </span>
            <button onClick={() => setQuery("")}>Clear search</button>
          </div>
        )}
        <TrackList
          projects={projects}
          player={player}
          liked={liked}
          toggleLike={toggleLike}
          onDetails={onDetails}
        />
        <p className="playlist-footnote">
          Durations represent guided project previews. Use a track title to open
          its details, or the play icon to explore the collection.
        </p>
      </div>
    </>
  );
}
