// Public Spotify profile reviewed on 2026-11-03, without signing in.
// Counts are a dated snapshot, not live activity. Artist picks are supplied by the owner.
export const spotifyProfile = {
  name: "PATWARY",
  url: "https://open.spotify.com/user/31cohybmei6hdv7gcfblf3w752eu",
  image: "https://i.scdn.co/image/ab6775700000ee856c89a60ec1d621c1de829758",
  reviewedOn: "2026-11-03",
  reviewedLabel: "November 3, 2026",
  followers: 13,
  following: 62,
};
export const publicPlaylists = [
  {
    id: "1nnF1aBpYAI1KBGQTKuelk",
    name: "PATWARY",
    image:
      "https://mosaic.scdn.co/300/ab67616d00001e0250a3147b4edd7701a876c6ceab67616d00001e029b453683825849dd7aca8ea3ab67616d00001e02b3541f2d3f7d11ebedaf6a0eab67616d00001e02fb4e02d7f1eae17175131330",
  },
  {
    id: "0c2uY0dw0PtFRH7ISbG0gr",
    name: "PATTU's",
    image:
      "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da846fb3b77910cb003504f3a71a",
  },
  {
    id: "6N2EZSYF3mJgnafOSLrY7m",
    name: "Penguine🐧",
    image:
      "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da842985902ce99c9b1c27748663",
  },
  {
    id: "3lvyvvS7Dj0lYQyYpAnqet",
    name: "Bengali Penguine🐧",
    image:
      "https://mosaic.scdn.co/300/ab67616d00001e0235935e5cdf04fc88715043f6ab67616d00001e0267392e200f36d48d6fca706dab67616d00001e02711125c978b41c6e7d7a1091ab67616d00001e02fce91f8d574aae0d19aee59a",
  },
  {
    id: "1VhIG3uFuXBYiB2O702Uio",
    name: "Hindi Penguine🐧",
    image:
      "https://mosaic.scdn.co/300/ab67616d00001e023deea2abe9d9de91b15156c7ab67616d00001e02628c920567640b4cea99a394ab67616d00001e02b058d68db28e1ca74ade9b38ab67616d00001e02c397a4258096daa4b9f2b465",
  },
  {
    id: "5nIGcUjrL3iFXMyGXgFKaa",
    name: "♡⁠  ⁠~⁠♪",
    image:
      "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8422ae79daca6b9132feb740a0",
  },
  {
    id: "6cyDP4qUUWscC8CryBKODa",
    name: "2023",
    image:
      "https://mosaic.scdn.co/300/ab67616d00001e02a3a7f38ea2033aa501afd4cfab67616d00001e02a935e4689f15953311772cc4ab67616d00001e02e787cffec20aa2a396a61647ab67616d00001e02ec96e006b8bdfc582610ec13",
  },
  {
    id: "33yjtyvlGwYSamCKq4xIS6",
    name: "｡⁠*ﾟ",
    image:
      "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84ffa9bec7f81810e94dda0fbc",
  },
].map((playlist) => ({
  ...playlist,
  url: `https://open.spotify.com/playlist/${playlist.id}`,
  embedUrl: `https://open.spotify.com/embed/playlist/${playlist.id}?utm_source=generator&theme=0`,
}));
// Artist selections supplied by the portfolio owner; names verified from public artist pages.
export const featuredArtists = [
  ["OneRepublic", "5Pwc4xIPtQLFEnJriah9YJ"],
  ["Imagine Dragons", "53XhwfbYqKCa1cC15pYq2q"],
  ["HIGHWAY", "62mZpB59RHyxLGNesP78Vg"],
  ["Mitraz", "3iGhlvzpXc0UHBQ7klAItX"],
  ["VALORANT", "3wrFoI9EVjWg6m8xXeWr5t"],
  ["The Script", "3AQRLZ9PuTAozP28Skbq8V"],
  ["Murtaza Qizilbash", "6hIXwlI4wny3zYuB6cDBBk"],
  ["Pritom Hasan", "037oCHf26WEq5mR05NoOO7"],
  ["Billie Eilish", "6qqNVTkY8uBg9cP3Jd7DAH"],
  ["Xefer", "2S5txX8JNvdebvGU6LZbf9"],
].map(([name, id]) => ({ name, url: `https://open.spotify.com/artist/${id}` }));
