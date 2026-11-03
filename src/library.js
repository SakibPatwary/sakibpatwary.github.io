// Portfolio-owner selections. Edit this list to change the initial top picks.
export const TOP_PROJECT_IDS = [1, 16, 14, 13, 11];
export const LIBRARY_STORAGE_KEY = "sp-library-v2";
export function restoreLibrary(current, legacy, validIds) {
  const valid = new Set(validIds);
  const clean = (values) => [
    ...new Set(values.filter((id) => Number.isInteger(id) && valid.has(id))),
  ];
  try {
    const saved = JSON.parse(current);
    if (saved?.version === 2 && Array.isArray(saved.liked))
      return clean(saved.liked);
  } catch {
    /* Recover with curated picks and any valid legacy saves. */
  }
  let previous = [];
  try {
    const parsed = JSON.parse(legacy);
    if (Array.isArray(parsed)) previous = parsed;
  } catch { }
  return clean([...TOP_PROJECT_IDS, ...previous]);
}
