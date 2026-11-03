# s.patwary · The developer collection

Sakib Patwary’s portfolio reimagined as a Spotify-inspired desktop and mobile player. Built with React, Vite, Tailwind CSS v4, Framer Motion, and Lucide icons. It builds to a fully static site for GitHub Pages.

## Run, test, and build

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

`npm run build` produces `dist/`. No server, portfolio account, Spotify API key, or database is needed. `npm run format` formats the source with Prettier.

## Structure

```text
.github/workflows/deploy.yml   GitHub Pages build and deployment
public/assets/images/         Original project previews, portrait, favicon
src/
  App.jsx                     Hash routes and shared portfolio state
  main.jsx                    React entry point
  content.js                  Preserved introduction, biography, services
  data.js                     Personal details, social links, jobs, education
  github.js                   Profile skills, interests, repository links and sources
  projects.json               All 17 original project names, images, links
  player-utils.js             Queue and search/filter behavior
  styles.css                  Tailwind entry, responsive player design, motion
  hooks/
    usePlayer.js              Playback timer, seek, queue, shuffle, repeat, audio
    useLibrary.js             Local saved-project library
  components/
    GitHubSections.jsx        Skills, personal interests, and repository collections
    Intro.jsx                 Animated typing splash with skip control
    Sidebar.jsx               Navigation and playlist-style library
    Topbar.jsx                Global project search and profile navigation
    HomePage.jsx              Artist banner and curated album cards
    ProjectsPage.jsx          Complete collection, filters and saved projects
    TrackList.jsx             Accessible project rows and preview controls
    ProjectDrawer.jsx         Native modal dialog with preview and original link
    ProfilePages.jsx          Biography, career episodes, services, contact
    ContactForm.jsx           Existing EmailJS integration and validation
    ContextPanel.jsx          Desktop “Now exploring” sidebar
    Player.jsx                Persistent player controls and equalizer
 tests/player.test.js          Queue, shuffle, filter and asset verification
index.html                    Metadata and HTML entry point
vite.config.js                React + Tailwind, relative static asset paths
```

## How the player works

- **Play / pause:** starts or pauses a guided project tour, showing one project for 30 seconds. The equalizer animates while playing; the next project loads automatically.
- **Progress slider:** seeks within the current 30-second preview. These durations describe the portfolio tour, not songs or project development time.
- **Previous / next:** changes the selected project. Shuffle avoids immediately repeating the current project; repeat loops the current preview.
- **Volume / mute:** enables an optional, quiet ambient chord synthesized with the Web Audio API. Sound is off initially and only starts after a visitor enables it. No copyrighted music or external audio files are included. Volume controls the synthesized audio; muting does not pause the visual project tour.
- **Project titles / album covers:** open a native modal drawer, including its original preview and destination. Escape closes the drawer; the browser traps focus and returns it to the invoking control.
- **Hearts:** save projects locally in this browser. Liked Projects shows that collection; no data is uploaded.
- **Search / category pills:** filter the full collection. A search finds project names, categories, and documented technologies.
- **Navigation:** uses hash routes (`#home`, `#projects`, `#about`, `#experience`, `#contact`, `#music`) so refreshes and direct links work on static hosting.

The mobile layout has bottom navigation and a compact player with next, play/pause, progress, and ambient mute controls. Desktop includes the full transport, volume slider, library, and a context panel on wide screens. Reduced-motion preferences bypass the splash and disable decorative motion.

## Preserved content

All 17 original project names, image files, destinations, biography and service areas, job titles and descriptions, dates, education, phone, email, location, birthday, and social links are preserved. The artist header and professional title both use “Software Developer”.

GitHub profile content and public repository files were reviewed on 2026-11-03. `src/github.js` adds grouped technologies, the MERN focus, React Native/NativeWind learning, travel/gaming interests, and three selected repositories. These are static snapshots of publicly listed information, not live activity counters. The X profile link is also included.

Three existing projects now have documented stacks and source links: Country Roads Motor Inn (README), Nanango Star Motel (package.json), and Unifly Travels (public frontend package.json). The Unifly details describe the public frontend repository rather than claiming the exact stack of its currently deployed site. Other projects now include stacks observed on their current public sites or clearly marked suggestions. See `docs/STACK_REVIEW.md` before publishing suggested stacks as facts. Optional `description`, `role`, `outcomes`, `stack`, `repositoryUrl`, and `stackSource` fields are rendered when supplied. No clients, results, proficiency levels, or technologies are inferred for unrelated projects.

## Edit content

- `src/data.js`: contact details, social profiles, career history, education.
- `src/content.js`: exact introduction, biography, services, tour duration, asset helper.
- `src/projects.json`: project names, destinations, categories, technology stacks, and preview filenames. Give each project a unique nonnegative integer ID. Keep existing IDs stable; projects can be reordered or removed without renumbering.
- `src/library.js`: change `TOP_PROJECT_IDS` to choose the default liked projects. Use IDs from `src/projects.json`; existing visitors retain their saved likes.
- `public/assets/images/`: original project artwork and portrait.
- `src/styles.css`: design tokens, responsive layout, focus indicators, and reduced motion.

The original `assets/` directory is retained as source material. The build serves images from `public/assets/images/`.

## GitHub Pages deployment

1. In repository **Settings → Pages → Build and deployment**, select **GitHub Actions**.
2. Push to `main` or `master`, or manually run the included deployment workflow.
3. The workflow installs locked dependencies, runs tests, builds, uploads `dist/`, and deploys to Pages.

Do not use **Deploy from a branch** for this Vite source repository. It publishes the uncompiled `index.html`, which references `/src/main.jsx` and produces a blank page. If both `pages build and deployment` and `Deploy portfolio to GitHub Pages` appear for each push, switch the Pages source to GitHub Actions, then run `Deploy portfolio to GitHub Pages` again.

Routine edits to names, descriptions, stacks, categories, order, or `TOP_PROJECT_IDS` do not require changing tests. Tests check data validity and behavior rather than a fixed project count or curated list. Add the corresponding image in `public/assets/images/` when adding a project. Run `npm test` and `npm run build` before pushing.

For another default branch, update the workflow trigger. Vite uses `base: './'`, so the build supports both user-site roots and repository subpaths. Deploy the contents of `dist/`, not the unbuilt React source. This task does not push or deploy changes automatically.

## Contact form

The existing EmailJS public key, service ID, and template ID are retained in `ContactForm.jsx`. The template receives `name`, `email`, and `message`. EmailJS identifiers are public browser configuration. Confirm the service is active and its allowed domains include the production URL. The form includes email validation, whitespace checks, duplicate-submit protection, sending status, success/error feedback, and a direct email fallback. Development checks do not send a real message.

Inter loads through Google Fonts with a local system sans-serif fallback. Portfolio project imagery is local; Spotify profile and playlist artwork load from Spotify’s CDN. This is an independent portfolio inspired by the player interface, with no Spotify affiliation; the music section uses Spotify’s official embed.

## Spotify playlist and new profiles

`src/components/SpotifyPlaylist.jsx` adds a My Playlist page at `#music`, with the official Spotify embed for [PATWARY](https://open.spotify.com/playlist/1nnF1aBpYAI1KBGQTKuelk). A home-page card and desktop/mobile navigation link lead to it. Playback uses the Spotify controls inside the iframe; the bottom portfolio player continues to control only the project tour. Entering My Playlist pauses the project tour and ambient sound. Music stops when leaving the playlist page. There is no autoplay or access token.

Spotify controls playback availability; some listeners may receive previews depending on their browser and Spotify session. The iframe retains the documented `encrypted-media` and playback permissions. An Open in Spotify link provides a fallback when embeds or third-party content are blocked. See [Spotify embed documentation](https://developer.spotify.com/documentation/embeds/tutorials/creating-an-embed) and [playback troubleshooting](https://developer.spotify.com/documentation/embeds/tutorials/troubleshooting).

`src/data.js` stores the playlist URL and ID, the supplied [Google Developer profile](https://me.developers.google.com/u/sakibpatwary), and Discord handle `patwary`. Google Developer appears with the contact/social links. Discord appears in the social links using the supplied URL; the duplicate standalone Discord contact row has been removed.

## Public Spotify profile collection

`src/spotify.js` contains a public-profile snapshot reviewed on November 3, 2026, without signing in. It includes display name PATWARY, profile artwork, eight public playlist names/URLs/artwork, visible follower/following counts, and ten artist picks supplied by the portfolio owner. The page labels the snapshot date; these are not live counters, a favorite-artists ranking, or private listening-history data.

Visitors can choose any of the eight playlists to replace the official embed. Selecting a different playlist resets its iframe so previous music stops; the original PATWARY playlist remains the default. Cover art is loaded from Spotify CDN URLs, with a local visual fallback if unavailable. No Spotify access token, scraping service, backend, or runtime profile API is used. Update the data snapshot manually if desired. The public Spotify profile is also linked from Contact / Socials.

## Final build review

- Project drawer artwork is square and uses `object-fit: contain` to preserve the entire composition.
- Penguine🐧 is the third playlist; the default PATWARY playlist is unchanged.
- Every project has a stack with evidence labels: three repository-verified, nine observed on current sites, and five suggested for your review. See [stack review](docs/STACK_REVIEW.md).
- `scripts/optimize-images.mjs` generates 18 WebP assets before development/build. The original images are untouched. This reduced active image transfer size from about 2.9 MB to 493 KB. Generated WebP files are ignored by Git and regenerated in CI.
- The Spotify page and EmailJS SDK load on demand. Framer Motion uses LazyMotion with the lightweight DOM animation feature set.
- Mobile layouts account for device safe areas; form fields use 16px text to avoid focus zoom on iOS.
- `npm run build` validates the generated HTML resources and optimized images.

## Expanded profile and service descriptions

`src/components/ProfileOverview.jsx` adds role/education/focus/learning cards, all eight social profiles, email contact, the project collection link, and a three-step approach to building interfaces. Personal interests remain visible without the From my GitHub bio attribution link. The shared services section now explains specific deliverables and shows React Native/NativeWind as learning areas. `src/content.js` holds the editable service descriptions and deliverable tags.

## Mobile library and default top projects

On screens up to 600px, **All Projects** remains in the bottom navigation. Its page begins with a horizontally scrollable library containing Liked Projects and all project collections, followed by the project header and track list. Desktop keeps its sidebar library. Both views share `LibraryCollections` in `src/components/LibraryPage.jsx`.

`src/library.js` defines the initial top picks: Nanango Star Motel, Country Roads Motor Inn, Unifly Travels, and TGIT Bangladesh. New visitors and empty legacy collections receive these picks. Existing legacy likes are merged without duplicates. Preferences use the versioned `sp-library-v2` local-storage record; once a visitor deliberately removes all likes, the collection remains empty on reload. Storage failures fall back to the curated selection in memory.

The updated build passes 14 tests, including five storage/default-selection regression tests. All seven library collections were checked in the mobile UI, and the library page fits at 320, 390, 600, 601, and 1440 pixels. The curated picks persisted across reload; no production application errors were observed.

## Featured project and artist selections

The GitHub cards on Home and Experience show Vromon, Nanango Star Motel, and Ecommerce Website. Their technologies were reviewed against the public repositories: Vromon uses React, Node.js, Express, MongoDB, and Redux; Nanango lists React, Bootstrap, Framer Motion, and EmailJS; Ecommerce lists PHP, JavaScript, CSS, and HTML. The old three featured GitHub cards have been replaced.

The bottom of My Playlist now displays ten owner-selected artists, in the supplied order: OneRepublic, Imagine Dragons, HIGHWAY, Mitraz, VALORANT, The Script, Murtaza Qizilbash, Pritom Hasan, Billie Eilish, and Xefer. Artist names were checked against the public Spotify pages. These are curated picks, not a live recent-listening feed.
