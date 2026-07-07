
import { Capabilities } from "../components/sections/Capabilities";
import { EditorsLetter } from "../components/sections/EditorsLetter";
import { Hero } from "../components/sections/Hero";
import { ContactSection } from "../components/sections/Contact";
import { Marquee } from "../components/sections/Marquee";
import { Portfolio } from "../components/sections/Portfolio";
import { Testimonials } from "../components/sections/Testimonials";
import { ClientSection } from "../components/sections/Clients";
import { SEO, type OpenGraphData, type TwitterCardData } from "../components/SEO";
import { homePageStructuredData } from "../components/structured-data";

const homeOpenGraph: OpenGraphData = {
  type: "website",
  url: "https://digitalgraphicsindia.com",
  title: "Digital Graphics India | Creative Agency & Brand Identity Design",
  description:
    "Digital Graphics is where strategy meets storytelling, and creativity meets impact. We partner with ambitious brands to build identities, campaigns, and experiences that cut through the noise.",
  image: "https://digitalgraphicsindia.com/Logo.jpg",
  imageWidth: 1200,
  imageHeight: 630,
  imageAlt: "Digital Graphics India - Creative Agency Workspace",
  siteName: "Digital Graphics India",
  locale: "en_IN",
};

const homeTwitterCard: TwitterCardData = {
  card: "summary_large_image",
  url: "https://digitalgraphicsindia.com",
  title: "Digital Graphics India | Creative Agency & Brand Identity Design",
  description:
    "Digital Graphics is where strategy meets storytelling. We craft visual identities, campaigns, and experiences that cut through the noise and stay remembered.",
  image: "https://digitalgraphicsindia.com/Logo.jpg",
  imageAlt: "Digital Graphics India - Creative Agency Workspace",
  site: "@digitalgraphics",
};

export default function Home() {
  return (
    <>
      <SEO
        title="Digital Graphics India"
        description="Digital Graphics is where strategy meets storytelling, and creativity meets impact. We partner with ambitious brands to build identities, campaigns, and experiences that cut through the noise."
        keywords="creative agency, digital marketing, brand identity, social media management, trophy design, awards, corporate gifts, printing services, branding, Ranchi, Jharkhand"
        canonical="https://digitalgraphicsindia.com"
        robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
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
        <Portfolio />
        <Testimonials />
        <ContactSection />
      </main>
    </>
  );
}