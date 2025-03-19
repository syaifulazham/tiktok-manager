'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

interface StepCardProps {
  title: string;
  description?: string;
  content: string | string[];
  icon?: React.ReactNode;
  colorClass?: string;
}

export function StepCard({ 
  title, 
  description, 
  content, 
  icon, 
  colorClass = "text-primary" 
}: StepCardProps) {
  // Ensure content is either a string or an array of strings
  const processedContent = React.useMemo(() => {
    if (Array.isArray(content)) {
      return content.map(item => typeof item === 'string' ? item : JSON.stringify(item));
    }
    
    if (typeof content === 'string') {
      return content;
    }
    
    // If content is an object or other non-string, convert to JSON string
    return JSON.stringify(content, null, 2);
  }, [content]);

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          {icon && (
            <div className={`p-1 ${colorClass}`}>
              {icon}
            </div>
          )}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        {Array.isArray(processedContent) ? (
          <ul className="list-disc list-inside space-y-1">
            {processedContent.map((item, index) => (
              <li key={index} className="text-sm text-muted-foreground">{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground whitespace-pre-line">{processedContent}</p>
        )}
      </CardContent>
    </Card>
  );
}