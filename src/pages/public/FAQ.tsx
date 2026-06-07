import React from "react";
import { HelpCircle } from "lucide-react";
import { motion } from "motion/react";

const JsonLd = ({ data }: { data: any }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export default function FAQ() {
  const faqs = [
    {
      q: "Where do these digital products come from?",
      a: "Every product inside BioHere originates from the founder's own portfolio of digital products, templates, creator resources, and operating systems that have been sold independently over the last 4 years. We offer them to you internally for resale to your audience."
    },
    {
      q: "How do I make my first sale if I have no audience?",
      a: "We don't just give you the products—we give you the exact marketing materials (swipe files, ad creatives, and content templates) to spoon-feed your growth. Many of our creators secure their first sale within 48 hours using organic content or Meta Ads."
    },
    {
      q: "How does the pricing work?",
      a: "Every product in our catalog has a low Base Price (typically between ₹100-₹250). We provide a Suggested Retail Price, but you have the freedom to price it however high you want. You keep 80% of the profit margin above the base price."
    },
    {
      q: "Do I need to know how to code or design?",
      a: "Absolutely not. Our 1-Click Launch system generates a mobile-optimized, high-converting storefront for you instantly. Just click a button, and your store is live."
    },
    {
      q: "How do I get paid?",
      a: "We collect the payments securely via Razorpay (for Indian buyers) and Stripe (for international buyers). The correct payment gateway is auto-selected based on the buyer's IP, but they can manually switch countries via a dropdown at checkout. We manage the fulfillment and pay you out directly to your bank account via UPI, NEFT, RTGS, or Bank Transfer."
    },
    {
      q: "What is the catch with the ₹1 Trial?",
      a: "The ₹1 charge is used to verify payment methods and prevent spam accounts, bot signups, and fake store creation. The platform costs ₹99/month after the 7-day trial period. Billing terms are transparently shown before payment."
    },
    {
      q: "Can I customize the products?",
      a: "You have complete freedom to rebrand the public-facing presentation—you can change your store's logo, banners, and descriptions to match your brand. However, the core digital asset files are securely managed and fulfilled by us, so the files themselves cannot be altered."
    },
    {
      q: "Can I use BioHere if I already have my own products?",
      a: "Yes! While we provide the curated catalog, you can just as easily upload and sell your own digital products safely alongside them."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.a,
            },
          })),
        }}
      />

      <div className="text-center mb-20">
        <div className="w-20 h-20 bg-text-main rounded-2xl flex items-center justify-center mx-auto mb-8">
          <HelpCircle className="w-10 h-10 text-bg-base" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-text-main tracking-tight mb-6">
          Frequently <br />
          Asked Questions
        </h1>
        <p className="text-xl text-text-muted font-medium">
          Everything you need to know before you start making money.
        </p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            key={i}
            className="neo-card bg-bg-card p-8 md:p-10 border-border-subtle"
          >
            <h3 className="text-2xl font-black text-text-main mb-4">{faq.q}</h3>
            <p className="font-medium text-text-muted leading-relaxed text-lg">
              {faq.a}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
