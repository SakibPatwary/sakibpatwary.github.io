import { ArrowUpRight, Home, Search, X } from "lucide-react";
import { asset } from "../content";

export default function Topbar({ query, onSearch, navigate }) {
  return (
    <header className="topbar">
      <div className="topbar-start">
        <button
          className="round-button"
          onClick={() => navigate("home")}
          aria-label="Go to home"
        >
          <Home size={19} />
        </button>
        <form
          className="search"
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            navigate("projects");
          }}
        >
          <Search size={19} />
          <input
            aria-label="Search projects"
            value={query}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="What do you want to explore?"
          />
          {query && (
            <button
              type="button"
              onClick={() => onSearch("")}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
          <span className="search-shortcut">17 projects</span>
        </form>
      </div>
      <div className="topbar-end">
        <a className="contact-pill" href="#contact">
          Let’s connect <ArrowUpRight size={14} />
        </a>
        <a
          className="profile-button"
          href="#about"
          aria-label="About Sakib Patwary"
        >
          <img src={asset("avatar.png")} alt="" />
        </a>
      </div>
    </header>
  );
}
