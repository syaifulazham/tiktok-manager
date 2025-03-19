'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { ResultCard } from '@/components/result-card';
import { TikTokConsultFormData, TikTokConsultResult } from '@/lib/utils';
import { toast } from 'sonner';

interface ConsultationDetail {
  id: number;
  formData: TikTokConsultFormData;
  result: TikTokConsultResult;
  createdAt: string;
}

export default function ConsultationDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const [consultation, setConsultation] = useState<ConsultationDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchConsultation = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/history/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            toast.error('Consultation not found');
            router.push('/history');
            return;
          }
          throw new Error('Failed to fetch consultation');
        }
        
        const data = await response.json();
        setConsultation(data);
      } catch (error: any) {
        toast.error('Error', {
          description: error.message || 'Failed to load consultation'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchConsultation();
  }, [params.id, router]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Header />
      
      <main className="flex-1 container px-4 py-16">
        <div className="flex items-center gap-2 mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.push('/history')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to History
          </Button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : consultation ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">{consultation.formData.productName}</h1>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                Created on {formatDate(consultation.createdAt)}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <h2 className="text-sm font-medium">Category</h2>
                <p className="text-muted-foreground">{consultation.formData.productCategory}</p>
              </div>
              <div>
                <h2 className="text-sm font-medium">Expression Style</h2>
                <p className="text-muted-foreground">{consultation.formData.expression}</p>
              </div>
              <div>
                <h2 className="text-sm font-medium">Language</h2>
                <p className="text-muted-foreground">{consultation.formData.language}</p>
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <h2 className="text-sm font-medium">Product Description</h2>
                <p className="text-muted-foreground">{consultation.formData.productDescription}</p>
              </div>
            </div>
            
            <ResultCard 
              result={consultation.result} 
              onReset={() => router.push('/')}
            />
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="mb-4">Consultation not found.</p>
            <Button onClick={() => router.push('/history')}>
              Return to History
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}