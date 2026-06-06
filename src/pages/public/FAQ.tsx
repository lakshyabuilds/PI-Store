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
      q: "What types of products can I sell?",
      a: "You can sell any digital product that you own the rights to. This includes your custom Notion templates, ebooks, coaching guides, digital art, preset packs, and video courses.",
    },
    {
      q: "Do I need to know how to code or design?",
      a: "Absolutely not. BioHere is designed to be the simplest link-in-bio tool on the internet. You can personalize your colors, upload your own icon, and launch a stunning profile in under a minute without writing a single line of code.",
    },
    {
      q: "How do I get paid?",
      a: "We collect the payments from your customers on your behalf via trusted payment gateways like Stripe. Payouts are made directly to your bank account.",
    },
    {
      q: "What is the catch with the ₹1 Trial?",
      a: "No catch. We want you to experience how easy it is to set up your link-in-bio and make your first sale without risking your own money upfront. It's ₹1 for 7 days, and then ₹99/month. Cancel anytime.",
    },
    {
      q: "How is BioHere different from Linktree?",
      a: "Standard link-in-bios just redirect your followers elsewhere, often losing conversions in the process. BioHere has a full checkout system embedded inside your profile, allowing fans to buy your digital products directly on your link page securely.",
    },
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
