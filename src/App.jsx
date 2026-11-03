import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  m,
  LazyMotion,
  domAnimation,
  MotionConfig,
} from "framer-motion";
import Sidebar from "./components/Sidebar";
import LibraryPage from "./components/LibraryPage";
import Topbar from "./components/Topbar";
import Intro from "./components/Intro";
import HomePage from "./components/HomePage";
import ProjectsPage from "./components/ProjectsPage";
import {
  AboutPage,
  ExperiencePage,
  ContactPage,
} from "./components/ProfilePages";
import Player from "./components/Player";
import ProjectDrawer from "./components/ProjectDrawer";
import TrackList from "./components/TrackList";
import ContextPanel from "./components/ContextPanel";
import usePlayer from "./hooks/usePlayer";
import useLibrary from "./hooks/useLibrary";
import projects from "./projects.json";
import { filterProjects } from "./player-utils";

const SpotifyPlaylist = lazy(() => import("./components/SpotifyPlaylist"));

const pages = [
  "home",
  "projects",
  "experience",
  "about",
  "contact",
  "music",
  "library",
];
function route() {
  const value = window.location.hash.slice(1);
  return pages.includes(value) ? value : value === "work" ? "projects" : "home";
}
export default function App() {
  const [page, setPage] = useState(route);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [savedOnly, setSavedOnly] = useState(false);
  const [selected, setSelected] = useState(null);
  const main = useRef(null);
  const player = usePlayer(projects);
  const { liked, toggleLike } = useLibrary(projects);
  useEffect(() => {
    if (page === "music") player.pause();
  }, [page, player.pause]);
  useEffect(() => {
    const change = () => setPage(route());
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  useEffect(() => {
    main.current?.scrollTo({ top: 0 });
    document.title = `${page === "home" ? "Sakib Patwary" : page === "about" ? "About Sakib" : page === "projects" ? "All Projects" : page === "experience" ? "Experience & Skills" : page === "music" ? "My Playlist" : page === "library" ? "Your library" : "Contact / Socials"} - s.patwary`;
  }, [page]);
  const navigate = (next) => {
    if (route() === next) {
      setPage(next);
      main.current?.scrollTo({ top: 0, behavior: "smooth" });
    } else window.location.hash = next;
  };
  function search(value) {
    setQuery(value);
    setCategory("All");
    setSavedOnly(false);
    navigate("projects");
  }
  const filtered = filterProjects(projects, {
    category,
    query,
    savedOnly,
    liked,
  });
  const trackProps = { player, liked, toggleLike, onDetails: setSelected };
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <Intro />
        <a
          className="skip-link"
          href="#main"
          onClick={(event) => {
            event.preventDefault();
            main.current?.focus();
          }}
        >
          Skip to content
        </a>
        <div className="app-shell">
          <Sidebar
            page={page}
            category={category}
            setCategory={setCategory}
            navigate={navigate}
            likedCount={liked.length}
            savedOnly={savedOnly}
            setSavedOnly={setSavedOnly}
            setQuery={setQuery}
          />
          <Topbar query={query} onSearch={search} navigate={navigate} />
          <div className="workspace">
            <main className="content-scroll" id="main" ref={main} tabIndex={-1}>
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  className="route-content"
                  key={page}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  {page === "home" && (
                    <HomePage
                      projects={projects}
                      {...trackProps}
                      navigate={navigate}
                      trackList={
                        <TrackList
                          projects={projects.slice(0, 5)}
                          {...trackProps}
                          compact
                        />
                      }
                    />
                  )}
                  {page === "projects" && (
                    <ProjectsPage
                      projects={filtered}
                      allProjects={projects}
                      navigate={navigate}
                      category={category}
                      setCategory={setCategory}
                      query={query}
                      setQuery={setQuery}
                      savedOnly={savedOnly}
                      setSavedOnly={setSavedOnly}
                      {...trackProps}
                    />
                  )}
                  {page === "music" && (
                    <Suspense
                      fallback={
                        <div className="page-body loading-panel" role="status">
                          Loading the music collection…
                        </div>
                      }
                    >
                      <SpotifyPlaylist />
                    </Suspense>
                  )}
                  {page === "library" && (
                    <LibraryPage
                      page={page}
                      category={category}
                      navigate={navigate}
                      likedCount={liked.length}
                      savedOnly={savedOnly}
                      setSavedOnly={setSavedOnly}
                      setCategory={setCategory}
                      setQuery={setQuery}
                    />
                  )}
                  {page === "about" && <AboutPage />}
                  {page === "experience" && <ExperiencePage />}
                  {page === "contact" && <ContactPage />}
                  <footer className="page-footer">
                    <span>
                      © {new Date().getFullYear()} Sakib Patwary. Built with
                      intention.
                    </span>
                    <span>
                      Independent portfolio · Spotify-inspired interface
                    </span>
                  </footer>
                </m.div>
              </AnimatePresence>
            </main>
            <ContextPanel
              player={player}
              onDetails={setSelected}
              navigate={navigate}
            />
          </div>
          <Player {...trackProps} navigate={navigate} />
        </div>
        {selected && (
          <ProjectDrawer
            project={selected}
            onClose={() => setSelected(null)}
            {...trackProps}
          />
        )}
      </LazyMotion>
    </MotionConfig>
  );
}
