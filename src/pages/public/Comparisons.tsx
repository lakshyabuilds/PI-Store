import React from "react";
import { Check, X } from "lucide-react";
import { motion } from "motion/react";

const JsonLd = ({ data }: { data: any }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export default function Comparisons() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "BioHere vs Alternatives",
          description:
            "Why BioHere is the ultimate unfair advantage compared to Shopify, Linktree, or Gumroad.",
        }}
      />

      <div className="text-center mb-20 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black text-text-main tracking-tight mb-6">
          The Creator's Choice
        </h1>
        <p className="text-xl text-text-muted font-medium leading-relaxed">
          While other platforms give you a disjointed experience leaving fans
          confused, we give you a beautiful, unified digital ecosystem.
        </p>
      </div>

      <div className="neo-card p-0 overflow-hidden mb-20 bg-bg-card border-border-subtle shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-border-subtle bg-bg-surface">
                <th className="p-4 sm:p-8 text-sm font-black uppercase tracking-widest text-text-muted w-1/4">
                  The Truth
                </th>
                <th className="p-4 sm:p-8 text-base font-black uppercase tracking-widest text-primary w-1/4 border-l border-border-subtle bg-primary/5">
                  BioHere
                </th>
                <th className="p-4 sm:p-8 text-sm font-black uppercase tracking-widest text-text-muted w-1/4 border-l border-border-subtle">
                  Shopify
                </th>
                <th className="p-4 sm:p-8 text-sm font-black uppercase tracking-widest text-text-muted w-1/4 border-l border-border-subtle">
                  Linktree / Basic Links
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              <tr className="hover:bg-bg-hover/50 transition-colors">
                <td className="p-4 sm:p-8 font-black text-text-main text-base sm:text-lg">
                  Unified Profile & Store
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle font-black text-text-main text-base sm:text-lg bg-primary/5">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Check className="text-primary w-6 h-6 sm:w-8 sm:h-8 shrink-0" />{" "}
                    Yes (All-in-one)
                  </div>
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle text-text-muted font-medium text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <X className="text-error w-5 h-5 shrink-0" /> Just a store
                  </div>
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle text-text-muted font-medium text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <X className="text-error w-5 h-5 shrink-0" /> Just links, no
                    native store
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-bg-hover/50 transition-colors">
                <td className="p-4 sm:p-8 font-black text-text-main text-base sm:text-lg">
                  Setup Time
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle font-black text-text-main text-base sm:text-lg bg-primary/5">
                  1 Minute
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle text-text-muted font-medium text-sm sm:text-base">
                  Weeks (Complex theme setup)
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle text-text-muted font-medium text-sm sm:text-base">
                  Minutes
                </td>
              </tr>

              <tr className="hover:bg-bg-hover/50 transition-colors">
                <td className="p-4 sm:p-8 font-black text-text-main text-base sm:text-lg">
                  1-Tap Checkout
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle font-black text-text-main text-base sm:text-lg bg-primary/5">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Check className="text-primary w-6 h-6 sm:w-8 sm:h-8 shrink-0" />{" "}
                    Embedded checkout
                  </div>
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle text-text-muted font-medium text-sm sm:text-base">
                  Average
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle text-text-muted font-medium text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <X className="text-error w-5 h-5 shrink-0" /> Redirects
                    users away
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-bg-hover/50 transition-colors">
                <td className="p-4 sm:p-8 font-black text-text-main text-base sm:text-lg">
                  Digital Delivery
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle font-black text-text-main text-base sm:text-lg bg-primary/5">
                  Automated & Secure
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle text-text-muted font-medium text-sm sm:text-base">
                  Requires extra apps
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle text-text-muted font-medium text-sm sm:text-base">
                  None
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
