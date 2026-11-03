import { useEffect, useState } from "react";
import { LIBRARY_STORAGE_KEY, restoreLibrary } from "../library";
export default function useLibrary(projects) {
  const [liked, setLiked] = useState(() => {
    const validIds = projects.map((project) => project.id);
    try {
      return restoreLibrary(
        localStorage.getItem(LIBRARY_STORAGE_KEY),
        localStorage.getItem("sp-liked-projects"),
        validIds,
      );
    } catch {
      return restoreLibrary(null, null, validIds);
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(
        LIBRARY_STORAGE_KEY,
        JSON.stringify({ version: 2, liked }),
      );
    } catch {
      /* The collection still works in memory if storage is disabled. */
    }
  }, [liked]);
  const toggleLike = (id) =>
    setLiked((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    );
  return { liked, toggleLike };
}
