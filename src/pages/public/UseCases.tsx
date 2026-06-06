import React from 'react';
import { Camera, Zap, Smartphone, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function UseCases() {
  const avatars = [
    {
      icon: <Camera className="w-8 h-8 text-primary" />,
      title: "Content Creators",
      subtitle: "You have an audience, but aren't monetizing properly.",
      points: [
        "Stop relying on unpredictable ad revenue or sponsorships.",
        "Launch your brand with our done-for-you digital products.",
        "Link your Pi-Store in your bio and turn views into real cash.",
      ],
      color: "border-primary/50 bg-primary/5"
    },
    {
      icon: <Zap className="w-8 h-8 text-accent" />,
      title: "The Side Hustler",
      subtitle: "You want a passive online income but have no skills yet.",
      points: [
        "You don't need to know how to code, design, or write.",
        "We provide the storefront AND the market-tested products.",
        "Just copy the link, promote it on social media, and get paid.",
      ],
      color: "border-accent/50 bg-accent/5"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-alert" />,
      title: "Theme Page Owners",
      subtitle: "You run faceless pages on TikTok or Instagram.",
      points: [
        "Monetize faceless audiences instantly with our PLR bundles.",
        "No customer support headaches, we handle product delivery.",
        "1-click checkout engineered perfectly for mobile traffic."
      ],
      color: "border-alert/50 bg-alert/5"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-20 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black text-text-main tracking-tight mb-6">Who is this for?</h1>
        <p className="text-xl text-text-muted font-medium mb-12 leading-relaxed">
          Pi-Store is built for people who want to make money online, without taking on the headaches of traditional business.
        </p>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {avatars.map((opt, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`neo-card p-6 sm:p-10 bg-bg-card border-2 ${opt.color} flex flex-col items-start text-left`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-bg-surface`}>
               {opt.icon}
            </div>
            <h3 className="text-3xl font-black text-text-main mb-3">{opt.title}</h3>
            <p className="text-text-main font-bold mb-8 opacity-80">{opt.subtitle}</p>
            
            <ul className="space-y-4 mb-8 flex-1">
              {opt.points.map((point, j) => (
                <li key={j} className="flex gap-3 text-text-muted font-medium leading-relaxed">
                  <Sparkles className="w-5 h-5 text-text-main shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="mt-24 text-center">
         <Link to="/register" className="neo-button inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-text-main text-bg-base font-black text-lg sm:text-xl rounded-2xl hover:bg-primary hover:text-black transition-colors shadow-xl">
           Build Your Empire Today
         </Link>
      </div>
    </div>
  );
}
