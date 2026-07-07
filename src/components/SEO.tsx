import { useEffect } from "react"
import {
  buildCanonicalUrl,
  buildPageTitle,
  buildRobotsValue,
  getDefaultSeoValues,
} from "@/lib/seo"

export interface OpenGraphData {
  type?: "website" | "article" | "profile" | "book" | "music" | "video"
  url?: string
  title?: string
  description?: string
  image?: string
  imageWidth?: number
  imageHeight?: number
  imageAlt?: string
  siteName?: string
  locale?: string
}

export interface TwitterCardData {
  card?: "summary" | "summary_large_image" | "app" | "player"
  url?: string
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  site?: string
  creator?: string
}

export interface StructuredDataItem {
  "@context"?: string
  "@type"?: string
  [key: string]: unknown
}

export interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  canonical?: string
  robots?: string
  themeColor?: string
  themeColorDark?: string
  openGraph?: OpenGraphData
  twitterCard?: TwitterCardData
  appleTouchIcon?: string
  manifest?: string
  language?: string
  charset?: string
  structuredData?: StructuredDataItem | StructuredDataItem[]
}

const SITE_NAME = "Digital Graphics India"
const DEFAULT_DESCRIPTION =
  "Digital Graphics is where strategy meets storytelling. We craft visual identities, campaigns, and experiences that cut through the noise and stay remembered."
const DEFAULT_LOCALE = "en_IN"
const DEFAULT_APPLE_TOUCH_ICON = "/apple-touch-icon.png"
const DEFAULT_MANIFEST = "/site.webmanifest"

const createdElements: Element[] = []
const createdLinkTags: HTMLLinkElement[] = []

function createOrUpdateMeta(
  name: string,
  content: string,
  attrs?: Record<string, string>
) {
  const selector = attrs?.media
    ? `meta[name="${name}"][media="${attrs.media}"]`
    : `meta[name="${name}"]`
  let meta = document.querySelector(selector) as HTMLMetaElement | null

  if (!meta) {
    meta = document.createElement("meta")
    meta.setAttribute("name", name)
    document.head.appendChild(meta)
    createdElements.push(meta)
  }

  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) =>
      meta?.setAttribute(key, value)
    )
  }

  meta.setAttribute("content", content)
  return meta
}

function createOrUpdateProperty(property: string, content: string) {
  let meta = document.querySelector(
    `meta[property="${property}"]`
  ) as HTMLMetaElement | null
  if (!meta) {
    meta = document.createElement("meta")
    meta.setAttribute("property", property)
    document.head.appendChild(meta)
    createdElements.push(meta)
  }
  meta.setAttribute("content", content)
}

function createOrUpdateLink(
  rel: string,
  href: string,
  attrs?: Record<string, string>
) {
  let link = document.querySelector(
    `link[rel="${rel}"]`
  ) as HTMLLinkElement | null
  if (!link) {
    link = document.createElement("link")
    link.setAttribute("rel", rel)
    document.head.appendChild(link)
    createdLinkTags.push(link)
  }
  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) =>
      link?.setAttribute(key, value)
    )
  }
  link.setAttribute("href", href)
}

function removeCreatedTags() {
  createdElements.forEach((tag) => {
    if (tag.parentNode) {
      tag.parentNode.removeChild(tag)
    }
  })
  createdElements.length = 0

  createdLinkTags.forEach((tag) => {
    if (tag.parentNode) {
      tag.parentNode.removeChild(tag)
    }
  })
  createdLinkTags.length = 0
}

export function SEO({
  title,
  description,
  keywords,
  canonical,
  robots,
  themeColor,
  themeColorDark,
  openGraph,
  twitterCard,
  appleTouchIcon,
  manifest,
  language,
  charset,
  structuredData,
}: SEOProps) {
  useEffect(() => {
    removeCreatedTags()

    const defaults = getDefaultSeoValues()
    const fullTitle = buildPageTitle(title)

    document.title = fullTitle

    if (language) {
      const html = document.documentElement
      if (html.getAttribute("lang") !== language) {
        html.setAttribute("lang", language)
      }
    }

    createOrUpdateMeta(
      "viewport",
      "width=device-width, initial-scale=1.0, viewport-fit=cover"
    )

    if (charset) {
      const existingCharset = document.querySelector(
        "meta[charset]"
      ) as HTMLMetaElement | null
      if (existingCharset) {
        existingCharset.setAttribute("charset", charset)
      } else {
        const meta = document.createElement("meta")
        meta.setAttribute("charset", charset)
        document.head.appendChild(meta)
        createdElements.push(meta)
      }
    }

    createOrUpdateMeta("author", "Kush Vardhan")
    createOrUpdateMeta("generator", "Digital Graphics India")
    createOrUpdateMeta("application-name", SITE_NAME)
    createOrUpdateMeta("apple-mobile-web-app-title", SITE_NAME)
    createOrUpdateMeta("format-detection", "telephone=no")
    createOrUpdateMeta("referrer", "strict-origin-when-cross-origin")
    createOrUpdateMeta("color-scheme", "light dark")

    const effectiveRobots = buildRobotsValue(robots)
    createOrUpdateMeta("robots", effectiveRobots)

    const effectiveDescription = description || DEFAULT_DESCRIPTION
    createOrUpdateMeta("description", effectiveDescription)

    const effectiveKeywords = keywords || defaults.keywords
    createOrUpdateMeta("keywords", effectiveKeywords)

    const effectiveCanonical = buildCanonicalUrl(
      canonical || defaults.canonical
    )
    createOrUpdateLink("canonical", effectiveCanonical)

    const effectiveThemeColor = themeColor || defaults.themeColor
    const effectiveThemeColorDark = themeColorDark || defaults.themeColorDark
    const effectiveAppleTouchIcon = appleTouchIcon || DEFAULT_APPLE_TOUCH_ICON
    const effectiveManifest = manifest || DEFAULT_MANIFEST

    createOrUpdateMeta("theme-color", effectiveThemeColor, {
      media: "(prefers-color-scheme: light)",
    })
    createOrUpdateMeta("theme-color", effectiveThemeColorDark, {
      media: "(prefers-color-scheme: dark)",
    })

    createOrUpdateLink("apple-touch-icon", effectiveAppleTouchIcon)
    createOrUpdateLink("manifest", effectiveManifest)

    const ogUrl = openGraph?.url || effectiveCanonical
    const ogTitle = openGraph?.title || fullTitle
    const ogDescription = openGraph?.description || effectiveDescription
    const ogImage = openGraph?.image || defaults.image

    createOrUpdateProperty("og:type", openGraph?.type || "website")
    createOrUpdateProperty("og:url", ogUrl)
    createOrUpdateProperty("og:title", ogTitle)
    createOrUpdateProperty("og:description", ogDescription)
    createOrUpdateProperty("og:image", ogImage)
    createOrUpdateProperty(
      "og:image:width",
      String(openGraph?.imageWidth ?? 1200)
    )
    createOrUpdateProperty(
      "og:image:height",
      String(openGraph?.imageHeight ?? 630)
    )
    createOrUpdateProperty("og:image:alt", openGraph?.imageAlt || ogTitle)
    createOrUpdateProperty("og:site_name", openGraph?.siteName || SITE_NAME)
    createOrUpdateProperty("og:locale", openGraph?.locale || DEFAULT_LOCALE)

    const tcTitle = twitterCard?.title || ogTitle
    const tcDescription = twitterCard?.description || ogDescription
    const tcImage = twitterCard?.image || ogImage

    createOrUpdateProperty(
      "twitter:card",
      twitterCard?.card || "summary_large_image"
    )
    createOrUpdateProperty("twitter:url", twitterCard?.url || ogUrl)
    createOrUpdateProperty("twitter:title", tcTitle)
    createOrUpdateProperty("twitter:description", tcDescription)
    createOrUpdateProperty("twitter:image", tcImage)
    createOrUpdateProperty(
      "twitter:image:alt",
      twitterCard?.imageAlt || tcTitle
    )
    if (twitterCard?.site) {
      createOrUpdateProperty("twitter:site", twitterCard.site)
    }
    if (twitterCard?.creator) {
      createOrUpdateProperty("twitter:creator", twitterCard.creator)
    }

    if (structuredData) {
      const items = Array.isArray(structuredData)
        ? structuredData
        : [structuredData]
      items.forEach((data) => {
        const script = document.createElement("script")
        script.setAttribute("type", "application/ld+json")
        script.setAttribute("data-structured-data-page", "true")
        script.textContent = JSON.stringify(data, null, 2)
        document.head.appendChild(script)
        createdElements.push(script)
      })
    }

    return () => {
      removeCreatedTags()
      document.title = getDefaultSeoValues().title
    }
  }, [
    title,
    description,
    keywords,
    canonical,
    robots,
    themeColor,
    themeColorDark,
    openGraph,
    twitterCard,
    appleTouchIcon,
    manifest,
    language,
    charset,
    structuredData,
  ])

  return null
}
