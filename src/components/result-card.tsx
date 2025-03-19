'use client';

import React from 'react';
import { Download, Film, Sparkles, Music, Clock, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { StepCard } from '@/components/step-card';
import { TikTokConsultResult } from '@/lib/utils';

interface ResultCardProps {
  result: TikTokConsultResult;
  onReset: () => void;
}

export function ResultCard({ result, onReset }: ResultCardProps) {
  
  const downloadAsJson = () => {
    const jsonString = JSON.stringify(result, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tiktok-consultation.json';
    document.body.appendChild(a);
    a.click();
    
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast.success('Download successful', {
      description: 'Your TikTok consultation has been downloaded'
    });
  };

  return (
    <div className="flex items-center justify-center w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Your TikTok Content Consultation</CardTitle>
          <CardDescription>
            Here's your personalized TikTok content strategy
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StepCard
              title="Video Storyline"
              icon={<Film className="h-5 w-5" />}
              content={result.videoStoryline}
            />
            
            <StepCard
              title="Dialogue Parts"
              icon={<Sparkles className="h-5 w-5" />}
              content={result.dialogueParts}
            />

            <StepCard
              title="Captions & Annotations"
              content={result.captions}
            />
            
            <StepCard
              title="Sound & Music"
              icon={<Music className="h-5 w-5" />}
              content={result.soundType}
            />
            
            <StepCard
              title="Upload Timing"
              icon={<Clock className="h-5 w-5" />}
              content={result.uploadTime}
            />

            <div className="grid grid-cols-1 gap-4">
              <StepCard
                title="Do's"
                icon={<Check className="h-5 w-5" />}
                colorClass="text-green-500"
                content={result.dosDonts.dos}
              />
              
              <StepCard
                title="Don&apos;ts"
                icon={<X className="h-5 w-5" />}
                colorClass="text-red-500"
                content={result.dosDonts.donts}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <Button variant="outline" onClick={onReset}>
            Create New
          </Button>
          <Button variant="default" onClick={downloadAsJson}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}