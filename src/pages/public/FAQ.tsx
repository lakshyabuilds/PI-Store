import React from 'react';
import { HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

const JsonLd = ({ data }: { data: any }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);

export default function FAQ() {
  const faqs = [
    {
      q: "Where do these digital products come from?",
      a: "We provide a curated catalog of high-quality Private Label Rights (PLR) ebooks, templates, and courses. These are products we have already tested in the market to ensure they actually sell. Once you add them to your store, you can sell them as your own and keep 100% of the profits."
    },
    {
      q: "Do I need to know how to code or design?",
      a: "Absolutely not. Our 1-Click Launch system generates a mobile-optimized, high-converting storefront for you instantly. Just click a button, and your store is live."
    },
    {
      q: "How do I get paid?",
      a: "We collect the payments from your customers on your behalf to save you the headache of setting up complex merchant accounts. We then pay you out directly to your bank account or Stripe."
    },
    {
      q: "What is the catch with the ₹1 Trial?",
      a: "No catch. We want you to experience the dopamine hit of making your first sale without risking your own money upfront. It's ₹1 for 7 days, and then ₹99/month if you decide to keep your store. Cancel anytime."
    },
    {
      q: "Can I use Pi-Store if I already have my own products?",
      a: "Yes! While we provide a catalog of done-for-you products, you can easily upload and sell your own digital products, courses, or coaching calls alongside them."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      }} />
      
      <div className="text-center mb-20">
        <div className="w-20 h-20 bg-text-main rounded-2xl flex items-center justify-center mx-auto mb-8">
          <HelpCircle className="w-10 h-10 text-bg-base" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-text-main tracking-tight mb-6">Frequently <br/>Asked Questions</h1>
        <p className="text-xl text-text-muted font-medium">Everything you need to know before you start making money.</p>
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
             <p className="font-medium text-text-muted leading-relaxed text-lg">{faq.a}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
