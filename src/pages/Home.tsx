import { lazy, Suspense } from "react";

import { Capabilities } from "../components/sections/Capabilities";
import { ClientSection } from "../components/sections/Clients";
import { EditorsLetter } from "../components/sections/EditorsLetter";
import { Hero } from "../components/sections/Hero";
import { Marquee } from "../components/sections/Marquee";

import { SEO } from "../components/SEO";
import type { OpenGraphData, TwitterCardData } from "../components/SEO";
import { homePageStructuredData } from "../components/structured-data";

const Portfolio = lazy(() =>
  import("../components/sections/Portfolio").then((m) => ({
    default: m.Portfolio,
  }))
);

const Testimonials = lazy(() =>
  import("../components/sections/Testimonials").then((m) => ({
    default: m.Testimonials,
  }))
);

const ContactSection = lazy(() =>
  import("../components/sections/Contact").then((m) => ({
    default: m.ContactSection,
  }))
);

const homeOpenGraph: OpenGraphData = {
  type: "website",
  url: "https://digitalgraphicsindia.com",
  title: "Digital Graphics India | Creative Agency & Brand Identity Design",
  description:
    "Digital Graphics is where strategy meets storytelling, and creativity meets impact. We partner with ambitious brands to build identities, campaigns, and experiences that cut through the noise.",
  image: "https://digitalgraphicsindia.com/og-image.jpg",
  imageWidth: 1200,
  imageHeight: 630,
  imageAlt: "Digital Graphics India",
  siteName: "Digital Graphics India",
  locale: "en_IN",
};

const homeTwitterCard: TwitterCardData = {
  card: "summary_large_image",
  url: "https://digitalgraphicsindia.com",
  title: homeOpenGraph.title,
  description: homeOpenGraph.description,
  image: homeOpenGraph.image,
  imageAlt: homeOpenGraph.imageAlt,
};

function SectionLoader() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_center,hsl(var(--foreground)/0.06),transparent_70%)]" />
      </div>

      <div className="relative flex flex-col items-center gap-8">
        <div className="h-px w-24 bg-border overflow-hidden">
          <div className="h-full w-1/2 animate-[loading_1.4s_linear_infinite] bg-foreground" />
        </div>

        <div className="space-y-3 text-center">
          <div className="mx-auto h-3 w-20 rounded bg-muted animate-pulse" />
          <div className="mx-auto h-10 w-72 rounded bg-muted animate-pulse max-w-[80vw]" />
          <div className="mx-auto h-4 w-56 rounded bg-muted animate-pulse max-w-[70vw]" />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <SEO
        title="Digital Graphics India"
        description="Digital Graphics is where strategy meets storytelling, and creativity meets impact. We partner with ambitious brands to build identities, campaigns, and experiences that cut through the noise."
        keywords="creative agency, branding, digital marketing, printing, trophy design, corporate gifts, Ranchi, Jharkhand"
        canonical="https://digitalgraphicsindia.com"
        robots="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        openGraph={homeOpenGraph}
        twitterCard={homeTwitterCard}
        language="en"
        charset="UTF-8"
        structuredData={homePageStructuredData()}
      />

      <main id="main-content" className="relative">
        <Hero />
        <Marquee />
        <EditorsLetter />
        <Capabilities />
        <ClientSection />

        <Suspense fallback={<SectionLoader />}>
          <Portfolio />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>
    </>
  );
}