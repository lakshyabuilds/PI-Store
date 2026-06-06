import React from "react";
import { FileText, Shield, Database, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-bg-base text-text-main p-6 md:p-12 lg:pb-32 font-sans selection:bg-accent/30">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-main transition-colors mb-12 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </Link>

        <div className="flex items-center gap-5 mb-8">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-accent" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-text-main tracking-tight">
            Privacy Policy
          </h1>
        </div>

        <p className="text-text-muted font-medium text-lg mb-12 loading-relaxed">
          We believe in complete transparency. To provide our integrated CRM and
          workspace automation tools, we request specific permissions to access
          your Google account data.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
              <Database className="w-5 h-5 text-accent" />
              1. Base Authentication Data
            </h2>
            <div className="bg-bg-card border border-border-subtle p-6 md:p-8 rounded-2xl shadow-sm">
              <p className="text-text-main font-medium text-base mb-6">
                When you sign in with Google, we securely request the following
                core account details to create and maintain your profile:
              </p>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></div>
                  <div>
                    <strong className="text-text-main text-lg font-bold block mb-1">
                      Email Address
                    </strong>
                    <span className="text-text-muted text-sm">
                      Used as your primary identifier and for essential system
                      communications.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></div>
                  <div>
                    <strong className="text-text-main text-lg font-bold block mb-1">
                      Basic Profile Picture
                    </strong>
                    <span className="text-text-muted text-sm">
                      Includes your name and profile picture to personalize your
                      dashboard experience.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></div>
                  <div>
                    <strong className="text-text-main text-lg font-bold block mb-1">
                      OpenID
                    </strong>
                    <span className="text-text-muted text-sm">
                      Used for secure authentication processes via Firebase.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
              <Lock className="w-5 h-5 text-accent" />
              2. Workspace Integrations
            </h2>
            <p className="text-text-muted font-medium text-base mb-6">
              Our platform offers deep integration with your daily workflows. To
              automate CRM tracking, schedule management, and file handling, we
              request the following extended permissions:
            </p>
            <div className="grid gap-6">
              <div className="bg-bg-card border border-border-subtle p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-text-main mb-1 tracking-tight">
                  Google Drive Integration
                </h3>
                <div className="text-xs font-mono text-text-muted mb-4 bg-bg-surface px-2 py-1 rounded w-max">
                  https://www.googleapis.com/auth/drive
                </div>
                <p className="text-text-muted text-sm leading-relaxed">
                  <strong className="text-text-main">Why we need this: </strong>
                  To automatically backup customer lead records, synchronize
                  storefront digital assets natively to your Drive, and securely
                  manage your CRM document attachments directly from our
                  interface.
                </p>
              </div>

              <div className="bg-bg-card border border-border-subtle p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-text-main mb-1 tracking-tight">
                  Google Calendar Integration
                </h3>
                <div className="text-xs font-mono text-text-muted mb-4 bg-bg-surface px-2 py-1 rounded w-max">
                  https://www.googleapis.com/auth/calendar
                </div>
                <p className="text-text-muted text-sm leading-relaxed">
                  <strong className="text-text-main">Why we need this: </strong>
                  Allows the CRM module to automatically schedule meetings with
                  new leads, synchronize your availability for customer
                  bookings, and sync important sales milestones to your primary
                  calendar.
                </p>
              </div>

              <div className="bg-bg-card border border-border-subtle p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-text-main mb-1 tracking-tight">
                  Gmail Read-Only Access
                </h3>
                <div className="text-xs font-mono text-text-muted mb-4 bg-bg-surface px-2 py-1 rounded w-max">
                  https://www.googleapis.com/auth/gmail.readonly
                </div>
                <p className="text-text-muted text-sm leading-relaxed">
                  <strong className="text-text-main">Why we need this: </strong>
                  Provides read-only access to automatically associate incoming
                  emails from recognized customer email addresses directly to
                  their CRM profile inside BioHere.
                </p>
              </div>
            </div>
          </section>

          <section className="p-6 md:p-8 bg-bg-surface rounded-2xl">
            <h2 className="text-xl font-bold text-text-main mb-4 tracking-tight">
              Data Protection Addendum
            </h2>
            <p className="text-text-muted text-base leading-relaxed mb-6">
              We process your data strictly in accordance with modern security
              standards. Your OAuth access tokens are securely managed and are
              never shared with third parties. Sensitive workspace access is
              used strictly for programmatic automation entirely within your
              logged-in session context.
            </p>
            <div className="bg-bg-card border border-border-subtle p-4 rounded-xl text-text-main text-sm">
              If at any time you wish to revoke our access, you can do so
              natively via your Google Account Settings under "Third-party apps
              with account access".
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
