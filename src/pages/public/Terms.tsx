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
          <h2 className="text-2xl font-bold mb-4">2. The BioHere Catalog and Storefronts</h2>
          <p>
            BioHere provides a white-label digital storefront creation service
            equipped with a pre-vetted curated catalog of Private Label Rights (PLR)
            products. You are granted a non-exclusive license to re-sell the digital
            products you import from our catalog. You may also upload your own digital
            products, provided you possess the legal right to sell them. Piracy,
            copyright infringement, or selling restricted materials will result
            in immediate account termination.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Fees, Pricing, and Payouts</h2>
          <p className="mb-4">
            We use dynamic payment routing. BioHere automatically processes transactions via Razorpay for domestic (Indian) buyers and Stripe for international buyers. You are required to maintain an active subscription (₹99/month, after the 7-day ₹1 trial) to access the platform. Each item in the catalog carries a Base Price (typically between ₹100-₹250). You must set your retail price at or above this Base Price.
          </p>
          <p>
            You retain 80% of the profit margin above this base price, and BioHere retains 20%. Payouts are made in the first week of each month to your designated payment method (UPI, NEFT, RTGS, Bank Transfer), provided you meet the minimum cumulative sales threshold (at least 3 lifetime sales).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Inactivity and Cancellation</h2>
          <p className="mb-4">
            If you cancel your subscription or your account enters an inactive/unpaid state, your store will temporarily remain live, however, all payouts will be immediately frozen.
          </p>
          <p>
            If your account remains inactive or cancelled for 30 days, your store will be taken offline, and any unclaimed revenue or pending payouts will be entirely forfeited and retained by the BioHere platform as administrative profit. After 45 days, your store and associated data will be permanently deleted.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Customer Support & Delivery Policies</h2>
          <p>
            BioHere automates digital fulfillment to the email address provided by the buyer at checkout. If a buyer inputs an incorrect email, they are provided a strict 60-Minute Correction Portal where they can amend their email address exactly one time. If the correction is not made within this window, neither BioHere nor the Creator holds any liability for the undelivered product.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. Acceptable Use Policy</h2>
          <p>You agree not to use the platform to:</p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Distribute malware or harmful code.</li>
            <li>Sell illegal, fraudulent, or counterfeit digital goods.</li>
            <li>Spam, harass, or mislead consumers.</li>
            <li>Impersonate other creators or brands.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">7. Account Termination</h2>
          <p>
            We reserve the right to suspend or terminate any accounts that
            violate our terms or receive significant verifiable complaints of
            fraudulent activity. Our priority is maintaining a safe, trusted
            ecosystem for buyers and genuine creators.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">
            8. Disclaimer of Warranties
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
