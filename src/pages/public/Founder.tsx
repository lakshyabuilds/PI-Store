import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Star, TrendingUp, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export default function Founder() {
  return (
    <div className="min-h-screen bg-bg-base text-text-main p-6 md:p-12 lg:pb-32 font-sans selection:bg-primary/30">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase mb-6">
            The BioHere Origin
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Who builds a platform at 18?
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto font-medium leading-relaxed">
            I'm Lakshya. Over the past 4 years, I've sold thousands of rupees in digital products using nothing but WhatsApp chats, Google Pay screenshots, and free page builders. BioHere is the evolution.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center bg-bg-card p-8 md:p-12 rounded-3xl border border-border-subtle shadow-xl">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shrink-0 border-4 border-primary">
            {/* Real placeholder for Lakshya */}
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
              alt="Lakshya Gupta"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-black">Lakshya</h2>
            <p className="text-lg text-text-muted leading-relaxed">
              Before BioHere, I ran my personal brand (you can search "Techiral" online). I helped startups integrate AI without the internet hype, learned AI video generation, and tried every hustle from dropshipping to micro-tools. But my favorite was always digital products.
            </p>
            <p className="text-lg text-text-muted leading-relaxed">
              I sold Reels bundles for theme pages, prompt packs, Notion templates, and ebooks. But my fulfillment was messy—payments came to my mother's bank account, and I manually sent Google Drive links over WhatsApp. I hated paying for expensive tools and constantly searching through Drive folders for my buyers. I needed my own structured platform. 
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
               <div className="flex items-center gap-2 bg-bg-surface px-4 py-2 rounded-lg text-sm font-bold border border-border-subtle">
                <Clock className="w-4 h-4 text-primary" />
                Started at 14 Years Old
              </div>
              <div className="flex items-center gap-2 bg-bg-surface px-4 py-2 rounded-lg text-sm font-bold border border-border-subtle">
                <TrendingUp className="w-4 h-4 text-accent" />
                Techiral / Creator
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-3xl font-black text-center">
            Why I Built This Now
          </h3>
          <div className="border-l-2 border-border-strong pl-8 ml-4 md:ml-0 space-y-12">
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-primary border-4 border-bg-base"></div>
              <h4 className="text-xl font-bold text-text-main">
                The Customer Dilemma
              </h4>
              <p className="text-text-muted mt-2 leading-relaxed">
                I noticed my customers would buy a digital product after watching one of my videos. A few days later, they'd see a new video on a different side hustle, get excited, but couldn't afford to keep buying every new product to test what works for them. There was too much friction for beginners trying to find their footing.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-accent border-4 border-bg-base"></div>
              <h4 className="text-xl font-bold text-text-main">
                The "No Gatekeeping" Vault
              </h4>
              <p className="text-text-muted mt-2 leading-relaxed">
                BioHere solves this. You pay one subscription and get access to ALL my tested products (old and new). No gatekeeping. Pick one, test it out using organic content or Meta Ads. If it doesn't work for you, just pick another one and try again. It removes the risk of product creation.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-alert border-4 border-bg-base"></div>
              <h4 className="text-xl font-bold text-text-main">
                The Hackathon Catalyst
              </h4>
              <p className="text-text-muted mt-2 leading-relaxed">
                While I always wanted to build this to escape manual fulfillment, the Google Gemini XPrize Hackathon gave me the excuse to finally code the platform. I skipped the "free trial" to block out bots and freebie hunters. I'm building this for people who actually want to start a side hustle.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-12">
          <Link
            to="/catalog"
            className="neo-button px-8 py-4 bg-text-main text-bg-base font-black text-lg hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3 rounded-xl"
          >
            View the Public Catalog <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
