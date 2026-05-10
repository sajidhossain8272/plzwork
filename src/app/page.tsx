import Link from "next/link";
import {
  FaArrowRight,
} from "react-icons/fa";

import { ToolsExplorer } from "./components/ToolsExplorer";
import HeroBadge from "./components/HeroBadge";
import HeroTerminal from "./components/HeroTerminal";
import PricingSection from "./components/PricingSection";

export default function Home() {
  return (
    <div className="bg-[#f7f7f4] text-[#0f171d]">
      <section className="px-4 pb-12 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <HeroBadge />
            <h1 className="text-5xl font-semibold leading-tight tracking-normal text-[#0d161c] sm:text-6xl lg:text-7xl">
              Plzwork: Just a bunch of free tools.
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
          <div className="relative ml-auto w-full max-w-xl">
            <HeroTerminal />
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

          <div className="mt-8">
            <ToolsExplorer />
          </div>
        </div>
      </section>

      <PricingSection />
    </div>
  );
}
