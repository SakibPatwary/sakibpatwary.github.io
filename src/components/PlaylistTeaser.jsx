import { ArrowUpRight, Headphones } from "lucide-react";
import { publicPlaylists } from "../spotify";

export default function PlaylistTeaser() {
  return (
    <section className="playlist-teaser">
      <span className="playlist-teaser-art">
        <Headphones size={28} />
      </span>
      <div>
        <p className="eyebrow">THE SOUNDTRACK BEHIND THE CODE</p>
        <h2>My playlists. Your next listen.</h2>
        <p>
          Explore {publicPlaylists.length} public playlists from my Spotify
          collection.
        </p>
      </div>
      <a href="#music" className="outline-pill">
        Listen here <ArrowUpRight size={15} />
      </a>
    </section>
  );
}
