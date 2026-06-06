import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const JsonLd = ({ data }: { data: any }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);

export default function Docs() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Documentation - Pi-Store",
        "description": "Learn how to set up your store, manage CRM, and publish products."
      }} />
      <h1 className="text-4xl md:text-6xl font-black text-text-main tracking-tight mb-6 text-center">Documentation</h1>
      <p className="text-lg md:text-xl text-text-muted max-w-3xl font-medium mb-20 text-center">Everything you need to launch and scale.</p>
      
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
        <div className="bg-bg-card border border-border-subtle p-8 rounded-2xl flex flex-col gap-4 group hover:border-accent hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-xl font-bold text-text-main mt-2">Storefront Setup</h3>
          <p className="text-text-muted font-medium flex-1 text-sm leading-relaxed">Configure your branding, colors, and layout in the builder.</p>
          <button className="text-accent font-semibold text-sm flex items-center hover:opacity-80 transition-opacity w-max mt-2">Read Guide &rarr;</button>
        </div>
        
        <div className="bg-bg-card border border-border-subtle p-8 rounded-2xl flex flex-col gap-4 group hover:border-accent hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-xl font-bold text-text-main mt-2">Product Publishing</h3>
          <p className="text-text-muted font-medium flex-1 text-sm leading-relaxed">How to upload files, set pricing securely, and organize categories.</p>
          <button className="text-accent font-semibold text-sm flex items-center hover:opacity-80 transition-opacity w-max mt-2">Read Guide &rarr;</button>
        </div>

        <div className="bg-bg-card border border-border-subtle p-8 rounded-2xl flex flex-col gap-4 group hover:border-accent hover:shadow-md transition-all">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-xl font-bold text-text-main mt-2">CRM Workflows</h3>
          <p className="text-text-muted font-medium flex-1 text-sm leading-relaxed">Connecting Google Workspace, tracking leads, and automating follow-ups.</p>
          <button className="text-accent font-semibold text-sm flex items-center hover:opacity-80 transition-opacity w-max mt-2">Read Guide &rarr;</button>
        </div>
      </div>
    </div>
  );
}
