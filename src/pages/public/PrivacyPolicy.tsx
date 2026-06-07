import React from "react";
import { FileText, Shield, Database, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-bg-base text-text-main p-6 md:p-12 lg:pb-32 font-sans selection:bg-accent/30">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-main transition-colors mb-12 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-5 mb-8">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-accent" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-text-main tracking-tight">
            Privacy Policy
          </h1>
        </div>

        <p className="text-text-muted font-medium text-lg mb-12 leading-relaxed">
          At BioHere, we believe in complete transparency. We process the minimal
          amount of data necessary to host your digital storefront, manage your
          product catalog, handle secure payments, and facilitate payouts.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
              <Database className="w-5 h-5 text-accent" />
              1. Information We Collect
            </h2>
            <div className="bg-bg-card border border-border-subtle p-6 md:p-8 rounded-2xl shadow-sm">
              <p className="text-text-main font-medium text-base mb-6">
                To provide you with a fully functional digital product business, we collect the following:
              </p>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></div>
                  <div>
                    <strong className="text-text-main text-lg font-bold block mb-1">
                      Account & Profile Data
                    </strong>
                    <span className="text-text-muted text-sm">
                      Your email address, basic profile details, and preferred store branding (logo, colors, storefront name) to personalize and host your public-facing creator store.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></div>
                  <div>
                    <strong className="text-text-main text-lg font-bold block mb-1">
                      Payout & Financial Information
                    </strong>
                    <span className="text-text-muted text-sm">
                      Your preferred payout methods (UPI, NEFT, RTGS, or Bank Transfer details) strictly used for processing your monthly 80% profit margin payouts.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></div>
                  <div>
                    <strong className="text-text-main text-lg font-bold block mb-1">
                      Customer & Transaction Data (CRM)
                    </strong>
                    <span className="text-text-muted text-sm">
                      Order history, buyer emails, and transaction timestamps generated when fans purchase from your store. We use this to enable your CRM dashboard and handle secure digital fulfillment to the buyer.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
              <Lock className="w-5 h-5 text-accent" />
              2. How We Use and Protect Data
            </h2>
            <p className="text-text-muted font-medium text-base mb-6">
              Your business data is stored securely in our cloud infrastructure (Firebase). Here is how we enforce security parameters across the platform:
            </p>
            <div className="grid gap-6">
              <div className="bg-bg-card border border-border-subtle p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-text-main mb-1 tracking-tight">
                  Secure Digital Delivery
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  We collect your buyers' emails solely to deliver access to the digital goods they purchased and to update your CRM. We do not market our own catalog to your buyers.
                </p>
              </div>

              <div className="bg-bg-card border border-border-subtle p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-text-main mb-1 tracking-tight">
                  Analytics & Tracking
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  We process aggregated storefront views and clicks to supply your creator dashboard with real-time analytics. This data is private to you and is not shared with third-party data brokers.
                </p>
              </div>

              <div className="bg-bg-card border border-border-subtle p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-text-main mb-1 tracking-tight">
                  No Raw File Access
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  The original digital products (ebooks, templates, PLR bundles) provided by BioHere are securely hosted. End buyers only receive encrypted or one-time delivery links, and raw assets remain protected on our servers to prevent unauthorized redistribution.
                </p>
              </div>
            </div>
          </section>

          <section className="p-6 md:p-8 bg-bg-surface rounded-2xl">
            <h2 className="text-xl font-bold text-text-main mb-4 tracking-tight">
              Data Retention & Account Deletion
            </h2>
            <p className="text-text-muted text-base leading-relaxed mb-6">
              You maintain ownership of your creator presence. If you cancel your ₹99/month subscription or your account becomes inactive, your payouts will be frozen. After 30 days of inactivity, your public storefront will be taken offline and any pending payouts will be forfeited. After 45 days, your store and associated CRM data will be permanently deleted. We only retain transaction records strictly required by financial compliance and tax reporting laws.
            </p>
            <div className="bg-bg-card border border-border-subtle p-4 rounded-xl text-text-main text-sm">
              If you have any questions about this policy or your data, please reach out via our contact page.
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
