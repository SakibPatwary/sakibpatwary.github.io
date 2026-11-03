import { useRef, useState } from "react";
import { ArrowUpRight, Headphones, Music2, Play, Check } from "lucide-react";
import { spotifyPlaylist } from "../data";
import { spotifyProfile, publicPlaylists, featuredArtists } from "../spotify";
import { PageHeading } from "./ProfilePages";

function SpotifyArtwork({ src, alt, profile = false }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={`spotify-artwork ${profile ? "spotify-profile-art" : ""}`}>
      {failed ? (
        <Music2 size={32} aria-label={alt} />
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
export default function SpotifyPlaylist() {
  const [selected, setSelected] = useState(
    () =>
      publicPlaylists.find((playlist) => playlist.id === spotifyPlaylist.id) ||
      publicPlaylists[0],
  );
  const embed = useRef(null);
  function selectPlaylist(playlist) {
    setSelected(playlist);
    embed.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }
  return (
    <>
      <PageHeading
        eyebrow="MY SPOTIFY · ON REPEAT"
        title="A soundtrack for the scroll."
        description="The music behind the code. Pick a playlist and stay a while."
        icon={Music2}
      />
      <div className="page-body spotify-page">
        <section
          className="spotify-profile-card"
          aria-label="Public Spotify profile"
        >
          <SpotifyArtwork
            src={spotifyProfile.image}
            alt="PATWARY’s public Spotify profile photo"
            profile
          />
          <div>
            <p className="eyebrow">SAKIB PATWARY ON SPOTIFY</p>
            <h2>{spotifyProfile.name}</h2>
            <div className="spotify-profile-stats">
              <span>
                <strong>{publicPlaylists.length}</strong> public playlists
              </span>
              <span>
                <strong>{spotifyProfile.followers}</strong> followers
              </span>
              <span>
                <strong>{spotifyProfile.following}</strong> following
              </span>
            </div>
            <a
              className="outline-pill"
              href={spotifyProfile.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Spotify profile <ArrowUpRight size={14} />
            </a>
          </div>
        </section>
        <p className="spotify-snapshot">
          Public profile snapshot ·{" "}
          <time dateTime={spotifyProfile.reviewedOn}>
            {spotifyProfile.reviewedLabel}
          </time>
        </p>
        <div ref={embed} className="spotify-player-section">
          <div className="section-title">
            <div>
              <p className="eyebrow">NOW SELECTED</p>
              <h2>{selected.name}</h2>
              <p role="status">
                Listen to {selected.name} in the Spotify player below.
              </p>
            </div>
            <a
              className="github-source"
              href={selected.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Spotify <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="spotify-embed">
            <iframe
              key={selected.id}
              title="Sakib Patwary’s Spotify playlist"
              aria-label={`${selected.name} - Spotify playlist player`}
              src={selected.embedUrl}
              width="100%"
              height="452"
              style={{ border: 0, borderRadius: 12 }}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
        <section className="spotify-collection">
          <div className="section-title">
            <div>
              <p className="eyebrow">FROM MY PUBLIC PROFILE</p>
              <h2>Find your next listen</h2>
              <p>Eight playlists. Pick one to load its player above.</p>
            </div>
          </div>
          <div className="spotify-playlist-grid">
            {publicPlaylists.map((playlist) => (
              <article
                key={playlist.id}
                className={`spotify-playlist-card ${selected.id === playlist.id ? "selected" : ""}`}
              >
                <button
                  onClick={() => selectPlaylist(playlist)}
                  aria-label={`Listen to ${playlist.name}`}
                  aria-pressed={selected.id === playlist.id}
                >
                  <SpotifyArtwork
                    src={playlist.image}
                    alt={`${playlist.name} playlist cover`}
                  />
                  <span className="spotify-card-play">
                    {selected.id === playlist.id ? (
                      <Check size={20} />
                    ) : (
                      <Play size={20} fill="currentColor" />
                    )}
                  </span>
                  <strong>{playlist.name}</strong>
                  <small>
                    {selected.id === playlist.id
                      ? "Selected playlist"
                      : "Public playlist"}
                  </small>
                </button>
                <a
                  href={playlist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${playlist.name} in Spotify`}
                >
                  Open in Spotify <ArrowUpRight size={11} />
                </a>
              </article>
            ))}
          </div>
        </section>
        <section className="spotify-artists">
          <div className="section-title">
            <div>
              <p className="eyebrow">SELECTED BY SAKIB</p>
              <h2>My artist picks</h2>
              <p>
                A few artists from my listening rotation. Explore their music on
                Spotify.
              </p>
            </div>
          </div>
          <div className="spotify-artist-list">
            {featuredArtists.map((artist) => (
              <a
                key={artist.url}
                href={artist.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  {artist.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <strong>{artist.name}</strong>
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </section>
        <div className="spotify-listening-note">
          <Headphones size={20} />
          <div>
            <strong>Your music, played by Spotify.</strong>
            <p>
              Use the embedded player for music. The bottom bar controls the
              portfolio project tour.
            </p>
            <p>
              Playback availability depends on Spotify and your browser. If the
              player doesn’t load,{" "}
              <a href={selected.url} target="_blank" rel="noopener noreferrer">
                open the selected playlist in Spotify <ArrowUpRight size={11} />
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
