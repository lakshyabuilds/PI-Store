import React from "react";
import { Check, X, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

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
            "Why BioHere is the ultimate unfair advantage compared to Shopify, Gumroad, or Stan Store.",
        }}
      />

      <div className="text-center mb-20 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black text-text-main tracking-tight mb-6">
          The Unfair Advantage
        </h1>
        <p className="text-xl text-text-muted font-medium leading-relaxed">
          I'm not here to tell you other platforms are bad. They are amazing. But if you lack the budget, clarity, or an existing product, they leave you staring at an empty dashboard.
        </p>
      </div>

      <div className="mb-24 space-y-12">
         <div className="bg-bg-card border border-border-subtle p-8 md:p-12 rounded-3xl shadow-xl">
           <h2 className="text-3xl font-black mb-4">The Enemy: Expensive Illusions</h2>
           <p className="text-lg text-text-muted mb-4 leading-relaxed">
             My biggest frustration in the creator space is influencers pushing expensive tools (like GoHighLevel at $97/mo) with big promises but zero roadmap for a beginner, just to clear their own affiliate commissions. 
           </p>
           <p className="text-lg text-text-muted leading-relaxed">
             If you just want a funnel, use Systeme.io (it's free!). If you want a platform like Gumroad or Stan Store, use them! But understand this: those platforms expect you to bring your own profitable product. BioHere solves exactly one core problem: <strong className="text-text-main">It gives you the profitable product to sell from Day 1.</strong>
           </p>
         </div>

         <div className="bg-bg-card border border-border-subtle p-8 md:p-12 rounded-3xl shadow-xl">
           <h2 className="text-3xl font-black mb-4">Dropshipping vs. Digital Flipping</h2>
           <p className="text-lg text-text-muted mb-6 leading-relaxed">
             You might naturally compare this to dropshipping. Yes, dropshipping was a great business... in the past. Now? You need to build a Shopify store, do endless market research to find a product, negotiate with spotty suppliers, risk capital on Meta Ads, wait weeks for physical delivery, and pay out of pocket for any returns.
           </p>
           
           <div className="grid md:grid-cols-2 gap-8">
             <div className="bg-error/5 border border-error/20 p-6 rounded-2xl">
               <h3 className="font-bold text-error mb-2 text-xl">The Dropshipping Reality</h3>
               <ul className="space-y-2 text-text-muted font-medium">
                 <li>• Endless supplier negotiations</li>
                 <li>• Weeks of shipping delays</li>
                 <li>• Paying out of pocket for refunds/returns</li>
                 <li>• Constant inventory stress</li>
               </ul>
             </div>
             <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl">
               <h3 className="font-bold text-primary mb-2 text-xl">The Digital Flipping Reality</h3>
               <ul className="space-y-2 text-text-muted font-medium">
                 <li>• Pick a tested digital asset</li>
                 <li>• Market it via TikTok/Reels/Meta Ads</li>
                 <li>• Instant automated delivery</li>
                 <li>• Zero inventory, zero physical returns</li>
               </ul>
             </div>
           </div>
         </div>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl font-black mb-4">Feature Comparison</h2>
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
                  Shopify (Dropshipping)
                </th>
                <th className="p-4 sm:p-8 text-sm font-black uppercase tracking-widest text-text-muted w-1/4 border-l border-border-subtle">
                  Gumroad / Stan Store
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              <tr className="hover:bg-bg-hover/50 transition-colors">
                <td className="p-4 sm:p-8 font-black text-text-main text-base sm:text-lg">
                  Do they provide products to sell?
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle font-black text-text-main text-base sm:text-lg bg-primary/5">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Check className="text-primary w-6 h-6 sm:w-8 sm:h-8 shrink-0" />{" "}
                    Yes (Pre-loaded Catalog)
                  </div>
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle text-text-muted font-medium text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <X className="text-error w-5 h-5 shrink-0" /> Find your own suppliers
                  </div>
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle text-text-muted font-medium text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <X className="text-error w-5 h-5 shrink-0" /> Create your own products
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-bg-hover/50 transition-colors">
                <td className="p-4 sm:p-8 font-black text-text-main text-base sm:text-lg">
                  Setup Time vs Selling
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle font-black text-text-main text-base sm:text-lg bg-primary/5">
                  Selling in 60 Seconds
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle text-text-muted font-medium text-sm sm:text-base">
                  Weeks (Store design, sourcing)
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle text-text-muted font-medium text-sm sm:text-base">
                  Selling if you have the asset ready
                </td>
              </tr>

              <tr className="hover:bg-bg-hover/50 transition-colors">
                <td className="p-4 sm:p-8 font-black text-text-main text-base sm:text-lg">
                  Returns & Fulfillment
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle font-black text-text-main text-base sm:text-lg bg-primary/5">
                  Instant Access, Zero Returns
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle text-text-muted font-medium text-sm sm:text-base">
                  High return rates, slow shipping
                </td>
                <td className="p-4 sm:p-8 border-l border-border-subtle text-text-muted font-medium text-sm sm:text-base">
                  Instant Access
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
      
      <div className="text-center pt-12">
          <Link
            to="/register"
            className="neo-button px-8 py-4 bg-text-main text-bg-base font-black text-lg hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3 rounded-xl"
          >
            Start Digital Flipping <ArrowRight className="w-5 h-5" />
          </Link>
      </div>

    </div>
  );
}
