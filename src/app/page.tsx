import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaBolt,
  FaCode,
  FaFileImage,
  FaLayerGroup,
  FaMagic,
  FaPaintBrush,
} from "react-icons/fa";

const categories = [
  {
    title: "Design Tools",
    description: "Lightweight helpers for polishing visuals and preparing assets.",
    icon: FaPaintBrush,
    tools: [
      {
        name: "Quick Convert",
        href: "/quick-convert",
        description: "Convert and optimize images in your browser.",
        status: "Live",
      },
      {
        name: "Palette Cleaner",
        href: "#",
        description: "Coming soon for brand-safe color cleanup.",
        status: "Soon",
      },
    ],
  },
  {
    title: "Dev Tools",
    description: "Utilities for teams shipping product pages, docs, and apps.",
    icon: FaCode,
    tools: [
      {
        name: "Alt-Text Generator",
        href: "/ai-alt-tag-generator",
        description: "Generate descriptive image alt text for accessible releases.",
        status: "Live",
      },
      {
        name: "Meta Tag Preview",
        href: "#",
        description: "Coming soon for cleaner share cards and SEO checks.",
        status: "Soon",
      },
    ],
  },
  {
    title: "AI Tools",
    description: "Focused AI helpers that remove repetitive content work.",
    icon: FaMagic,
    tools: [
      {
        name: "Alt-Text Generator",
        href: "/ai-alt-tag-generator",
        description: "Turn product images into concise, useful descriptions.",
        status: "Live",
      },
      {
        name: "Launch Copy Assistant",
        href: "#",
        description: "Coming soon for sharper product blurbs.",
        status: "Soon",
      },
    ],
  },
  {
    title: "File Conversion",
    description: "Private, browser-first conversion for everyday files.",
    icon: FaFileImage,
    tools: [
      {
        name: "Quick Convert",
        href: "/quick-convert",
        description: "Bulk convert WebP, JPEG, PNG, HEIC, and HEIF files.",
        status: "Live",
      },
      {
        name: "Document Shrinker",
        href: "#",
        description: "Coming soon for lighter handoffs.",
        status: "Soon",
      },
    ],
  },
  {
    title: "Boost Productivity",
    description: "Small workflow upgrades for teams that want less busywork.",
    icon: FaBolt,
    tools: [
      {
        name: "Batch Image Prep",
        href: "/quick-convert",
        description: "Resize and reformat asset batches before upload.",
        status: "Live",
      },
      {
        name: "Checklist Builder",
        href: "#",
        description: "Coming soon for repeatable launch routines.",
        status: "Soon",
      },
    ],
  },
  {
    title: "All Tools",
    description: "Everything Plzwork is building in one practical shelf.",
    icon: FaLayerGroup,
    tools: [
      {
        name: "Quick Convert",
        href: "/quick-convert",
        description: "A Plzwork product for fast private image conversion.",
        status: "Live",
      },
      {
        name: "Alt-Text Generator",
        href: "/ai-alt-tag-generator",
        description: "AI image captions for accessibility and SEO.",
        status: "Live",
      },
    ],
  },
];

export default function Home() {
  return (
    <div className="bg-[#f7f7f4] text-[#0f171d]">
      <section className="px-4 pb-12 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#d9ded8] bg-white px-4 py-2 text-sm font-semibold text-[#26323a]">
              <span className="h-2 w-2 rounded-full bg-[#52c41a]" />
              Tools that actually work
            </div>
            <h1 className="text-5xl font-semibold leading-tight tracking-normal text-[#0d161c] sm:text-6xl lg:text-7xl">
              Plzwork builds useful products for everyday creative work.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#51606a]">
              Quick Convert is now a product of Plzwork, alongside focused tools
              for design, development, AI workflows, file conversion, and
              productivity.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quick-convert"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0e171d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d2a32]"
              >
                Open Quick Convert
                <FaArrowRight aria-hidden="true" />
              </Link>
              <Link
                href="#tools"
                className="inline-flex items-center justify-center rounded-lg border border-[#cfd7cf] bg-white px-5 py-3 text-sm font-semibold text-[#142027] transition hover:border-[#9fb89d]"
              >
                Browse all tools
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <Image
              src="/plzwork-logo.png"
              alt="Plzwork logo"
              width={1200}
              height={1200}
              priority
              className="h-auto w-full rounded-[28px] border border-[#e1e5df] bg-white shadow-sm"
            />
          </div>
        </div>
      </section>

      <section id="tools" className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4da72a]">
                Products
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[#0d161c] sm:text-4xl">
                Useful tools, grouped by the job.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[#5a6872]">
              Start with the live tools today, and keep the coming-soon shelves
              as a map of where Plzwork is going next.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <section
                  key={category.title}
                  className="rounded-lg border border-[#dfe5dc] bg-white p-5 shadow-sm"
                >
                  <div className="mb-5 flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf7e5] text-[#3faf18]">
                      <Icon aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#0d161c]">
                        {category.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-[#63707a]">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {category.tools.map((tool) => {
                      const isLive = tool.status === "Live";
                      const content = (
                        <div className="group rounded-lg border border-[#edf0eb] p-4 transition hover:border-[#b9d9b0] hover:bg-[#fbfdf9]">
                          <div className="flex items-center justify-between gap-3">
                            <h4 className="font-semibold text-[#17232a]">
                              {tool.name}
                            </h4>
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                isLive
                                  ? "bg-[#e7f8df] text-[#2f8f14]"
                                  : "bg-[#f2f3f1] text-[#69747c]"
                              }`}
                            >
                              {tool.status}
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-[#63707a]">
                            {tool.description}
                          </p>
                        </div>
                      );

                      return isLive ? (
                        <Link key={`${category.title}-${tool.name}`} href={tool.href}>
                          {content}
                        </Link>
                      ) : (
                        <div key={`${category.title}-${tool.name}`}>{content}</div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
