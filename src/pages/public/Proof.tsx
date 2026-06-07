import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, CheckCircle, Store } from "lucide-react";
import { motion } from "motion/react";

export default function Proof() {
  return (
    <div className="min-h-screen bg-bg-base text-text-main p-6 md:p-12 lg:pb-32 font-sans selection:bg-accent/30">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-bold tracking-widest uppercase mb-6">
            Track Record
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Proven Past Performance
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto font-medium leading-relaxed">
            I'm not promising you millions. I'm offering a realistic starting point. BioHere is built on ~₹20,000 of actual sales generated across WhatsApp, Google Pay, and free tools.
          </p>
        </div>

        <div className="grid gap-8">
          <div className="bg-bg-card border border-border-subtle rounded-3xl p-8 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-black flex items-center gap-2">
                  <TrendingUp className="text-primary w-6 h-6" /> Bootstrapped & Profitable
                </h3>
                <p className="text-text-muted leading-relaxed">
                  Before BioHere was a platform, its foundational catalog generated unstructured but very real profits (between ₹14k-₹20k). I handled payments through my mother's GPay account and delivered Google Drive links in WhatsApp chats. Many of my buyers used these assets to grow theme pages or resell them for their own profit.
                </p>
                <p className="text-text-muted leading-relaxed">
                  I built BioHere to structure the mess—giving you the same products that already sold, but through a legitimate, automated, and professional storefront.
                </p>
              </div>
              <div className="w-full md:w-1/2 h-64 bg-bg-surface rounded-2xl flex items-center justify-center border border-border-strong relative overflow-hidden">
                <div className="absolute inset-0 flex flex-col justify-center px-8 opacity-80 filter blur-[1px]">
                   <div className="w-full flex justify-between items-end border-b border-border-strong pb-2 mb-4">
                     <span className="text-text-muted font-mono text-sm">Historical Volume</span>
                     <span className="text-2xl font-black">₹18,450.00</span>
                   </div>
                   <div className="h-24 flex items-end gap-2 shrink-0">
                     <div className="w-1/6 h-[30%] bg-border-strong rounded-t"></div>
                     <div className="w-1/6 h-[50%] bg-border-strong rounded-t"></div>
                     <div className="w-1/6 h-[40%] bg-border-strong rounded-t"></div>
                     <div className="w-1/6 h-[70%] bg-border-strong rounded-t"></div>
                     <div className="w-1/6 h-[60%] bg-border-strong rounded-t"></div>
                     <div className="w-1/6 h-[100%] bg-primary rounded-t"></div>
                   </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-bg-base/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="font-bold border border-text-main px-4 py-2 rounded">GPay / WhatsApp Log Data</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-bg-card border border-border-subtle rounded-3xl p-8 space-y-4">
              <div className="w-12 h-12 bg-alert/10 text-alert rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black">Tested Product Ideas</h3>
              <p className="text-text-muted">
                I've already figured out which Reels bundles, Notion trackers, and prompt packs get attention. The Base Pricing on BioHere allows you to operate with low risk and keep the upside.
              </p>
            </div>
            
            <div className="bg-bg-card border border-border-subtle rounded-3xl p-8 space-y-4">
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black">Resell with Confidence</h3>
              <p className="text-text-muted">
                These digital products have worked for me. Pick one up, make organic videos, run cheap Meta Ads, and start your own side hustle. No inventory, no returned packages.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/founder"
            className="neo-button px-8 py-4 bg-bg-surface border border-border-strong text-text-main font-bold text-lg hover:bg-bg-hover transition-all rounded-xl"
          >
            Read the Origin Story
          </Link>
          <Link
            to="/catalog"
            className="neo-button px-8 py-4 bg-text-main text-bg-base font-black text-lg hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3 rounded-xl"
          >
            View The Products <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
