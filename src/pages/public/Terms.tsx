import React from "react";

export default function Terms() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
        <h1 className="text-4xl sm:text-5xl font-black text-text-main tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xl text-text-subtle">
          Clear, straightforward rules for using BioHere.
        </p>
      </div>

      <div className="prose prose-lg mx-auto text-text-main space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using BioHere ("Platform", "we", "us", "our"), you
            agree to be bound by these Terms of Service. If you do not agree to
            these terms, please do not use our service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Creator Storefronts</h2>
          <p>
            BioHere provides a link-in-bio and digital storefront creation
            service. You retain full ownership of the digital products you
            upload and sell through our platform. We expect all creators to
            possess the legal right to sell the content they upload. Piracy,
            copyright infringement, or selling restricted materials will result
            in immediate account termination.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Fees and Payouts</h2>
          <p>
            Our pricing is transparent and outlined on our Pricing page. We
            process payments securely through third-party gateways (such as
            Stripe). Payouts are subjected to the processing times of these
            respective gateways. We ensure that you keep your agreed-upon margin
            for all sales.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Acceptable Use Policy</h2>
          <p>You agree not to use the platform to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Distribute malware or harmful code.</li>
            <li>Sell illegal, fraudulent, or counterfeit digital goods.</li>
            <li>Spam, harass, or mislead consumers.</li>
            <li>Impersonate other creators or brands.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Account Termination</h2>
          <p>
            We reserve the right to suspend or terminate any accounts that
            violate our terms or receive significant verifiable complaints of
            fraudulent activity. Our priority is maintaining a safe, trusted
            ecosystem for buyers and genuine creators.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            6. Disclaimer of Warranties
          </h2>
          <p>
            BioHere is provided "as is". We make no distinct warranties
            regarding the uninterruptibility or error-free nature of the
            service. We are not liable for lost profits resulting from platform
            downtime or third-party payment gateway issues.
          </p>
        </section>

        <div className="mt-12 p-6 bg-bg-subtle border-2 border-border-subtle">
          <p className="text-sm text-text-subtle">
            Last updated: June 2026. For questions regarding these terms, please
            contact support@biohere.vercel.app.
          </p>
        </div>
      </div>
    </div>
  );
}
