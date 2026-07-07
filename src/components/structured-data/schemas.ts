import type { StructuredDataItem } from "@/components/SEO";
import {
  SITE_URL,
  SITE_DESCRIPTION,
  LOGO_URL,
  BUSINESS_ADDRESS,
  CONTACT_POINTS,
  SOCIAL_PROFILES,
  SERVICES,
  DEFAULT_OG_IMAGE,
} from "@/lib/site";

export const organizationSchema: StructuredDataItem = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Digital Graphics India",
  alternateName: "Digital Graphics",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: LOGO_URL,
    width: 1200,
    height: 630,
    caption: "Digital Graphics India Logo",
  },
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    ...BUSINESS_ADDRESS,
  },
  contactPoint: CONTACT_POINTS.map((cp) => ({
    "@type": "ContactPoint",
    ...cp,
  })),
  sameAs: [...SOCIAL_PROFILES],
};

export const professionalServiceSchema: StructuredDataItem = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#professionalservice`,
  name: "Digital Graphics India",
  alternateName: "Digital Graphics",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: LOGO_URL,
    width: 1200,
    height: 630,
    caption: "Digital Graphics India Logo",
  },
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    ...BUSINESS_ADDRESS,
  },
  contactPoint: CONTACT_POINTS.map((cp) => ({
    "@type": "ContactPoint",
    ...cp,
  })),
  sameAs: [...SOCIAL_PROFILES],
};

export const webSiteSchema: StructuredDataItem = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Digital Graphics India",
  description: SITE_DESCRIPTION,
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export const imageObjectSchema = (
  url: string,
  width: number,
  height: number,
  caption: string
): StructuredDataItem => ({
  "@context": "https://schema.org",
  "@type": "ImageObject",
  url,
  width,
  height,
  caption,
});

export const webPageSchema = (props: {
  url: string;
  name: string;
  description: string;
  imageUrl?: string;
}): StructuredDataItem => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${props.url}/#webpage`,
  url: props.url,
  name: props.name,
  description: props.description,
  inLanguage: "en-IN",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  primaryImageOfPage: props.imageUrl
    ? {
        "@type": "ImageObject",
        url: props.imageUrl,
        width: 1200,
        height: 630,
      }
    : undefined,
});

export const breadcrumbListSchema = (props: {
  items: { name: string; url: string }[];
}): StructuredDataItem => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: props.items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const serviceSchemas = SERVICES.map((service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.name,
  description: service.description,
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: {
    "@type": "City",
    name: "Ranchi",
  },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: SITE_URL,
    servicePhone: CONTACT_POINTS[0].telephone,
  },
}));

export const homePageStructuredData = (): StructuredDataItem[] => [
  organizationSchema,
  professionalServiceSchema,
  webSiteSchema,
  webPageSchema({
    url: SITE_URL,
    name: "Digital Graphics India | Creative Agency & Brand Identity Design",
    description: SITE_DESCRIPTION,
    imageUrl: DEFAULT_OG_IMAGE,
  }),
  breadcrumbListSchema({
    items: [
      { name: "Home", url: SITE_URL },
    ],
  }),
  imageObjectSchema(DEFAULT_OG_IMAGE, 1200, 630, "Digital Graphics India - Creative Agency Workspace"),
  imageObjectSchema(LOGO_URL, 1200, 630, "Digital Graphics India Logo"),
  ...serviceSchemas,
];

export const proudMomentsPageStructuredData = (): StructuredDataItem[] => [
  organizationSchema,
  professionalServiceSchema,
  webSiteSchema,
  webPageSchema({
    url: `${SITE_URL}/proud-moments`,
    name: "Proud Moments by Digital Graphics | Trophy Design, Awards & Corporate Gifting",
    description:
      "Celebrating achievements with meaningful design. Digital Graphics creates custom trophies, awards, medals, and commemorative mementos for brands, sports events, and corporate recognition.",
    imageUrl: `${SITE_URL}/og-proud-moments.jpg`,
  }),
  breadcrumbListSchema({
    items: [
      { name: "Home", url: SITE_URL },
      { name: "Proud Moments", url: `${SITE_URL}/proud-moments` },
    ],
  }),
  imageObjectSchema(
    `${SITE_URL}/og-proud-moments.jpg`,
    1200,
    630,
    "Proud Moments by Digital Graphics - Trophy and Award Design Showcase"
  ),
];
