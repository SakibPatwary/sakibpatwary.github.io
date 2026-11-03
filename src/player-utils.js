// A deterministic queue utility shared by the player and its behavior tests.
export function nextProjectIndex(
  current,
  count,
  direction = 1,
  shuffle = false,
  random = Math.random,
) {
  if (count === 0) return -1;
  if (current < 0) return direction < 0 ? count - 1 : 0;
  if (shuffle && count > 1)
    return (current + 1 + Math.floor(random() * (count - 1))) % count;
  return (current + direction + count) % count;
}
export function filterProjects(
  projects,
  { category = "All", query = "", savedOnly = false, liked = [] } = {},
) {
  const search = query.trim().toLowerCase();
  return projects.filter(
    (project) =>
      (category === "All" || category === project.category) &&
      (!savedOnly || liked.includes(project.id)) &&
      `${project.name} ${project.category} ${(project.stack || []).join(" ")}`
        .toLowerCase()
        .includes(search),
  );
}
