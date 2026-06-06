import React from 'react';
import { Check, X } from 'lucide-react';
import { motion } from 'motion/react';

const JsonLd = ({ data }: { data: any }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export default function Comparisons() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Pi-Store vs Alternatives",
        "description": "Why Pi-Store is the ultimate unfair advantage compared to Shopify, Gumroad, or Stan Store."
      }} />
      
      <div className="text-center mb-20 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black text-text-main tracking-tight mb-6">
          The Unfair Advantage
        </h1>
        <p className="text-xl text-text-muted font-medium leading-relaxed">
          While other platforms give you an empty canvas and leave you to figure out the hard parts, we hand you a fully-stocked, optimized business on a silver platter.
        </p>
      </div>

      <div className="neo-card p-0 overflow-hidden mb-20 bg-bg-card border-border-subtle shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-border-subtle bg-bg-surface">
                <th className="p-4 sm:p-8 text-sm font-black uppercase tracking-widest text-text-muted w-1/4">The Truth</th>
                <th className="p-4 sm:p-8 text-base font-black uppercase tracking-widest text-primary w-1/4 border-l border-border-subtle bg-primary/5">Pi-Store</th>
                <th className="p-4 sm:p-8 text-sm font-black uppercase tracking-widest text-text-muted w-1/4 border-l border-border-subtle">Shopify</th>
                <th className="p-4 sm:p-8 text-sm font-black uppercase tracking-widest text-text-muted w-1/4 border-l border-border-subtle">Gumroad / Stan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              
              <tr className="hover:bg-bg-hover/50 transition-colors">
                <td className="p-4 sm:p-8 font-black text-text-main text-base sm:text-lg">Do they provide products to sell?</td>
                <td className="p-4 sm:p-8 border-l border-border-subtle font-black text-text-main text-base sm:text-lg bg-primary/5">
                   <div className="flex items-center gap-2 sm:gap-3">
                     <Check className="text-primary w-6 h-6 sm:w-8 sm:h-8 shrink-0"/> Yes (Market-Tested)
                   </div>
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle text-text-muted font-medium text-sm sm:text-base">
                   <div className="flex items-center gap-2">
                     <X className="text-error w-5 h-5 shrink-0"/> No, you are on your own
                   </div>
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle text-text-muted font-medium text-sm sm:text-base">
                   <div className="flex items-center gap-2">
                     <X className="text-error w-5 h-5 shrink-0"/> No, just an empty store
                   </div>
                </td>
              </tr>
              
              <tr className="hover:bg-bg-hover/50 transition-colors">
                <td className="p-4 sm:p-8 font-black text-text-main text-base sm:text-lg">Setup Time</td>
                <td className="p-4 sm:p-8 border-l border-border-subtle font-black text-text-main text-base sm:text-lg bg-primary/5">
                   60 Seconds (1-Click)
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle text-text-muted font-medium text-sm sm:text-base">
                   Weeks (Complex theme setup)
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle text-text-muted font-medium text-sm sm:text-base">
                   Hours (Manual uploads)
                </td>
              </tr>
              
              <tr className="hover:bg-bg-hover/50 transition-colors">
                <td className="p-4 sm:p-8 font-black text-text-main text-base sm:text-lg">Payment Complexity</td>
                <td className="p-4 sm:p-8 border-l border-border-subtle font-black text-text-main text-base sm:text-lg bg-primary/5">
                   Done-For-You
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle text-text-muted font-medium text-sm sm:text-base">
                   Requires external gateways
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle text-text-muted font-medium text-sm sm:text-base">
                   Done-For-You
                </td>
              </tr>
              
              <tr className="hover:bg-bg-hover/50 transition-colors">
                <td className="p-4 sm:p-8 font-black text-text-main text-base sm:text-lg">Mobile Checkout Conversion</td>
                <td className="p-4 sm:p-8 border-l border-border-subtle font-black text-text-main text-base sm:text-lg bg-primary/5">
                   Extremely High
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle text-text-muted font-medium text-sm sm:text-base">
                   Average
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle text-text-muted font-medium text-sm sm:text-base">
                   Average
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
