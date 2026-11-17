export interface NavLinkItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href?: string;
  items?: NavLinkItem[];
}

export const brand = {
  name: "Threadline",
  href: "/",
} as const;

export const primaryNav: NavGroup[] = [
  {
    label: "Product",
    items: [
      { label: "Listing Studio", href: "#listings", description: "Draft SEO-ready listings from a single photo." },
      { label: "Shop Optimizer", href: "#optimize", description: "Find what's holding your listings back." },
      { label: "Content Generator", href: "#create", description: "On-brand lifestyle shots and copy in seconds." },
      { label: "Pinterest Autopilot", href: "#market", description: "Schedule pins that drive real shop traffic." },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "New sellers", href: "#new-sellers", description: "Launch your first shop with confidence." },
      { label: "Growing shops", href: "#growing", description: "Scale catalog and marketing without burnout." },
      { label: "Studios & teams", href: "#teams", description: "Shared workflows for multi-maker brands." },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Seller guides", href: "#guides", description: "Playbooks from top-performing Etsy shops." },
      { label: "Blog", href: "#blog", description: "Trends, tactics and product updates." },
      { label: "Help center", href: "#help", description: "Answers, tutorials and support." },
    ],
  },
  { label: "Pricing", href: "#pricing" },
];

export const authLinks = {
  login: { label: "Log in", href: "#login" },
  signup: { label: "Start free", href: "#start" },
} as const;

export const heroContent = {
  eyebrow: "AI workspace for Etsy sellers",
  headline: [
    { text: "Make more." },
    { text: "Manage less.", underline: "less." },
  ],
  description:
    "Create listings, optimize performance, generate stunning content, market on Pinterest, and automate your entire Etsy business — with AI.",
  primaryCta: { label: "Start free", href: "#start" },
  secondaryCta: { label: "Watch the story", href: "#story" },
  badges: [
    { lines: ["Built for", "Etsy sellers"] },
    { lines: ["AI-powered", "workflows"] },
    { lines: ["From creation", "to growth"] },
  ],
  note: ["List.", "Optimize", "Create", "Market", "Automate"],
} as const;

export type HeroHeadlineLine = (typeof heroContent.headline)[number];

export const storylineContent = {
  eyebrow: "From",
  title: "One product",
  subtitle: "to a growing Etsy business.",
  steps: [
    { id: "product", caption: "Your product" },
    { id: "listing", caption: "Listing" },
    { id: "content", caption: "Content" },
    { id: "marketing", caption: "Marketing" },
    { id: "growth", caption: "Growth" },
  ],
} as const;

export const toolkitContent = {
  heading: "The Threadline toolkit",
  tools: [
    {
      id: "listings",
      index: "01",
      name: "OnClickLister",
      title: ["Turn ideas into", "Etsy listings", "in minutes."],
      description:
        "Generate complete, ready-to-publish listings with titles, tags, descriptions and attributes — in one click.",
      cta: { label: "Create a listing", href: "#start" },
    },
    {
      id: "optimize",
      index: "02",
      name: "Smart Optimizer",
      title: ["Find and fix", "what’s holding", "you back."],
      description:
        "Audit your listings, get clear recommendations and improve SEO, title and visibility instantly.",
      cta: { label: "Optimize my listings", href: "#start" },
    },
    {
      id: "create",
      index: "03",
      name: "AI Studio",
      title: ["Create stunning", "product content", "with AI."],
      description: "Generate product images, lifestyle mockups, and short videos — all tailored for Etsy.",
      cta: { label: "Explore AI Studio", href: "#start" },
    },
    {
      id: "market",
      index: "04",
      name: "OnePinsClick",
      title: ["Turn your Etsy", "products into", "Pinterest growth."],
      description:
        "Create beautiful pins, write engaging descriptions, schedule and publish — all from your Etsy products.",
      cta: { label: "Create Pinterest pins", href: "#start" },
    },
    {
      id: "automate",
      index: "05",
      name: "Automation Engine",
      title: ["Automate your", "repetitive work."],
      description:
        "Build powerful workflows with triggers, conditions and actions to save time and stay consistent.",
      cta: { label: "Build a workflow", href: "#start" },
    },
    {
      id: "autopilot",
      index: "06",
      name: "AI Autopilot",
      title: ["Your AI partner", "for shop growth."],
      description: "Give a simple goal and let AI plan, prioritize and execute tasks across all tools.",
      cta: { label: "Try Autopilot", href: "#start" },
    },
  ],
  listingPreview: {
    heading: "Create Listing",
    title: { label: "Title", value: "Handmade Ceramic Mug – 12oz" },
    tags: { label: "Tags", values: ["ceramic", "handmade", "gift"] },
    description: { label: "Description", value: "A minimalist ceramic mug..." },
    action: "Generate with AI",
  },
  optimizerPreview: { before: "Before", after: "After" },
  pinPreview: { title: ["Handmade", "Ceramic Mug"] },
  workflowPreview: {
    trigger: { label: "Trigger", detail: "New listing created" },
    actionsLabel: "Actions",
    actions: [
      { id: "optimize", label: "Optimize listing" },
      { id: "images", label: "Generate images" },
      { id: "pinterest", label: "Publish to Pinterest" },
    ],
    done: "Done",
  },
  autopilotPreview: {
    prompt: "Plan my shop growth for this week",
    heading: "Here’s your plan:",
    tasks: [
      { label: "Optimize 5 listings", done: true },
      { label: "Create 3 Pinterest pins", done: true },
      { label: "Add 2 new product listings", done: false },
      { label: "Schedule marketing posts", done: false },
    ],
  },
} as const;

export type ToolId = (typeof toolkitContent.tools)[number]["id"];

export const insightsContent = {
  id: "insights",
  index: "07",
  name: "Business Intelligence",
  title: ["Understand, decide", "and grow."],
  description:
    "Track sales, listings, traffic and profit in one place. Spot what’s working and find new opportunities.",
  cta: { label: "Explore insights", href: "#start" },
  stats: {
    revenue: { value: "$4,280", label: "Revenue this month", change: "↑ +32%" },
    orders: { value: "127", label: "Orders", change: "↑ +19%" },
    conversion: { value: "4.2%", label: "Conversion", change: "↑ +0.8pp" },
  },
} as const;

export const howItWorksContent = {
  id: "how-it-works",
  heading: "How it works",
  description: "Get started and see results in four simple steps.",
  steps: [
    {
      index: "1",
      title: "Connect",
      description: "Link your Etsy shop in seconds.",
      tone: "accent",
    },
    {
      index: "2",
      title: "Create",
      description: "Generate listings, images and content.",
      tone: "highlight",
    },
    {
      index: "3",
      title: "Automate",
      description: "Set up workflows and let AI handle the work.",
      tone: "glow",
    },
    {
      index: "4",
      title: "Grow",
      description: "Track performance and scale your shop.",
      tone: "primary",
    },
  ],
} as const;

export const pricingContent = {
  id: "pricing",
  badge: "Pricing",
  title: ["Choose a plan that", "fits your growth."],
  description: "Everything you need to create, optimize, market and automate your Etsy business.",
  billing: {
    monthly: "Monthly",
    annual: "Annual",
    save: "Save 20%",
  },
  plans: [
    {
      id: "free",
      name: "Free",
      blurb: "Get started and explore.",
      featured: false,
      price: { monthly: 0, annual: 0 },
      features: [
        "Up to 5 listings",
        "Basic optimization",
        "AI image generation (5)",
        "Etsy connection",
      ],
      cta: { label: "Get started", href: "#start", variant: "outline" },
    },
    {
      id: "growth",
      name: "Growth",
      blurb: "For growing shops.",
      featured: true,
      badge: "Most popular",
      price: { monthly: 39, annual: 31 },
      features: [
        "Up to 500 listings",
        "Full AI Studio (images, video)",
        "Automations & workflows",
        "Business insights & reports",
      ],
      cta: { label: "Start growth", href: "#start", variant: "brand" },
    },
  ],
  comparison: {
    heading: "Plan comparison",
    cta: { label: "View full comparison", href: "#pricing" },
    rows: [
      { label: "Etsy shop connection", free: true, growth: true },
      { label: "AI generations (images / video)", free: "5", growth: "500" },
      { label: "Automations & workflows", free: false, growth: true },
      { label: "Pinterest publishing", free: false, growth: true },
      { label: "Business insights & reports", free: "Basic", growth: "Advanced" },
    ],
  },
} as const;

export const faqContent = {
  id: "faq",
  heading: {
    line1: "Frequently",
    line2Before: "asked",
    line2After: " questions.",
    underline: "asked",
  },
  items: [
    {
      id: "etsy-shop",
      question: "Do I need an existing Etsy shop?",
      answer:
        "No — you can explore Threadline without a shop. When you’re ready, connect Etsy in a few clicks to sync listings and publish.",
    },
    {
      id: "free-plan",
      question: "What’s included in the free plan?",
      answer:
        "The free plan includes up to 5 listings, basic optimization, a small set of AI image generations, and Etsy connection so you can try the workflow end to end.",
    },
    {
      id: "ai-content",
      question: "How does AI content generation work?",
      answer:
        "Upload a product photo or describe what you sell. Threadline drafts titles, tags, descriptions, images, and pins tailored for Etsy — you review and publish.",
    },
    {
      id: "cancel",
      question: "Can I cancel or change my plan anytime?",
      answer:
        "Yes. Upgrade, downgrade, or cancel whenever you like. Changes apply on your next billing cycle, and you keep access through the period you’ve paid for.",
    },
    {
      id: "data-safe",
      question: "Is my Etsy shop data safe?",
      answer:
        "We only request the permissions needed to help you list and market. Shop data is encrypted in transit and at rest, and we never sell your information.",
    },
    {
      id: "refund",
      question: "Do you offer a refund?",
      answer:
        "If Growth isn’t a fit within the first 14 days, contact support for a full refund — no questions asked.",
    },
  ],
} as const;

export const footerContent = {
  tagline: "The AI workspace for Etsy sellers.",
  social: [
    { id: "x", label: "X", href: "#x" },
    { id: "instagram", label: "Instagram", href: "#instagram" },
    { id: "youtube", label: "YouTube", href: "#youtube" },
    { id: "linkedin", label: "LinkedIn", href: "#linkedin" },
  ],
  columns: [
    {
      title: "Product",
      links: [
        { label: "OnClickLister", href: "#listings" },
        { label: "Smart Optimizer", href: "#optimize" },
        { label: "AI Studio", href: "#create" },
        { label: "OnePinsClick", href: "#market" },
        { label: "Automation Engine", href: "#automate" },
        { label: "AI Autopilot", href: "#autopilot" },
        { label: "Business Intelligence", href: "#insights" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "New Etsy Sellers", href: "#new-sellers" },
        { label: "Growing Shops", href: "#growing" },
        { label: "Multi-Shop Operators", href: "#teams" },
        { label: "Handmade & Crafts", href: "#handmade" },
        { label: "Print-on-Demand", href: "#pod" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Guides", href: "#guides" },
        { label: "Etsy Seller Tips", href: "#tips" },
        { label: "Blog", href: "#blog" },
        { label: "Help Center", href: "#help" },
        { label: "API & Integrations", href: "#api" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
        { label: "Careers", href: "#careers" },
        { label: "Press", href: "#press" },
      ],
    },
  ],
} as const;
