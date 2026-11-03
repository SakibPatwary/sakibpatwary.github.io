import { Heart, ListMusic, ArrowUpRight, Library } from "lucide-react";
import projects from "../projects.json";
import { PageHeading } from "./ProfilePages";

export function LibraryCollections({
  page,
  category,
  navigate,
  likedCount,
  savedOnly,
  setSavedOnly,
  setCategory,
  setQuery,
}) {
  function open(category, liked = false) {
    setQuery("");
    setCategory(category);
    setSavedOnly(liked);
    navigate("projects");
  }
  const collections = [
    [
      "All",
      "The complete collection",
      `${projects.length} projects · Curated by Sakib`,
      "collection-all",
    ],
    [
      "Business",
      "Built for business",
      "Web development · Playlist",
      "collection-business",
    ],
    [
      "Education",
      "A world of possibilities",
      "Education · Playlist",
      "collection-education",
    ],
    [
      "Travel & lifestyle",
      "Places & experiences",
      "Travel & lifestyle · Playlist",
      "collection-travel",
    ],
    [
      "Portfolio",
      "Personal portfolios",
      "Individual voices · Playlist",
      "collection-portfolio",
    ],
    [
      "Applications",
      "Application interfaces",
      "Software & dashboards · Playlist",
      "collection-apps",
    ],
  ];
  return (
    <>
      <button
        className={`library-item ${savedOnly ? "selected" : ""}`}
        onClick={() => open("All", true)}
      >
        <span className="collection-art liked-art">
          <Heart size={22} fill="currentColor" />
        </span>
        <span>
          <strong>Liked projects</strong>
          <small>Top picks · {likedCount} projects</small>
        </span>
      </button>
      {collections.map(([value, title, subtitle, art]) => (
        <button
          key={value}
          className={`library-item ${page === "projects" && !savedOnly && category === value ? "selected" : ""}`}
          onClick={() => open(value)}
        >
          <span className={`collection-art ${art}`}>
            <ListMusic size={23} />
          </span>
          <span>
            <strong>{title}</strong>
            <small>{subtitle}</small>
          </span>
        </button>
      ))}
    </>
  );
}
export default function LibraryPage(props) {
  return (
    <>
      <PageHeading
        eyebrow="YOUR LIBRARY"
        title="A collection worth exploring."
        description="My work, organized into playlists. Find your next favorite."
        icon={Library}
      />
      <div className="page-body library-page">
        <div className="section-title">
          <div>
            <p className="eyebrow">MADE FOR YOU</p>
            <h2>Project playlists</h2>
            <p>
              Start with my top picks, then make the collection your own using
              the heart buttons.
            </p>
          </div>
        </div>
        <div className="library-page-grid">
          <LibraryCollections {...props} />
        </div>
        <a className="library-about-link" href="#about">
          Get to know the person behind the projects <ArrowUpRight size={15} />
        </a>
      </div>
    </>
  );
}
