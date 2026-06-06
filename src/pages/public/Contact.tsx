import React from "react";
import { Mail, MessageSquare, Briefcase } from "lucide-react";

export default function Contact() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
        <h1 className="text-4xl sm:text-5xl font-black text-text-main tracking-tight">
          Contact Us
        </h1>
        <p className="text-xl text-text-subtle">
          Real humans, ready to help you grow your creator business.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-bg-subtle p-8 border-2 border-border-subtle hover:border-primary/50 transition-colors text-center shadow-sharp">
          <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-text-main mb-2">Support</h3>
          <p className="text-text-subtle mb-4">
            Questions about your storefront or payouts? We're here.
          </p>
          <a
            href="mailto:support@biohere.vercel.app"
            className="font-bold text-primary hover:underline"
          >
            support@biohere.vercel.app
          </a>
        </div>

        <div className="bg-bg-subtle p-8 border-2 border-border-subtle hover:border-primary/50 transition-colors text-center shadow-sharp">
          <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-text-main mb-2">Business</h3>
          <p className="text-text-subtle mb-4">
            Want to partner or utilize BioHere for your agency?
          </p>
          <a
            href="mailto:partners@biohere.vercel.app"
            className="font-bold text-primary hover:underline"
          >
            partners@biohere.vercel.app
          </a>
        </div>

        <div className="bg-bg-subtle p-8 border-2 border-border-subtle hover:border-primary/50 transition-colors text-center shadow-sharp">
          <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-text-main mb-2">Socials</h3>
          <p className="text-text-subtle mb-4">
            Follow us for updates, features, and creator tips.
          </p>
          <p className="font-bold text-text-main">@bioherehq</p>
        </div>
      </div>
    </div>
  );
}
