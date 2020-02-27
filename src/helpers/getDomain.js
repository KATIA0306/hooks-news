export const LINKS_PER_PAGE = 5;

export function getDomain(url) {
  return url && url.replace(/^https?:\/\//i, "");
}
