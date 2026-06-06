import React from "react";
import { Check, ArrowRight, Gift, PackageOpen, Zap, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const JsonLd = ({ data }: { data: any }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export default function Pricing() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Pricing - BioHere",
          description: "Start your digital product empire for just ₹99/month.",
        }}
      />

      <div className="text-center mb-16 px-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-text-main tracking-tight mb-6">
          Simple Pricing.
          <br /> Unlimited Potential.
        </h1>
        <p className="text-xl text-text-muted max-w-2xl mx-auto font-medium leading-relaxed">
          Forget complex tiers and hidden fees. One plan gives you the ultimate
          link-in-bio and digital storefront.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
        {/* Value Stack */}
        <div className="space-y-8 order-2 lg:order-1">
          <h3 className="text-3xl font-black text-text-main">
            What You Get Today:
          </h3>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-text-main flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
                  <span>Pro Link-in-Bio Profile</span>
                </h4>
                <p className="text-text-muted font-medium mt-1">
                  A beautifully designed hub for all your content, social media
                  links, and latest drops.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <PackageOpen className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-text-main flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
                  <span>Seamless Digital Storefront</span>
                </h4>
                <p className="text-text-muted font-medium mt-1">
                  Easily upload and sell your ebooks, Notion templates, and
                  premium courses directly to your fans.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-bg-surface flex items-center justify-center border border-border-strong shrink-0">
                <Lock className="w-6 h-6 text-text-main" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-text-main flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
                  <span>Secure Instant Delivery</span>
                </h4>
                <p className="text-text-muted font-medium mt-1">
                  We handle the digital product hosting and automated secure
                  delivery upon purchase.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="neo-card p-6 sm:p-10 bg-bg-card border-2 border-primary text-center relative flex flex-col order-1 lg:order-2 shadow-[0_0_50px_rgba(57,255,20,0.1)]">
          <div className="absolute -top-4 w-max max-w-[90%] left-1/2 -translate-x-1/2 bg-primary text-black px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-black tracking-widest uppercase shadow-lg">
            Creator Access
          </div>

          <h3 className="text-3xl font-black text-text-main mt-6 mb-2">
            BioHere Pro
          </h3>
          <p className="text-text-muted font-medium mb-8">
            Everything you need to monetize your audience.
          </p>

          <div className="flex justify-center items-end gap-1 mb-8">
            <div className="text-7xl font-black text-text-main leading-none">
              ₹99
            </div>
            <div className="text-xl text-text-muted font-bold mb-2">/month</div>
          </div>

          <div className="bg-alert/10 border border-alert/20 rounded-xl p-4 mb-8 text-center">
            <div className="flex items-center justify-center gap-2 text-alert font-black mb-1">
              <Gift className="w-5 h-5" /> Special Offer
            </div>
            <p className="text-text-main font-semibold">
              Test drive everything for{" "}
              <span className="font-black text-alert">7 Days for just ₹1</span>.
            </p>
          </div>

          <Link
            to="/register"
            className="neo-button w-full py-4 sm:py-5 text-lg sm:text-xl font-black bg-primary text-bg-base shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all flex items-center justify-center gap-2 rounded-2xl"
          >
            Start Your ₹1 Trial Now <ArrowRight className="w-6 h-6" />
          </Link>

          <p className="text-sm text-text-muted font-bold mt-6 opacity-70">
            Cancel anytime. No lock-in contracts.
          </p>
        </div>
      </div>
    </div>
  );
}
