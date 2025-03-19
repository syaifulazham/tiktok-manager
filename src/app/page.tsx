'use client';

import React, { useState } from 'react';
import { Header } from '@/components/header';
import { FormGenerator } from '@/components/form-generator';
import { ResultCard } from '@/components/result-card';
import { TikTokConsultResult } from '@/lib/utils';

export default function Home() {
  const [result, setResult] = useState<TikTokConsultResult | null>(null);

  const handleReset = () => {
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col w-full items-center justify-center">
      <Header />
      
      <main className="flex flex-col items-center justify-center w-full">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-muted/0">
          <div className="px-4 md:px-6 flex flex-col items-center text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Create Viral TikTok Content
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get AI-powered TikTok content ideas customized for your product
            </p>
          </div>
        </section>
        
        <section className="container px-4 md:px-6 py-6 md:py-10 space-y-10">
          <div className="flex justify-center">
            {result ? (
              <ResultCard result={result} onReset={handleReset} />
            ) : (
              <FormGenerator onResult={setResult} />
            )}
          </div>
        </section>
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2025 TiktokConsult. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}