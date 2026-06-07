import React from "react";

export default function About() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
        <h1 className="text-4xl sm:text-5xl font-black text-text-main tracking-tight">
          About BioHere
        </h1>
        <p className="text-xl text-text-subtle">
          We believe beginners deserve a starting point, not an empty dashboard.
        </p>
      </div>

      <div className="prose prose-lg border-l-4 border-primary pl-6 sm:pl-8 mx-auto text-text-main">
        <p>
          The creator economy is broken. You see a trending side hustle video, you buy the digital product, and you try selling it. Two days later, another challenge video pops up, a new product excites you, but your budget is now gone. 
        </p>
        <p>
          It's nearly impossible for beginners to buy every new product just to test what works for them. 
        </p>
        <p>
          We built <strong>BioHere</strong> because we wanted a simple, elegant
          way to solve this dilemma. No more empty storefront builders. No more gatekeeping.
        </p>
        <h3 className="text-2xl font-bold mt-10 mb-4 text-text-main">
          Our Mission
        </h3>
        <p>
          Our mission is to arm independent creators with the tools and the <strong>actual products</strong> they need to start a digital side hustle. 
        </p>
        <p>
          You pay one time, you get everything. All old products, all new products. You can pick up a Reels bundle, run some Meta Ads or organic TikToks, and try to get sales. If it doesn't work, no worries. Pick up another product and try again. And because there is no inventory, you have zero downside.
        </p>
        <h3 className="text-2xl font-bold mt-10 mb-4 text-text-main">
          Why No Free Trial?
        </h3>
        <p>
          We charge a ₹1 initial fee followed by a monthly subscription to keep bots and freebie hunters out. This platform is for people who are serious about testing products and building a real side hustle without the massive upfront costs of traditional dropshipping or product sourcing. 
        </p>
      </div>
    </div>
  );
}
