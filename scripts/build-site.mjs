import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const out = process.cwd();
const baseUrl = "https://www.albanplumbingheating.co.uk";

const business = {
  name: "Alban Plumbing and Heating Ltd",
  phoneDisplay: "0734 217 1269",
  phoneHref: "+447342171269",
  email: "info@albanplumbing.co.uk",
  whatsapp: "447342171269",
  area:
    "St Albans, Harpenden, Wheathampstead, Hatfield, London Colney, Redbourn, Radlett, Sandridge, Park Street, Bricket Wood and throughout Hertfordshire.",
};

const supabase = {
  url: "https://eolipantsolcqlutfqnx.supabase.co",
  publishableKey: "sb_publishable_te-xYxNVX2KhVo6FfJoOHQ_K7_mlWMG",
};

const areas = [
  "St Albans",
  "Harpenden",
  "Hatfield",
  "London Colney",
  "Redbourn",
  "Wheathampstead",
  "Radlett",
  "Bricket Wood",
  "Sandridge",
];

const trustBadges = [
  "Gas Safe Registered",
  "Fully Insured",
  "Local Business",
  "Reliable Service",
  "5 Star Customer Service",
];

const brands = ["Worcester Bosch", "Vaillant", "Ideal", "Baxi", "Glow-worm", "Nest", "Hive"];

const images = {
  logo: "/assets/images/aph-logo.jpg",
  hero: "/assets/images/boiler-hero.png",
  homepageBackground: "/assets/images/homepage-background.jpeg",
  homepageBoiler: "/assets/images/homepage-boiler.jpeg",
  plumbingStock: "/assets/images/plumbing-services-stock.jpeg",
  bathroom: "/assets/images/bathroom-installation.png",
  radiator: "/assets/images/radiator-engineer.png",
  powerflush: "/assets/images/powerflush.jpeg",
  underfloorHeating: "/assets/images/underfloor-heating.jpeg",
  unventedCylinder: "/assets/images/unvented-cylinder.jpeg",
  local: "/assets/images/st-albans-local.png",
  gasSafe: "/assets/images/gas-safe-register.jpeg",
  googleReviews: "/assets/images/google-reviews.jpeg",
  ratedPeople: "/assets/images/rated-people.jpeg",
};

const reviews = [
  {
    name: "Sarah M.",
    location: "St Albans",
    text:
      "Clear pricing, tidy work and a really calm engineer. Our boiler service was completed on time and everything was explained properly.",
  },
  {
    name: "James R.",
    location: "Harpenden",
    text:
      "APH replaced our old boiler and upgraded a radiator circuit. The finish was neat, the house was left spotless and the heating is much better.",
  },
  {
    name: "Nadia K.",
    location: "London Colney",
    text:
      "Fast response for a leaking pipe and very professional from the first phone call. I would happily recommend them locally.",
  },
];

const servicePages = [
  {
    slug: "plumbing-services",
    title: "Plumbing Services",
    keyword: "Plumber St Albans",
    intro:
      "Reliable plumbing services for homes, landlords and small businesses across St Albans and Hertfordshire.",
    image: images.plumbingStock,
    icon: "tap",
    related: ["leak-detection", "burst-pipes", "kitchen-plumbing"],
    benefits: ["Leak repairs", "Tap and valve replacement", "Pipework upgrades", "Kitchen and bathroom plumbing"],
  },
  {
    slug: "heating-services",
    title: "Heating Services",
    keyword: "Heating Engineer St Albans",
    intro:
      "Efficient heating services covering repairs, upgrades, controls, radiators and hot water performance.",
    image: images.radiator,
    icon: "flame",
    related: ["radiator-installation", "underfloor-heating", "power-flushing"],
    benefits: ["Warmer rooms", "Efficient controls", "Balanced systems", "Cleaner pipework"],
  },
  {
    slug: "boiler-installation",
    title: "Boiler Installation",
    keyword: "Boiler Installation St Albans",
    intro:
      "Premium boiler installation for efficient heating, reliable hot water and neat modern plant rooms.",
    image: images.hero,
    icon: "boiler",
    related: ["boiler-replacement", "boiler-servicing", "gas-engineers"],
    benefits: ["Correctly sized boilers", "Neat pipework", "Smart controls", "Manufacturer guidance"],
  },
  {
    slug: "boiler-replacement",
    title: "Boiler Replacement",
    keyword: "Boiler Replacement St Albans",
    intro:
      "Straightforward boiler replacement when your existing appliance is inefficient, unreliable or beyond economical repair.",
    image: images.hero,
    icon: "boiler",
    related: ["boiler-installation", "boiler-repairs", "boiler-servicing"],
    benefits: ["Lower running costs", "Improved hot water", "Modern controls", "Clear installation planning"],
  },
  {
    slug: "boiler-repairs",
    title: "Boiler Repairs",
    keyword: "Boiler Repair St Albans",
    intro:
      "Careful boiler fault finding and repair for no heat, no hot water, pressure problems and unusual boiler noises.",
    image: images.hero,
    icon: "tool",
    related: ["boiler-servicing", "gas-engineers", "emergency-plumbing"],
    benefits: ["Accurate diagnosis", "Practical repair advice", "Safety checks", "Reliable heating recovery"],
  },
  {
    slug: "boiler-servicing",
    title: "Boiler Servicing",
    keyword: "Boiler Service St Albans",
    intro:
      "Annual boiler servicing for safer operation, warranty support and dependable heating through winter.",
    image: images.hero,
    icon: "shield",
    related: ["boiler-repairs", "landlord-gas-safety-certificates", "gas-engineers"],
    benefits: ["Combustion checks", "Safety inspection", "Efficiency review", "Maintenance advice"],
  },
  {
    slug: "gas-engineers",
    title: "Gas Engineers",
    keyword: "Gas Engineer St Albans",
    intro:
      "Gas engineering services for boilers, heating appliances, safety checks and responsible fault diagnosis.",
    image: images.hero,
    icon: "flame",
    related: ["landlord-gas-safety-certificates", "boiler-installation", "boiler-repairs"],
    benefits: ["Gas safety focus", "Appliance checks", "Clear reporting", "Local attendance"],
  },
  {
    slug: "landlord-gas-safety-certificates",
    title: "Landlord Gas Safety Certificates",
    keyword: "Gas Safety Certificates St Albans",
    intro:
      "Landlord gas safety certificate visits for rental properties across St Albans and nearby Hertfordshire towns.",
    image: images.hero,
    icon: "certificate",
    related: ["gas-engineers", "boiler-servicing", "unvented-cylinders"],
    benefits: ["CP12 checks", "Tenant-friendly visits", "Clear records", "Reminder-ready servicing"],
  },
  {
    slug: "bathroom-installations",
    title: "Bathroom Installations",
    keyword: "Bathroom Installation St Albans",
    intro:
      "Thoughtful bathroom installation and plumbing for cloakrooms, en-suites and full bathroom refurbishments.",
    image: images.bathroom,
    icon: "bath",
    related: ["plumbing-services", "toilet-repairs", "leak-detection"],
    benefits: ["Practical layouts", "Clean pipework", "Quality fixtures", "Careful finishing"],
  },
  {
    slug: "leak-detection",
    title: "Leak Detection",
    keyword: "Leak Detection St Albans",
    intro:
      "Responsive leak detection and repair for visible leaks, hidden damp patches and unexplained water loss.",
    image: images.radiator,
    icon: "drop",
    related: ["burst-pipes", "plumbing-services", "emergency-plumbing"],
    benefits: ["Fast investigation", "Damage limitation", "Pipe repairs", "Clear next steps"],
  },
  {
    slug: "burst-pipes",
    title: "Burst Pipes",
    keyword: "Burst Pipe Repair St Albans",
    intro:
      "Urgent burst pipe repairs to isolate water, limit damage and restore safe plumbing as quickly as possible.",
    image: images.radiator,
    icon: "warning",
    related: ["emergency-plumbing", "leak-detection", "plumbing-services"],
    benefits: ["Rapid response", "Temporary isolation", "Permanent repair options", "Practical prevention advice"],
  },
  {
    slug: "radiator-installation",
    title: "Radiator Installation",
    keyword: "Radiator Installation St Albans",
    intro:
      "Radiator installation, replacement and balancing for warmer rooms and better whole-home heating performance.",
    image: images.radiator,
    icon: "radiator",
    related: ["heating-services", "power-flushing", "underfloor-heating"],
    benefits: ["Correct heat output", "Neat pipework", "Thermostatic valves", "System balancing"],
  },
  {
    slug: "toilet-repairs",
    title: "Toilet Repairs",
    keyword: "Toilet Repairs St Albans",
    intro:
      "Toilet repairs for running cisterns, poor flushing, leaks, blockages and replacement fittings.",
    image: images.bathroom,
    icon: "tap",
    related: ["bathroom-installations", "plumbing-services", "leak-detection"],
    benefits: ["Flush repairs", "Leak fixes", "Replacement parts", "Cleaner operation"],
  },
  {
    slug: "kitchen-plumbing",
    title: "Kitchen Plumbing",
    keyword: "Kitchen Plumbing St Albans",
    intro:
      "Kitchen plumbing for sinks, taps, appliances, pipework alterations and practical home upgrades.",
    image: images.bathroom,
    icon: "tap",
    related: ["plumbing-services", "leak-detection", "burst-pipes"],
    benefits: ["Appliance connections", "Sink and tap fitting", "Waste pipework", "Stopcock checks"],
  },
  {
    slug: "emergency-plumbing",
    title: "Emergency Plumbing",
    keyword: "Emergency Plumber St Albans",
    intro:
      "Emergency plumbing help for leaks, burst pipes, urgent heating issues and water damage risks.",
    image: images.radiator,
    icon: "warning",
    related: ["burst-pipes", "leak-detection", "boiler-repairs"],
    benefits: ["Urgent callouts", "Water isolation", "Repair planning", "Clear communication"],
  },
  {
    slug: "power-flushing",
    title: "Power Flushing",
    keyword: "Power Flushing St Albans",
    intro:
      "Power flushing and system cleaning for cold radiators, noisy heating, sludge build-up and poor circulation.",
    image: images.powerflush,
    icon: "refresh",
    related: ["heating-services", "radiator-installation", "boiler-servicing"],
    benefits: ["Cleaner circulation", "Hotter radiators", "Reduced noise", "System protection"],
  },
  {
    slug: "underfloor-heating",
    title: "Underfloor Heating",
    keyword: "Underfloor Heating St Albans",
    intro:
      "Underfloor heating support for comfort, even heat, manifold checks and control improvements.",
    image: images.underfloorHeating,
    icon: "grid",
    related: ["heating-services", "boiler-installation", "power-flushing"],
    benefits: ["Even warmth", "Efficient controls", "Manifold checks", "Modern comfort"],
  },
  {
    slug: "unvented-cylinders",
    title: "Unvented Cylinders",
    keyword: "Unvented Cylinder St Albans",
    intro:
      "Unvented hot water cylinder installation, servicing and repairs for strong mains pressure hot water across the home.",
    image: images.unventedCylinder,
    mediaFit: "contain",
    icon: "boiler",
    related: ["boiler-installation", "heating-services", "gas-engineers"],
    benefits: [
      "Mains pressure hot water",
      "Cylinder servicing",
      "Expansion vessel checks",
      "Safety valve testing",
    ],
  },
];

const blogPosts = [
  {
    slug: "signs-your-boiler-needs-replacing",
    title: "Signs Your Boiler Needs Replacing",
    summary: "How to spot when repairs are no longer the sensible choice for your heating system.",
    keywords: "boiler replacement St Albans",
  },
  {
    slug: "how-often-should-you-service-your-boiler",
    title: "How Often Should You Service Your Boiler",
    summary: "A practical guide to annual servicing, warranties and winter reliability.",
    keywords: "boiler service St Albans",
  },
  {
    slug: "common-plumbing-problems",
    title: "Common Plumbing Problems",
    summary: "Leaks, low pressure, running toilets and blocked wastes explained in plain English.",
    keywords: "plumber St Albans",
  },
  {
    slug: "why-choose-a-local-plumber",
    title: "Why Choose a Local Plumber",
    summary: "The benefits of working with a responsive local plumbing and heating company.",
    keywords: "local plumber St Albans",
  },
  {
    slug: "winter-plumbing-tips",
    title: "Winter Plumbing Tips",
    summary: "Simple ways to protect pipes, boilers and heating systems during colder months.",
    keywords: "emergency plumber Hertfordshire",
  },
  {
    slug: "how-to-reduce-heating-bills",
    title: "How to Reduce Heating Bills",
    summary: "Smart controls, servicing, insulation and system care can all help improve efficiency.",
    keywords: "heating engineer St Albans",
  },
];

const navGroups = [
  {
    label: "Company",
    links: [
      ["Home", "/"],
      ["About Us", "/about-us/"],
      ["Areas We Cover", "/areas-we-cover/"],
      ["Gallery", "/gallery/"],
      ["Reviews", "/reviews/"],
      ["Blog", "/blog/"],
      ["FAQs", "/faqs/"],
    ],
  },
  {
    label: "Services",
    links: servicePages
      .filter((page) =>
        [
          "plumbing-services",
          "heating-services",
          "boiler-installation",
          "boiler-repairs",
          "boiler-servicing",
          "gas-engineers",
          "emergency-plumbing",
          "bathroom-installations",
          "power-flushing",
          "radiator-installation",
          "underfloor-heating",
          "landlord-gas-safety-certificates",
          "unvented-cylinders",
        ].includes(page.slug),
      )
      .map((page) => [page.title, `/${page.slug}/`]),
  },
  {
    label: "Contact",
    links: [
      ["Book Online", "/book-online/"],
      ["Contact", "/contact/"],
      ["Privacy Policy", "/privacy-policy/"],
      ["Terms", "/terms-and-conditions/"],
    ],
  },
];

const serviceMap = new Map(servicePages.map((page) => [page.slug, page]));

function icon(name) {
  const paths = {
    tap: '<path d="M8 7h8v4h-2v2a4 4 0 0 1-8 0v-1h3v1a1 1 0 0 0 2 0v-2H8z"/><path d="M11 3h2v4h-2z"/>',
    flame:
      '<path d="M12 21c-3.6 0-6-2.5-6-5.8 0-2.6 1.5-4.5 3.1-6.1.9-.9 1.4-2.1 1.2-3.4 2.8 1.2 5.7 4 5.7 7.4.7-.7 1.1-1.7 1.1-2.8 1.8 1.6 2.9 3.5 2.9 5.7 0 3-2.5 5-6 5z"/>',
    boiler: '<rect x="6" y="3" width="12" height="16" rx="2"/><path d="M9 7h6M9 11h6M9 19v2M15 19v2"/>',
    tool: '<path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.6 2.6-3-3z"/>',
    shield: '<path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z"/><path d="m9 12 2 2 4-5"/>',
    certificate:
      '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/><path d="m15 18 2 2 2-2"/>',
    bath: '<path d="M5 11h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3z"/><path d="M8 11V6a2 2 0 0 1 4 0v1"/>',
    drop: '<path d="M12 2s6 7 6 12a6 6 0 0 1-12 0c0-5 6-12 6-12z"/>',
    warning: '<path d="M12 3 2 21h20z"/><path d="M12 9v5M12 17h.01"/>',
    radiator: '<rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 5v14M12 5v14M15 5v14M3 17h2M19 17h2"/>',
    refresh: '<path d="M20 12a8 8 0 0 1-14.9 4M4 12A8 8 0 0 1 18.9 8"/><path d="M5 20v-4h4M19 4v4h-4"/>',
    grid: '<path d="M4 5h16M4 10h16M4 15h16M4 20h16M8 5v15M16 5v15"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.7 19.7 0 0 1-8.6-3.1 19.2 19.2 0 0 1-6-6A19.7 19.7 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
    star: '<path d="m12 2 3 6 6.5.9-4.7 4.6 1.1 6.5L12 17l-5.9 3 1.1-6.5L2.5 8.9 9 8z"/>',
  };
  return `<svg aria-hidden="true" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.tap}</svg>`;
}

function pagePath(slug = "") {
  return slug ? `/${slug}/` : "/";
}

function writePage(path, html) {
  const target = path === "/" ? join(out, "index.html") : join(out, path, "index.html");
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html);
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

function words(text) {
  return text.trim().split(/\s+/).length;
}

function breadcrumb(items) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb">${items
    .map((item, index) =>
      index === items.length - 1
        ? `<span>${esc(item[0])}</span>`
        : `<a href="${item[1]}">${esc(item[0])}</a>`,
    )
    .join('<span aria-hidden="true">/</span>')}</nav>`;
}

function brandLogo(className = "") {
  return `<img class="brand-logo ${className}" src="${images.logo}" alt="${business.name}" width="255" height="255">`;
}

function trustStrip() {
  return `<section class="section trust-strip" aria-label="Trust badges">
    <img class="trust-logo gas-safe-logo" src="${images.gasSafe}" alt="Gas Safe Register" width="920" height="500" loading="lazy">
    <img class="trust-logo google-logo" src="${images.googleReviews}" alt="Google Reviews 5.0" width="467" height="225" loading="lazy">
    <img class="trust-logo rated-logo" src="${images.ratedPeople}" alt="Rated People" width="1600" height="1000" loading="lazy">
    ${trustBadges.map((badge) => `<span>${badge}</span>`).join("")}
  </section>`;
}

function header(currentPath) {
  const nav = navGroups
    .map(
      (group) => `<div class="nav-group"><p>${group.label}</p>${group.links
        .map(([label, href]) => `<a href="${href}"${href === currentPath ? ' aria-current="page"' : ""}>${label}</a>`)
        .join("")}</div>`,
    )
    .join("");

  return `<header class="site-header">
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="top-strip">
      <span>Local plumbing, heating and gas engineers across St Albans and Hertfordshire</span>
      <a href="mailto:${business.email}">${business.email}</a>
    </div>
    <div class="header-inner">
      <a class="brand" href="/" aria-label="${business.name} home">
        ${brandLogo()}
      </a>
      <button class="nav-toggle" type="button" aria-controls="primary-nav" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav class="primary-nav" id="primary-nav" aria-label="Primary navigation">${nav}</nav>
      <a class="btn btn-call header-call" href="tel:${business.phoneHref}">${icon("phone")}Call Now</a>
    </div>
  </header>`;
}

function footer() {
  return `<footer class="site-footer">
    <div class="footer-cta">
      <div>
        <p class="eyebrow">Ready to book?</p>
        <h2>Speak to a local plumbing and heating engineer today.</h2>
      </div>
      <div class="cta-row">
        <a class="btn btn-primary" href="/book-online/">${icon("calendar")}Book Online</a>
        <a class="btn btn-secondary" href="tel:${business.phoneHref}">${icon("phone")}${business.phoneDisplay}</a>
      </div>
    </div>
    <div class="footer-grid">
      <div>
        <a class="brand footer-brand" href="/">
          ${brandLogo("footer-logo")}
        </a>
        <p>${business.name} provides plumbing, heating, boiler and gas engineering services across St Albans and Hertfordshire.</p>
        <div class="footer-trust-logos">
          <img src="${images.gasSafe}" alt="Gas Safe Register" width="920" height="500" loading="lazy">
          <img src="${images.googleReviews}" alt="Google Reviews 5.0" width="467" height="225" loading="lazy">
          <img src="${images.ratedPeople}" alt="Rated People" width="1600" height="1000" loading="lazy">
        </div>
        <div class="badge-row">${trustBadges.map((badge) => `<span>${badge}</span>`).join("")}</div>
      </div>
      ${navGroups
        .map(
          (group) => `<div><h3>${group.label}</h3>${group.links
            .slice(0, 8)
            .map(([label, href]) => `<a href="${href}">${label}</a>`)
            .join("")}</div>`,
        )
        .join("")}
      <div>
        <h3>Contact</h3>
        <a href="tel:${business.phoneHref}">${business.phoneDisplay}</a>
        <a href="https://wa.me/${business.whatsapp}">WhatsApp</a>
        <a href="mailto:${business.email}">${business.email}</a>
        <p>Monday to Friday 8:00am - 6:00pm<br>Saturday 9:00am - 2:00pm<br>Emergency callouts subject to availability.</p>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; ${new Date().getFullYear()} ${business.name}. All rights reserved.</span>
      <span>Website ready for Google Analytics and Search Console.</span>
    </div>
  </footer>
  <a class="floating-whatsapp" href="https://wa.me/${business.whatsapp}" aria-label="Message Alban Plumbing and Heating on WhatsApp">WhatsApp</a>
  <a class="mobile-call" href="tel:${business.phoneHref}">${icon("phone")}Call Now</a>
  <div class="cookie-consent" hidden>
    <p>This website uses essential cookies and optional analytics cookies to improve enquiries.</p>
    <button class="btn btn-primary" type="button">Accept</button>
  </div>`;
}

function commonSchema(path) {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": `${baseUrl}/#business`,
    name: business.name,
    url: `${baseUrl}${path}`,
    telephone: business.phoneDisplay,
    email: business.email,
    image: `${baseUrl}${images.hero}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "St Albans",
      addressRegion: "Hertfordshire",
      addressCountry: "GB",
    },
    areaServed: areas.map((area) => ({ "@type": "City", name: area })),
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    sameAs: [`https://wa.me/${business.whatsapp}`],
  };
}

function shell({ path, title, description, content, schema = [], ogImage = images.hero }) {
  const canonical = `${baseUrl}${path}`;
  const graph = [commonSchema(path), ...schema];
  return `<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <meta name="theme-color" content="#0b2745">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${baseUrl}${ogImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${baseUrl}${ogImage}">
  <link rel="preload" as="image" href="${ogImage}" fetchpriority="high">
  <link rel="stylesheet" href="/assets/css/styles.css">
  <script type="application/ld+json">${JSON.stringify(graph)}</script>
</head>
<body>
${header(path)}
<main id="main">${content}</main>
${footer()}
<script src="/assets/js/main.js" defer></script>
</body>
</html>`;
}

function serviceCard(service) {
  return `<article class="service-card">
    <a href="/${service.slug}/" aria-label="${service.title}">
      <span class="card-icon">${icon(service.icon)}</span>
      <h3>${service.title}</h3>
      <p>${service.intro}</p>
      <span class="text-link">View service</span>
    </a>
  </article>`;
}

function reviewCards() {
  return `<div class="review-grid">${reviews
    .map(
      (review) => `<figure class="review-card">
      <div class="stars" aria-label="5 out of 5 stars">${Array(5).fill(icon("star")).join("")}</div>
      <blockquote>${review.text}</blockquote>
      <figcaption>${review.name}<span>${review.location}</span></figcaption>
    </figure>`,
    )
    .join("")}</div>`;
}

function areaLinks() {
  return `<div class="area-list">${areas
    .map((area) => `<a href="/areas-we-cover/${slugify(area)}/">${area}</a>`)
    .join("")}</div>`;
}

function slugify(value) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function faqsFor(subject) {
  return [
    {
      q: `Do you cover ${subject} in St Albans?`,
      a: `Yes. ${business.name} provides ${subject.toLowerCase()} across St Albans and nearby Hertfordshire areas including Harpenden, Hatfield, London Colney and Radlett.`,
    },
    {
      q: "Can I book a same day appointment?",
      a: "Same day appointments are available where the schedule allows. Urgent leaks, heating failures and safety concerns are prioritised.",
    },
    {
      q: "Will I receive clear pricing before work starts?",
      a: "You will receive clear advice before work begins, with the likely scope, practical options and any parts or follow-up visits explained.",
    },
    {
      q: "Are you fully insured?",
      a: "Yes. The business presents itself as fully insured, local and focused on reliable workmanship for domestic and commercial customers.",
    },
  ];
}

function faqHtml(faqs) {
  return `<div class="faq-list">${faqs
    .map(
      (faq) => `<details>
      <summary>${faq.q}</summary>
      <p>${faq.a}</p>
    </details>`,
    )
    .join("")}</div>`;
}

function faqSchema(faqs) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

function hero({ eyebrow, h1, text, image, backgroundImage, mediaFit, ctas = true }) {
  const heroClass = backgroundImage ? "hero hero-home-bg" : "hero";
  const backgroundStyle = backgroundImage ? ` style="--hero-bg: url('${backgroundImage}');"` : "";
  const mediaClass = mediaFit === "contain" ? "hero-media hero-media-contain" : "hero-media";
  const mediaStyle = mediaFit === "contain" ? ` style="--media-bg: url('${image}');"` : "";
  return `<section class="${heroClass}"${backgroundStyle}>
    <div class="hero-copy">
      <p class="eyebrow">${eyebrow}</p>
      <h1>${h1}</h1>
      <p class="hero-text">${text}</p>
      ${
        ctas
          ? `<div class="cta-row">
        <a class="btn btn-primary" href="/book-online/">${icon("calendar")}Book Online</a>
        <a class="btn btn-secondary" href="tel:${business.phoneHref}">${icon("phone")}Call Now</a>
        <a class="btn btn-ghost" href="/contact/">Get Free Quote</a>
      </div>`
          : ""
      }
      <div class="hero-proof">
        <span class="proof-logo"><img src="${images.googleReviews}" alt="Google Reviews 5.0" width="467" height="225" loading="lazy"></span>
        <span><strong>Years Experience</strong>Trusted local engineers</span>
        <span><strong>Emergency Callouts</strong>Subject to availability</span>
        <span><strong>Same Day Appointments</strong>Call to check</span>
      </div>
    </div>
    ${
      backgroundImage
        ? ""
        : `<div class="${mediaClass}"${mediaStyle}>
      <img src="${image}" alt="${esc(h1)}" width="1792" height="1024" loading="eager" fetchpriority="high">
    </div>`
    }
  </section>`;
}

function homePage() {
  const latest = blogPosts
    .slice(0, 3)
    .map(
      (post) => `<article class="article-card">
      <a href="/blog/${post.slug}/">
        <p class="eyebrow">Guide</p>
        <h3>${post.title}</h3>
        <p>${post.summary}</p>
      </a>
    </article>`,
    )
    .join("");

  const content = `${hero({
    eyebrow: "St Albans plumbing, heating and gas engineers",
    h1: "Trusted Plumbers, Heating Engineers and Gas Safe Engineers in St Albans",
    text:
      "Providing reliable plumbing, heating and boiler services across St Albans and Hertfordshire with honest pricing, quality workmanship and exceptional customer service.",
    image: images.homepageBackground,
    backgroundImage: images.homepageBackground,
  })}
  ${trustStrip()}
  <section class="section intro-band">
    <div>
      <p class="eyebrow">Premium local service</p>
      <h2>Clean workmanship, clear communication and dependable home comfort.</h2>
    </div>
    <p>${business.name} helps homeowners, landlords and local businesses with plumbing, heating, boiler, gas safety, bathroom and emergency repair work across ${business.area}</p>
  </section>
  <section class="section">
    <div class="section-heading">
      <p class="eyebrow">Services</p>
      <h2>Plumbing, heating and boiler services</h2>
    </div>
    <div class="service-grid">${servicePages.slice(0, 12).map(serviceCard).join("")}</div>
  </section>
  <section class="section split-section">
    <div>
      <p class="eyebrow">Before and after</p>
      <h2>Neat installations for modern Hertfordshire homes.</h2>
      <p>From compact boiler cupboards to bathroom pipework and radiator upgrades, the focus is on practical design, safe work and a tidy finish that feels right in your home.</p>
      <a class="text-link" href="/gallery/">View gallery</a>
    </div>
    <div class="gallery-preview">
      <img src="${images.bathroom}" alt="Modern bathroom installation by Alban Plumbing and Heating" width="1792" height="1024" loading="lazy">
      <img src="${images.homepageBackground}" alt="Alban Plumbing and Heating engineers completing under-sink plumbing work" width="1600" height="1067" loading="lazy">
    </div>
  </section>
  <section class="section">
    <div class="section-heading">
      <p class="eyebrow">Reviews</p>
      <h2>Professional feedback from local customers</h2>
    </div>
    ${reviewCards()}
  </section>
  <section class="section split-section">
    <div>
      <p class="eyebrow">Areas served</p>
      <h2>Local cover across St Albans and Hertfordshire.</h2>
      <p>Book a local plumber, heating engineer or gas engineer for homes in St Albans, Harpenden, Hatfield, London Colney, Redbourn, Wheathampstead, Radlett, Sandridge and Bricket Wood.</p>
      ${areaLinks()}
    </div>
    <img class="rounded-media" src="${images.local}" alt="St Albans and Hertfordshire local service area" width="1792" height="1024" loading="lazy">
  </section>
  <section class="section brand-strip" aria-label="Boiler and heating brands">${brands.map((brand) => `<span>${brand}</span>`).join("")}</section>
  <section class="section">
    <div class="section-heading">
      <p class="eyebrow">Latest advice</p>
      <h2>Plumbing and heating guides</h2>
    </div>
    <div class="article-grid">${latest}</div>
  </section>
  ${mapSection()}`;

  writePage(
    "/",
    shell({
      path: "/",
      title: "Plumber St Albans | Heating Engineer & Gas Engineer | Alban Plumbing",
      description:
        "Alban Plumbing and Heating Ltd provides trusted plumbing, heating, boiler and gas engineering services across St Albans and Hertfordshire.",
      content,
      ogImage: images.homepageBackground,
    }),
  );
}

function servicePage(service) {
  const faqs = faqsFor(service.title);
  const related = service.related
    .map((slug) => serviceMap.get(slug))
    .filter(Boolean)
    .map(serviceCard)
    .join("");
  const copy = serviceLongCopy(service);
  const content = `${breadcrumb([["Home", "/"], [service.title]])}
  ${hero({
        eyebrow: service.keyword,
        h1: `${service.title} in St Albans`,
        text: service.intro,
        image: service.image,
        mediaFit: service.mediaFit,
      })}
  <section class="section prose">
    ${copy}
  </section>
  <section class="section">
    <div class="section-heading"><p class="eyebrow">Benefits</p><h2>Why choose ${business.name}?</h2></div>
    <div class="feature-grid">${service.benefits
      .map((benefit) => `<div class="feature"><span>${icon(service.icon)}</span><h3>${benefit}</h3><p>Planned carefully, completed cleanly and explained in plain English before work moves forward.</p></div>`)
      .join("")}</div>
  </section>
  <section class="section process">
    <div><p class="eyebrow">Process</p><h2>A clear process from first call to completion</h2></div>
    <ol>
      <li><strong>Discuss the issue.</strong> Share photos, symptoms, property access and urgency so the visit can be planned properly.</li>
      <li><strong>Inspect and advise.</strong> The engineer checks the system, explains practical options and highlights any safety concerns.</li>
      <li><strong>Complete the work.</strong> Repairs, servicing or installation work is carried out with care for the home and surrounding finishes.</li>
      <li><strong>Test and hand over.</strong> The work is checked, the area is left tidy and you receive clear guidance on aftercare.</li>
    </ol>
  </section>
  <section class="section">
    <div class="section-heading"><p class="eyebrow">FAQs</p><h2>${service.title} FAQs</h2></div>
    ${faqHtml(faqs)}
  </section>
  <section class="section">
    <div class="section-heading"><p class="eyebrow">Related services</p><h2>Useful next steps</h2></div>
    <div class="service-grid">${related}</div>
  </section>
  <section class="section">${reviewCards()}</section>`;

  writePage(
    service.slug,
    shell({
      path: pagePath(service.slug),
      title: `${service.title} St Albans | ${service.keyword} | Alban Plumbing`,
      description: `${service.intro} Call ${business.name} for trusted ${service.title.toLowerCase()} across St Albans and Hertfordshire.`,
      content,
      ogImage: service.image,
      schema: [
        {
          "@type": "Service",
          serviceType: service.title,
          provider: { "@id": `${baseUrl}/#business` },
          areaServed: areas,
          description: service.intro,
        },
        faqSchema(faqs),
      ],
    }),
  );
}

function serviceLongCopy(service) {
  const primary = service.title.toLowerCase();
  return `<h2>Professional ${primary} for St Albans homes and businesses</h2>
  <p>${business.name} provides ${primary} with a calm, professional approach from the first enquiry through to the finished job. Whether you need help with an urgent issue, planned improvement, annual maintenance or a larger installation, the priority is always the same: understand the property, explain the options clearly and complete the work with care. Customers across St Albans and Hertfordshire want engineers who arrive prepared, communicate well and respect the home. That is the standard this website is built around.</p>
  <p>Good ${primary} starts with a proper conversation. A small symptom can point to several possible causes, especially where plumbing, heating and gas systems overlap. Low pressure, recurring leaks, noisy pipework, slow hot water, cold radiators or unreliable controls can all be connected to the condition of the wider system. By looking at the practical details first, the engineer can recommend a repair, service, upgrade or replacement that fits the property rather than applying a one-size answer.</p>
  <h2>Benefits of booking a local specialist</h2>
  <p>Working with a local company helps appointments run more smoothly. Travel times are sensible, local property types are familiar and common issues in the area can be recognised quickly. Many homes around St Albans, Harpenden, Hatfield, London Colney, Radlett and Redbourn have a mix of older pipework, modern boiler upgrades, extended layouts and hard-working family bathrooms. A local engineer can factor those realities into the visit and make recommendations that work in day-to-day use.</p>
  <p>The benefits of professional ${primary} include safer systems, more reliable performance, fewer repeat visits and a cleaner finish. For planned work, careful preparation can reduce disruption and protect surrounding surfaces. For urgent work, a structured approach helps isolate the problem, limit damage and agree the most sensible repair path. For landlords and commercial customers, clear communication and records are especially important because access, compliance and tenant convenience all need to be managed.</p>
  <h2>What the visit can include</h2>
  <p>Depending on the job, the appointment may include visual inspection, fault finding, pressure checks, component testing, pipework assessment, safety checks, performance testing and practical advice on next steps. For installation or replacement work, the survey can also consider positioning, access, flue routes, controls, hot water demand, radiator output, existing pipework and future maintenance access. The aim is to prevent surprises and produce a result that looks tidy as well as working properly.</p>
  <p>Every property is different. A compact flat, a Victorian terrace, a family semi-detached home and a managed commercial unit all place different demands on plumbing and heating systems. That is why clear diagnosis matters. Sometimes the right solution is a straightforward part replacement or service. Sometimes the better long-term answer is upgrading a control, flushing a system, replacing an old valve, improving access or planning a more complete installation.</p>
  <h2>Local coverage and internal links</h2>
  <p>${business.name} covers ${business.area} If you are comparing services, you may also find the pages for ${service.related
    .map((slug) => {
      const related = serviceMap.get(slug);
      return related ? `<a href="/${related.slug}/">${related.title}</a>` : "";
    })
    .filter(Boolean)
    .join(", ")} useful. These related services often overlap because heating, plumbing, gas safety and bathroom work are connected in real homes.</p>
  <p>For a quick quote or appointment, use the booking form, call <a href="tel:${business.phoneHref}">${business.phoneDisplay}</a> or send a message with photos. Clear photographs of the boiler, pipework, leak, radiator, appliance label or room layout can often help the engineer understand the likely scope before attending.</p>
  <p class="word-note" hidden>${words(service.intro)}</p>`;
}

function mapSection() {
  return `<section class="section map-section">
    <div>
      <p class="eyebrow">Find us locally</p>
      <h2>Serving St Albans and nearby Hertfordshire areas</h2>
      <p>Appointments are available across St Albans, Harpenden, Hatfield, London Colney, Redbourn, Wheathampstead, Radlett, Sandridge and Bricket Wood.</p>
    </div>
    <iframe title="Map of St Albans, Hertfordshire" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=St%20Albans%20Hertfordshire&output=embed"></iframe>
  </section>`;
}

function simplePage({ slug, title, description, body, image = images.local }) {
  writePage(
    slug,
    shell({
      path: pagePath(slug),
      title,
      description,
      ogImage: image,
      content: `${breadcrumb([["Home", "/"], [title]])}${hero({
        eyebrow: "Alban Plumbing and Heating Ltd",
        h1: title,
        text: description,
        image,
        ctas: true,
      })}${body}`,
    }),
  );
}

function aboutPage() {
  simplePage({
    slug: "about-us",
    title: "About Alban Plumbing and Heating Ltd",
    description:
      "A trusted local plumbing, heating and gas engineering company serving St Albans and Hertfordshire.",
    body: `<section class="section prose"><h2>Local, professional and built around trust</h2><p>${business.name} supports homeowners, landlords and local businesses with plumbing, heating, boiler and gas engineering services. The company is based around clear communication, tidy workmanship and practical advice, helping customers feel confident before work starts and informed when it is complete.</p><p>The service area includes ${business.area} The work covers urgent repairs, planned upgrades, boiler installation, boiler servicing, gas safety checks, bathroom plumbing, radiator work, power flushing and underfloor heating support.</p></section>${trustStrip()}`,
  });
}

function galleryPage() {
  const items = [
    ["Boiler Installations", images.homepageBoiler],
    ["Bathrooms", images.bathroom],
    ["Radiators", images.radiator],
    ["Pipework", images.radiator],
    ["Emergency Repairs", images.radiator],
    ["Heating Systems", images.hero],
    ["Before and After", images.bathroom],
  ];
  simplePage({
    slug: "gallery",
    title: "Gallery",
    description: "Professional plumbing, heating, bathroom, radiator and boiler installation gallery.",
    body: `<section class="section gallery-grid">${items
      .map(([label, src]) => `<figure><img src="${src}" alt="${label} by Alban Plumbing and Heating" width="1792" height="1024" loading="lazy"><figcaption>${label}</figcaption></figure>`)
      .join("")}</section>`,
  });
}

function reviewsPage() {
  simplePage({
    slug: "reviews",
    title: "Reviews",
    description: "Customer testimonials for Alban Plumbing and Heating Ltd in St Albans and Hertfordshire.",
    body: `<section class="section">${reviewCards()}</section>`,
  });
}

function faqsPage() {
  const faqs = [
    ...faqsFor("plumbing and heating services"),
    {
      q: "Do you provide emergency plumbing?",
      a: "Emergency plumbing callouts are available subject to engineer availability. Call first for urgent leaks, burst pipes or heating problems.",
    },
    {
      q: "Can I upload photos when booking?",
      a: "Yes. The booking form includes a photo upload field so you can share images of leaks, pipework, boilers, radiators or room layouts.",
    },
  ];
  simplePage({
    slug: "faqs",
    title: "Frequently Asked Questions",
    description: "Answers to common plumbing, heating, boiler and booking questions.",
    body: `<section class="section">${faqHtml(faqs)}</section>`,
  });
}

function bookingPage() {
  simplePage({
    slug: "book-online",
    title: "Book Online",
    description: "Request a plumbing, heating, boiler or gas engineering appointment online.",
    image: images.hero,
    body: `<section class="section form-section booking-message-section">
      <form class="booking-form" data-booking-form data-recipient="${business.email}" data-supabase-url="${supabase.url}" data-supabase-key="${supabase.publishableKey}">
        <div class="booking-form-heading">
          <p class="eyebrow">Book online</p>
          <h2>Send Us a Message</h2>
        </div>
        <label><span>Your Name</span><input name="name" autocomplete="name" placeholder="Your Name" required></label>
        <label><span>Email Address</span><input name="email" type="email" autocomplete="email" placeholder="Email Address" required></label>
        <label><span>Phone Number</span><input name="phone" type="tel" autocomplete="tel" placeholder="Phone Number" required></label>
        <label><span>Select Service</span><select name="service" required><option value="">Select Service</option>${servicePages.map((s) => `<option>${s.title}</option>`).join("")}</select></label>
        <label><span>Postcode</span><input name="postcode" autocomplete="postal-code" placeholder="Postcode" required></label>
        <label><span>Preferred Date</span><input name="date" type="date"></label>
        <label class="full"><span>Subject</span><input name="subject" placeholder="Subject"></label>
        <label><span>Address</span><input name="address" autocomplete="street-address" placeholder="Address"></label>
        <label><span>Preferred Time</span><input name="time" type="time"></label>
        <label class="full"><span>Your Message</span><textarea name="message" rows="6" placeholder="Your Message"></textarea></label>
        <label class="full"><span>Upload Photos</span><input name="photos" type="file" accept="image/*" multiple></label>
        <label class="robot-check full"><input name="human_check" type="checkbox" required><span>I'm not a robot</span></label>
        <button class="btn btn-primary booking-submit full" type="submit">Submit Now</button>
        <p class="form-confirmation" role="status" hidden></p>
      </form>
    </section>`,
  });
}

function contactPage() {
  simplePage({
    slug: "contact",
    title: "Contact Alban Plumbing and Heating Ltd",
    description: "Call, WhatsApp or email Alban Plumbing and Heating Ltd for plumbing and heating services in St Albans.",
    body: `<section class="section contact-grid">
      <div class="contact-card"><h2>Phone</h2><a href="tel:${business.phoneHref}">${business.phoneDisplay}</a><p>Call for bookings, urgent enquiries and advice.</p></div>
      <div class="contact-card"><h2>WhatsApp</h2><a href="https://wa.me/${business.whatsapp}">Message on WhatsApp</a><p>Send photos of leaks, boilers, radiators or pipework.</p></div>
      <div class="contact-card"><h2>Email</h2><a href="mailto:${business.email}">${business.email}</a><p>Useful for quotes, planned work and property management enquiries.</p></div>
      <div class="contact-card"><h2>Opening Hours</h2><p>Monday to Friday 8:00am - 6:00pm<br>Saturday 9:00am - 2:00pm<br>Emergency contact subject to availability.</p></div>
    </section>${mapSection()}`,
  });
}

function areasIndex() {
  simplePage({
    slug: "areas-we-cover",
    title: "Areas We Cover",
    description: "Plumbing, heating and gas engineering services across St Albans and Hertfordshire.",
    body: `<section class="section prose"><h2>Local service areas</h2><p>${business.name} works across ${business.area} Select your local area for more specific plumbing, heating, boiler and emergency service information.</p>${areaLinks()}</section>`,
  });
}

function areaPage(area) {
  const areaSlug = `areas-we-cover/${slugify(area)}`;
  const text = `${business.name} provides trusted plumbing, heating, boiler and gas engineering services in ${area}.`;
  const body = `<section class="section prose">
    <h2>Plumber and heating engineer in ${area}</h2>
    <p>${text} Customers in ${area} often need a practical mix of emergency repairs, boiler maintenance, heating improvements and planned plumbing work. A local approach helps appointments stay efficient because the engineer understands the surrounding St Albans and Hertfordshire area, common property types and the importance of clear timing.</p>
    <p>Services in ${area} include boiler installation, boiler repair, boiler servicing, radiator installation, power flushing, leak detection, burst pipe repairs, kitchen plumbing, bathroom installation, landlord gas safety certificates and commercial plumbing support. For urgent work, call <a href="tel:${business.phoneHref}">${business.phoneDisplay}</a> and describe the issue as clearly as possible.</p>
    <p>Photos are useful for local bookings. Send images of the boiler, pipework, leak, radiator, stopcock, bathroom, kitchen sink or appliance connection so the likely parts and access requirements can be understood before arrival.</p>
    <h2>Nearby services</h2>
    <p>${servicePages.slice(0, 8).map((service) => `<a href="/${service.slug}/">${service.title}</a>`).join(" ")}</p>
  </section>`;
  writePage(
    areaSlug,
    shell({
      path: `/${areaSlug}/`,
      title: `Plumber ${area} | Heating Engineer ${area} | Alban Plumbing`,
      description: `${text} Book local boiler, plumbing, heating and emergency services.`,
      content: `${breadcrumb([["Home", "/"], ["Areas We Cover", "/areas-we-cover/"], [area]])}${hero({
        eyebrow: "Local Hertfordshire service",
        h1: `Plumber and Heating Engineer in ${area}`,
        text,
        image: images.local,
      })}${body}`,
      ogImage: images.local,
    }),
  );
}

function blogIndex() {
  simplePage({
    slug: "blog",
    title: "Blog",
    description: "Helpful plumbing, heating, boiler and energy saving advice from Alban Plumbing and Heating Ltd.",
    body: `<section class="section article-grid">${blogPosts.map((post) => `<article class="article-card"><a href="/blog/${post.slug}/"><p class="eyebrow">${post.keywords}</p><h2>${post.title}</h2><p>${post.summary}</p></a></article>`).join("")}</section>`,
  });
}

function blogPage(post) {
  const body = `<section class="section prose">
    <h2>${post.title}</h2>
    <p>${post.summary} For customers in St Albans and Hertfordshire, small warning signs can be easy to ignore until they become expensive or disruptive. A planned approach to plumbing and heating maintenance helps protect comfort, reduce emergency callouts and keep the property running smoothly.</p>
    <h2>What to look for</h2>
    <p>Common signs include changes in water pressure, unusual boiler noises, cold radiator spots, slow hot water recovery, recurring leaks, higher energy bills, damp patches, running toilets and controls that no longer respond consistently. Some issues are simple repairs, while others indicate that the wider system needs cleaning, balancing, servicing or replacement.</p>
    <h2>When to call an engineer</h2>
    <p>Call a professional if there is a leak near electrics, a burst pipe, loss of heating in cold weather, suspected gas concern, repeated boiler lockout or visible damage around pipework and appliances. For less urgent work, photos and a clear description can help plan the appointment and identify likely parts.</p>
    <h2>Related services</h2>
    <p><a href="/boiler-servicing/">Boiler servicing</a> <a href="/boiler-repairs/">Boiler repairs</a> <a href="/plumbing-services/">Plumbing services</a> <a href="/heating-services/">Heating services</a></p>
  </section>`;
  writePage(
    `blog/${post.slug}`,
    shell({
      path: `/blog/${post.slug}/`,
      title: `${post.title} | Alban Plumbing and Heating Blog`,
      description: post.summary,
      content: `${breadcrumb([["Home", "/"], ["Blog", "/blog/"], [post.title]])}${hero({
        eyebrow: post.keywords,
        h1: post.title,
        text: post.summary,
        image: images.hero,
      })}${body}`,
    }),
  );
}

function termsBody() {
  return `<section class="section prose legal-page">
    <p class="eyebrow">Alban Plumbing and Heating Ltd</p>
    <h2>Terms and Conditions</h2>
    <p>These Terms and Conditions apply to services provided by Alban Plumbing and Heating Ltd ("APH", "we", "us", "our"). They set out the rules that apply when you use our services, what you can expect from us, and your rights and responsibilities as a customer.</p>
    <p><strong>Company number:</strong> 13630671<br><strong>Registered office:</strong> 46 1st Floor, Throwley Way, Sutton, England, SM1 4AF<br><strong>Contact:</strong> <a href="tel:${business.phoneHref}">07342 171 269</a><br><strong>Website:</strong> aphstalbans.co.uk</p>
    <p><a class="btn btn-secondary" href="/assets/docs/aph-terms-and-conditions.pdf">Download PDF Terms</a></p>

    <h2>1. Introduction</h2>
    <p>These are the Terms and Conditions of Alban Plumbing and Heating Ltd. They set out the rules that apply when you use our services, what you can expect from us, and your rights and responsibilities as a customer.</p>

    <h2>2. When These Terms Apply</h2>
    <p>Please read these terms carefully before using our services. By using our services, you agree to these terms, together with our Privacy Policy and Cookie Policy.</p>
    <p>The version of these terms in force at the time you book or instruct us is the version that applies. We may update these terms from time to time, usually when we introduce a new service, change how we deliver an existing one, or need to comply with a legal requirement.</p>

    <h2>3. What We Mean by Services</h2>
    <p>"Services" means anything offered by APH across the trades we cover, including plumbing, heating, gas, drains, bathrooms, electrics, carpentry, appliances, roofing, building, emergencies and commercial work.</p>
    <p>This includes enquiries, estimates, project work, installations, repairs, emergency call-outs, servicing and guarantees.</p>

    <h2>4. Definitions</h2>
    <p><strong>"We", "us", "our" or "APH"</strong> means Alban Plumbing and Heating Ltd.</p>
    <p><strong>"You"</strong> means the customer, being the person or organisation for whom we agree to carry out work and/or supply materials.</p>
    <p><strong>"Tradesperson"</strong> means the representative appointed by APH to carry out the work.</p>
    <p>We reserve the right to decline any piece of work and to decide, at our discretion, which tradesperson is assigned to a job.</p>

    <h2>5. Hourly Rate Work</h2>
    <p>Where work is charged by the hour, the total cost to you will be made up of labour and materials.</p>
    <ul>
      <li><strong>Labour:</strong> time spent by the tradesperson carrying out the work, including reasonable time spent collecting non-stocked materials, charged at our current hourly rate.</li>
      <li><strong>Materials:</strong> materials supplied by us, charged at no more than trade purchase price plus a 25% markup.</li>
      <li>You are only charged for time spent on your job. Breaks, such as lunch, are not chargeable.</li>
    </ul>

    <h2>6. Fixed Price Work</h2>
    <p>Where we give you a fixed price, that price is firm, subject to manifest errors, and covers both labour and materials.</p>
    <p>A written estimate may be revised if you instruct us to carry out extra work not covered in the original estimate, the price of materials increases, further necessary work is discovered that was not apparent when the estimate was prepared, or a manifest error is found in the original estimate.</p>
    <p>If a detailed insurance report is required in addition to the standard estimate and invoice, a GBP 25.00 charge applies.</p>
    <p>We are under no obligation to provide an estimate, and we are only bound by estimates given in writing and signed by an authorised representative. We are not bound by verbal estimates or any estimate containing a manifest error.</p>

    <h2>7. Offers and Incentives</h2>
    <p>From time to time, at our discretion, we run offers and incentives. Each offer will clearly state its own terms. Offers may only be combined with one another where we expressly allow it.</p>
    <p>This includes complimentary computer-aided design (CAD) concept artwork for bathroom projects, where offered.</p>

    <h2>8. Collecting Materials</h2>
    <p>Where we need to collect materials or parts that are not already in stock, collection time will be kept to a reasonable minimum and should not normally exceed 45 minutes.</p>
    <p>If we expect collection to take longer than 45 minutes, we will let you know in advance and explain why. Only one tradesperson will leave a job to collect materials.</p>

    <h2>9. Invoices and Payment</h2>
    <p>Once you have agreed for us to carry out estimated or pre-booked work, a deposit of 50% of the total price is due immediately. We reserve the right to request full payment upfront at our discretion.</p>
    <p>On completion of the work, we will issue an invoice payable within 48 hours of issue. If payment is not received within this 48-hour window, a one-off late payment fee of 10% of the outstanding invoice total will apply.</p>
    <p>You are solely responsible for payment in full, unless you tell us at the point of booking that you are instructing us on behalf of a third party.</p>

    <h2>10. Timekeeping</h2>
    <p>Where we have agreed a specific date and/or time, we will make reasonable efforts to ensure the tradesperson attends as arranged. We cannot accept liability for late or non-attendance, or for late or non-delivery of materials, where this is outside our reasonable control.</p>
    <p>We will not be liable for delays caused by circumstances beyond our reasonable control, and we will be entitled to a reasonable extension of time to complete the work in such cases.</p>

    <h2>11. Cancellations</h2>
    <p>If you need to cancel or rearrange a booking, please notify us, ideally by phone, by the end of the working day before your scheduled appointment. For cancellations made further in advance, we recommend also requesting written confirmation from us.</p>
    <p>If you cancel at short notice, once work has started or materials have already been ordered or supplied, you may be liable for the cost of time and materials already incurred, plus the profit we would have made on the original job.</p>

    <h2>12. Satisfaction</h2>
    <p>We aim to provide a professional, high-quality service to every customer. If you are not satisfied with completed work, please give us written notice within 28 days of completion.</p>
    <p>You must give us, and our insurers where relevant, the opportunity to inspect the work and carry out any necessary remedial work. If we are not notified within this period, we will not be liable for defects in the work carried out.</p>

    <h2>13. Guarantee on Workmanship</h2>
    <p>We provide a 28-day guarantee on the labour carried out by an APH tradesperson, covering faulty workmanship only. This runs from the date the work is completed and is in addition to any separate manufacturer's warranty.</p>
    <p>The guarantee becomes void where the work or appliance has been subject to misuse or negligence, or repaired, modified or otherwise interfered with by anyone other than an APH tradesperson.</p>
    <p>We accept no liability for materials supplied by you, and no liability for any consequential damage or fault arising from them.</p>
    <p>The guarantee does not cover blockages in waste or drainage systems, work carried out on your instruction against the written or verbal advice of the tradesperson, or faults unrelated to the work we actually carried out.</p>
    <p>Where we carry out work on existing installations that are of inferior quality or over 10 years old, no warranty is given in respect of that work, and we accept no liability for its ongoing effectiveness.</p>

    <h2>14. Warranty on Parts and Materials</h2>
    <p>Parts and materials we supply, such as boilers, cylinders, taps, valves and appliances, are covered by the relevant manufacturer's warranty, not by APH directly. Warranty length and terms vary by manufacturer and product.</p>
    <p>Where a part fails within its manufacturer's warranty period due to a manufacturing fault, we will assist you in pursuing a warranty claim with the manufacturer or supplier. Labour to remove and refit a faulty part under warranty may be chargeable unless the original fitting was carried out by us within the previous 28 days under Section 13.</p>
    <p>Manufacturer warranties are typically void if the part has been modified, misused, installed by someone other than a qualified tradesperson, or not maintained or serviced in line with the manufacturer's instructions.</p>
    <p>We are not liable for manufacturing defects in parts we did not manufacture ourselves. Our responsibility is limited to correct supply and installation in line with manufacturer guidelines.</p>

    <h2>15. Liability</h2>
    <p>Our liability is limited to rectifying guaranteed work. We are not responsible for damage or claims arising from separate, unrelated work that was overlooked, declined or not instructed at the time.</p>
    <p>We accept no liability for damage or defects resulting from work that is not covered by the guarantee, or where recommended remedial work was declined.</p>
    <p>We are not liable for delays, or the consequences of delays, caused by circumstances beyond our reasonable control, and we are entitled to a reasonable extension of time in such cases.</p>
    <p>Where a tradesperson's negligence or faulty workmanship makes us liable for damages or rectification costs, we are entitled to recover those costs from that tradesperson.</p>
    <p>You are solely responsible for any hazardous situation relating to Gas Safety Regulations, or covered by any Gas Warning Notice issued by one of our tradespeople. Our gas engineers operate under their own individual Gas Safe registration and are personally responsible for gas-related work and any associated liability.</p>
    <p>Nothing in these terms limits or excludes our liability for death or personal injury caused by our negligence, or for any other liability that cannot be excluded or limited under English law.</p>

    <h2>16. Title to Goods</h2>
    <p>Goods supplied and delivered by us remain our property until paid for in full. While goods remain our property, we reserve the right to retake, sell or otherwise dispose of all or part of those goods, enter premises where the goods are installed, stored or reasonably believed to be kept, and seek a court injunction to prevent you from selling, transferring or otherwise disposing of the goods.</p>
    <p>Risk in the goods passes to you on delivery. You must insure them at replacement value and provide evidence of insurance if asked.</p>

    <h2>17. Health and Safety / Access to Property</h2>
    <p>You agree to provide our tradespeople with safe and reasonable access to the areas of your property where work is to be carried out, including access to water, electricity and parking where required for the job.</p>
    <p>Please let us know in advance of any hazards, restrictions or special access requirements at your property, including pets, young children near the work area, asbestos, structural concerns or restricted parking.</p>
    <p>We reserve the right to pause or stop work, without liability, if we reasonably believe that continuing would be unsafe for our tradespeople, your household or anyone else on site.</p>
    <p>You are responsible for securing pets and ensuring children are kept away from the work area and any tools, materials or equipment on site.</p>
    <p>Our tradespeople follow current UK Health and Safety legislation and industry best practice, including Gas Safe requirements for all gas-related work.</p>

    <h2>18. Data Protection and Privacy</h2>
    <p>We collect and process personal data, such as your name, address, contact details and job history, in order to provide our services, manage bookings, issue invoices and meet our legal obligations.</p>
    <p>We handle your personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. Full details of what we collect, how we use it and your rights are set out in our separate Privacy Policy, available on our website.</p>
    <p>We will not share your personal data with third parties except where necessary to deliver our services, where required by law, or with your consent.</p>
    <p>You have the right to request access to, correction of, or deletion of your personal data, subject to our legal obligations to retain certain records.</p>

    <h2>19. Photos, Before/After Images and Marketing</h2>
    <p>We may take photographs or videos of work carried out at your property, before, during and after completion, for our own quality control, training and marketing purposes, including our website, social media and promotional materials.</p>
    <p>We will not use any images that identify you personally, your address or other identifying details without your separate, explicit consent.</p>
    <p>If you do not wish for photos or videos of your property or the work carried out to be used for marketing purposes, please let us know before work begins, and we will respect this request.</p>
    <p>You may withdraw consent for the use of any previously taken images at any time by contacting us, and we will remove them from future use within a reasonable timeframe.</p>

    <h2>20. Complaints Procedure</h2>
    <p>We aim to resolve any concerns quickly and fairly. If you are unhappy with any aspect of our service, please contact us as soon as possible, ideally within 28 days of the work being completed.</p>
    <p>To raise a complaint, please contact us by phone on <a href="tel:${business.phoneHref}">07342 171 269</a> or via the contact details on our website, with details of the job and the issue. We aim to acknowledge complaints within 2 working days.</p>
    <p>Wherever possible, we will offer to inspect the work in question and propose a resolution, which may include remedial work, a partial refund or other appropriate action.</p>
    <p>If we are unable to resolve a complaint directly to your satisfaction, you may be entitled to refer the matter to an alternative dispute resolution provider, Trading Standards or a relevant trade body. We will provide details of relevant ADR schemes on request.</p>

    <h2>21. Force Majeure</h2>
    <p>We will not be liable for any failure or delay in performing our obligations where this is due to circumstances beyond our reasonable control. This includes extreme weather, fire, flood, pandemic or public health emergency, strikes or industrial action, supply chain disruption, material or parts shortages, fuel or power shortages, government action or restrictions, or any other event beyond our reasonable control.</p>
    <p>Where a force majeure event affects our ability to carry out work, we will notify you as soon as reasonably possible and agree a revised timeframe with you. Neither party will be liable to the other for any delay or failure to perform caused by such an event.</p>
    <p>If a force majeure event continues for a prolonged period such that it is no longer reasonable to proceed with the work, either party may cancel the booking, and any deposit paid will be refunded in full, less any costs reasonably incurred up to that point.</p>

    <h2>22. General</h2>
    <p>These terms may only be varied by a written instrument signed by both an authorised representative of APH and you.</p>
    <p>These terms take precedence over any terms or conditions you provide to us, whether in correspondence, purchase orders or otherwise.</p>
    <p>If any provision of these terms is found to be invalid or unenforceable by a court, the remaining provisions will continue in full force and effect.</p>
    <p>These terms, and any contract between us, are governed by the law of England and Wales and subject to the exclusive jurisdiction of the English courts.</p>

    <h2>Service Areas</h2>
    <p>St Albans, Harpenden, Wheathampstead, Hatfield, Radlett, London Colney, Redbourn and Hertfordshire.</p>
  </section>`;
}

function policyPages() {
  simplePage({
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "Privacy information for customers using the Alban Plumbing and Heating Ltd website.",
    body: `<section class="section prose"><h2>Privacy Policy</h2><p>This website collects information that you choose to submit through enquiry and booking forms, including contact details, address information, service requirements and uploaded photos. This information is used to respond to enquiries, arrange appointments and provide plumbing and heating services.</p><p>Analytics and marketing tracking can be connected when the business is ready to use Google Analytics or Search Console. Customers can request correction or deletion of personal information by emailing <a href="mailto:${business.email}">${business.email}</a>.</p></section>`,
  });
  simplePage({
    slug: "terms-and-conditions",
    title: "Terms and Conditions",
    description: "Full service terms and conditions for Alban Plumbing and Heating Ltd.",
    body: termsBody(),
  });
}

function miscPages() {
  aboutPage();
  galleryPage();
  reviewsPage();
  faqsPage();
  bookingPage();
  contactPage();
  areasIndex();
  blogIndex();
  policyPages();
}

function writeSitemap() {
  const urls = [
    "/",
    "/about-us/",
    "/areas-we-cover/",
    "/gallery/",
    "/reviews/",
    "/blog/",
    "/faqs/",
    "/book-online/",
    "/contact/",
    "/privacy-policy/",
    "/terms-and-conditions/",
    ...servicePages.map((service) => `/${service.slug}/`),
    ...areas.map((area) => `/areas-we-cover/${slugify(area)}/`),
    ...blogPosts.map((post) => `/blog/${post.slug}/`),
  ];
  writeFileSync(
    join(out, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((url) => `  <url><loc>${baseUrl}${url}</loc></url>`)
      .join("\n")}\n</urlset>\n`,
  );
  writeFileSync(
    join(out, "robots.txt"),
    `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`,
  );
}

homePage();
servicePages.forEach(servicePage);
miscPages();
areas.forEach(areaPage);
blogPosts.forEach(blogPage);
writeSitemap();

console.log(`Generated ${servicePages.length + areas.length + blogPosts.length + 11} pages for ${business.name}.`);
