import assert from "node:assert/strict";
import test from "node:test";
import { publicPlaylists } from "../src/spotify.js";
import { profile, spotifyPlaylist } from "../src/data.js";
test("Spotify collection retains all eight playlists with Penguine third and PATWARY as default", () => {
  assert.equal(publicPlaylists.length, 8);
  assert.equal(new Set(publicPlaylists.map((playlist) => playlist.id)).size, 8);
  assert.equal(publicPlaylists[2].id, "6N2EZSYF3mJgnafOSLrY7m");
  assert.equal(publicPlaylists[0].id, spotifyPlaylist.id);
  publicPlaylists.forEach((playlist) => {
    assert.match(playlist.id, /^[A-Za-z0-9]{22}$/);
    assert.equal(
      new URL(playlist.embedUrl).pathname,
      `/embed/playlist/${playlist.id}`,
    );
  });
});
test("Discord uses the exact supplied URL alongside the existing public profiles", () => {
  assert.ok(
    profile.socials.some(
      ([name, url]) =>
        name === "Discord" && url === "https://discord.com/users/patwary",
    ),
  );
  assert.equal(profile.discord, "patwary");
  assert.ok(profile.socials.some(([name]) => name === "Google Developer"));
});
