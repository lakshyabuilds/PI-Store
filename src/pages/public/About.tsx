import React from "react";

export default function About() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
        <h1 className="text-4xl sm:text-5xl font-black text-text-main tracking-tight">
          About BioHere
        </h1>
        <p className="text-xl text-text-subtle">
          We believe creators should own their audience. Not algorithms.
        </p>
      </div>

      <div className="prose prose-lg border-l-4 border-primary pl-6 sm:pl-8 mx-auto text-text-main">
        <p>
          The creator economy is broken. You build an audience on a platform you
          don't own, you get a fraction of the ad revenue, and you're constantly
          fighting algorithm changes to stay relevant.
        </p>
        <p>
          We built <strong>BioHere</strong> because we wanted a simple, elegant
          way for creators to monetize directly. No middleman suppressing your
          reach. No complex store builder taking weeks to configure.
        </p>
        <h3 className="text-2xl font-bold mt-10 mb-4 text-text-main">
          Our Mission
        </h3>
        <p>
          Our mission is to arm independent creators with the tools they need to
          launch their own digital storefront in under 60 seconds. We combine
          the simplicity of a link-in-bio with the power of an e-commerce
          backend, allowing you to seamlessly sell your digital products,
          ebooks, templates, and courses directly to the fans who want them.
        </p>
        <h3 className="text-2xl font-bold mt-10 mb-4 text-text-main">
          Transparency First
        </h3>
        <p>
          Trust is the foundation of any business. We are completely transparent
          about our pricing and operations. Your digital products remain yours,
          your audience remains yours, and we secure all checkouts with tier-1
          payment providers. We succeed only when you succeed.
        </p>
      </div>
    </div>
  );
}
