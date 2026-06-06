import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Zap,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  BarChart3,
  Package,
  Globe,
  Clock,
  Gift,
  Link2,
} from "lucide-react";
import { motion } from "motion/react";

const JsonLd = ({ data }: { data: any }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export default function PublicLanding() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "BioHere",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description:
            "Your unified link-in-bio and digital storefront. Simple, fast, and creator-first.",
        }}
      />

      {/* Hero Section */}
      <section className="pt-24 md:pt-40 pb-20 px-6 bg-transparent relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black tracking-widest uppercase"
          >
            <span className="flex w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Own Your Audience
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="heading-display text-5xl md:text-7xl lg:text-8xl text-text-main tracking-tight leading-[1.05]"
          >
            One link for <span className="text-primary italic">everything</span>{" "}
            you create.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed font-medium"
          >
            BioHere is the most elegant way to share your links and sell digital
            products directly to your audience. Set up your creator profile in
            60 seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            <Link
              to="/register"
              className="neo-button px-6 sm:px-10 py-4 sm:py-5 bg-primary text-bg-base font-black text-lg sm:text-xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto shadow-[0_0_30px_rgba(57,255,20,0.4)] flex items-center justify-center gap-3"
            >
              Claim Your Link Now <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Logical Argument / Overcoming Objections */}
      <section className="py-24 px-6 bg-bg-surface/30 backdrop-blur-sm border-b border-border-subtle border-t">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="heading-display text-4xl md:text-5xl text-text-main mb-6">
              Built for independent creators
            </h2>
            <p className="text-text-muted text-xl max-w-2xl mx-auto font-medium">
              You don't need a massive website or disjointed tools. You need a
              beautiful link.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="neo-card p-8 flex flex-col gap-4 border-border-subtle bg-bg-card opacity-80">
              <div className="text-text-main font-black text-xl mb-2 flex items-center gap-2">
                1. The Standard Link
              </div>
              <p className="text-text-muted font-medium">
                Traditional link-in-bios are boring buttons. They don't let you
                sell products without routing users to a confusing third-party
                checkout.
              </p>
            </div>
            <div className="neo-card p-8 flex flex-col gap-4 border-border-subtle bg-bg-card opacity-80">
              <div className="text-text-main font-black text-xl mb-2 flex items-center gap-2">
                2. The Heavy Store
              </div>
              <p className="text-text-muted font-medium">
                Full e-commerce platforms like Shopify take weeks to build and
                are overkill for creators selling one ebook or course.
              </p>
            </div>
            <div className="neo-card p-8 flex flex-col gap-4 border-primary shadow-[0_0_20px_rgba(57,255,20,0.1)] bg-bg-card relative transform md:-translate-y-4">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-bg-base px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                BioHere
              </div>
              <div className="text-text-main font-black text-xl mb-2 flex items-center gap-2 mt-4">
                3. The Creator Hub
              </div>
              <p className="text-text-muted font-medium">
                Your links and your products side-by-side. A beautiful
                storefront embedded directly in your bio link with 1-tap
                checkout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature / Value Stack */}
      <section className="py-24 px-6 border-b border-border-subtle relative">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="heading-display text-4xl md:text-5xl text-text-main mb-4">
              Your digital ecosystem
            </h2>
            <p className="text-text-muted text-xl max-w-2xl mx-auto">
              Everything you need to guide your fans and sell your work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="order-2 md:order-1 space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-2">
                <Link2 className="w-8 h-8" />
              </div>
              <h3 className="heading-display text-4xl text-text-main">
                Customized Profile
              </h3>
              <p className="text-xl text-text-muted leading-relaxed font-medium">
                Create a stunning profile that matches your aesthetic. Add links
                to your socials, latest videos, or newsletters effortlessly.
              </p>
              <ul className="space-y-3 pt-4">
                {[
                  "Intuitive drag-and-drop link manager.",
                  "Customized colors, fonts, and brand assets.",
                  "Beautiful button gradients and hover states.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-text-main font-bold"
                  >
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />{" "}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-2 h-[400px] neo-card bg-bg-surface flex items-center justify-center p-8">
              {/* Mockup Placeholder */}
              <div className="w-full h-full border-2 border-border-strong rounded-2xl bg-bg-card shadow-2xl relative overflow-hidden flex flex-col pt-4">
                <div className="h-6 w-1/3 bg-border-subtle rounded-full mx-4 mb-4"></div>
                <div className="flex-1 overflow-hidden flex flex-col gap-4 p-4">
                  <div className="bg-bg-surface rounded-full h-12 w-full border border-border-subtle flex items-center px-4">
                    <div className="h-3 w-1/2 bg-border-strong rounded"></div>
                  </div>
                  <div className="bg-bg-surface rounded-full h-12 w-full border border-border-subtle flex items-center px-4">
                    <div className="h-3 w-1/3 bg-border-strong rounded"></div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent"></div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="h-[400px] neo-card bg-bg-surface flex items-center justify-center p-8 relative overflow-hidden">
              {/* Mockup Placeholder */}
              <div className="relative z-10 text-center">
                <Package className="w-16 h-16 text-text-main mx-auto mb-4" />
                <div className="text-primary font-bold tracking-widest uppercase text-sm">
                  Instant Delivery
                </div>
              </div>
              <div className="absolute inset-0 opacity-10 flex flex-col justify-between">
                <div className="w-full h-px bg-text-main"></div>
                <div className="w-full h-px bg-text-main"></div>
                <div className="w-full h-px bg-text-main"></div>
                <div className="w-full h-px bg-text-main"></div>
                <div className="w-full h-px bg-text-main"></div>
                <div className="w-full h-px bg-text-main"></div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-2">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="heading-display text-4xl text-text-main">
                Sell your work
              </h3>
              <p className="text-xl text-text-muted leading-relaxed font-medium">
                Upload an ebook, sell a course, or offer a template. We handle
                secure payments and instant file delivery to your buyers.
              </p>
              <ul className="space-y-3 pt-4">
                {[
                  "Zero coding or technical setup required.",
                  "Mobile-first, hyper-fast checkout process.",
                  "Secure digital download delivery.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-text-main font-bold"
                  >
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />{" "}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center bg-bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          <h2 className="heading-display text-5xl md:text-6xl tracking-tight mb-6 text-text-main">
            Your audience is waiting.
          </h2>
          <p className="text-xl text-text-muted mb-10 leading-relaxed max-w-2xl font-medium">
            Join the creators using BioHere to simplify their bio and monetize
            their passion. Get started entirely free.
          </p>
          <div className="flex flex-col items-center w-full">
            <Link
              to="/register"
              className="neo-button w-full sm:w-auto px-6 sm:px-12 py-4 sm:py-6 border-b-4 border-b-[#2e8b15] bg-[#39ff14] text-black hover:bg-[#32e612] hover:translate-y-1 hover:border-b-0 text-xl sm:text-2xl font-black transition-all shadow-xl rounded-2xl flex items-center justify-center gap-3"
            >
              Create Your BioHere Profile
            </Link>
            <p className="mt-4 text-text-muted font-bold flex items-center gap-2">
              <Clock className="w-4 h-4" /> Takes 60 seconds to setup.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
