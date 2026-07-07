import {
  DEFAULT_KEYWORDS,
  DEFAULT_LOCALE,
  DEFAULT_OG_IMAGE,
  DEFAULT_ROBOTS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  THEME_COLOR_DARK,
  THEME_COLOR_LIGHT,
} from "./site";

export const DEFAULT_TITLE = `${SITE_NAME} | Creative Agency & Brand Identity Design`;

export function buildPageTitle(title?: string) {
  if (!title) return DEFAULT_TITLE;

  const normalizedTitle = title.trim();
  if (!normalizedTitle) return DEFAULT_TITLE;
  if (normalizedTitle.toLowerCase() === SITE_NAME.toLowerCase()) {
    return SITE_NAME;
  }

  return `${normalizedTitle} | ${SITE_NAME}`;
}

export function buildCanonicalUrl(path = "/") {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, SITE_URL).toString();
}

export function buildRobotsValue(robots?: string) {
  return robots || DEFAULT_ROBOTS;
}

export function getDefaultSeoValues() {
  return {
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
    canonical: SITE_URL,
    robots: DEFAULT_ROBOTS,
    themeColor: THEME_COLOR_LIGHT,
    themeColorDark: THEME_COLOR_DARK,
    locale: DEFAULT_LOCALE,
    image: DEFAULT_OG_IMAGE,
  } as const;
}
