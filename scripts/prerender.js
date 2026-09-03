import { readFileSync, writeFileSync } from "node:fs";

const html = readFileSync("dist/index.html", "utf-8");

const proudMomentsHtml = html
  .replace(
    /<title>.*?<\/title>/,
    "<title>Proud Moments by Digital Graphics | Trophy Design, Awards & Corporate Gifting</title>"
  )
  .replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    '<meta property="og:url" content="https://digitalgraphicsindia.com/proud-moments" />'
  )
  .replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    '<meta property="og:title" content="Proud Moments by Digital Graphics | Trophy Design, Awards & Corporate Gifting" />'
  )
  .replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    '<meta property="og:description" content="Celebrating achievements with meaningful design. Digital Graphics creates custom trophies, awards, medals, and commemorative mementos for brands, sports events, and corporate recognition in Ranchi, Jharkhand." />'
  )
  .replace(
    /<meta property="og:image" content="[^"]*" \/>/,
    '<meta property="og:image" content="/og-proud-moments.jpg" />'
  )
  .replace(
    /<meta property="og:image:alt" content="[^"]*" \/>/,
    '<meta property="og:image:alt" content="Proud Moments by Digital Graphics - Trophy and Award Design Showcase" />'
  )
  .replace(
    /<meta name="twitter:url" content="[^"]*" \/>/,
    '<meta name="twitter:url" content="https://digitalgraphicsindia.com/proud-moments" />'
  )
  .replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    '<meta name="twitter:title" content="Proud Moments by Digital Graphics | Trophy Design, Awards & Corporate Gifting" />'
  )
  .replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    '<meta name="twitter:description" content="Celebrating achievements with meaningful design. Digital Graphics creates custom trophies, awards, medals, and commemorative mementos for brands, sports events, and corporate recognition." />'
  )
  .replace(
    /<meta name="twitter:image" content="[^"]*" \/>/,
    '<meta name="twitter:image" content="/og-proud-moments.jpg" />'
  )
  .replace(
    /<meta name="twitter:image:alt" content="[^"]*" \/>/,
    '<meta name="twitter:image:alt" content="Proud Moments by Digital Graphics - Trophy and Award Design Showcase" />'
  )
  .replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    '<link rel="canonical" href="https://digitalgraphicsindia.com/proud-moments" />'
  )
  .replace(
    /<link rel="preload" href="\/og-image\.jpg"[^>]*>/,
    '<link rel="preload" href="/og-proud-moments.jpg" as="image" fetchpriority="high" />'
  );

writeFileSync("dist/proud-moments.html", proudMomentsHtml);
console.log("✓ Generated dist/proud-moments.html with ProudMoments metadata");
