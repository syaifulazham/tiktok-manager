'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/header';
import { toast } from 'sonner';

interface ConsultationPreview {
  id: number;
  productCategory: string;
  productName: string;
  productDescription: string;
  expression: string;
  language: string;
  createdAt: string;
}

interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function HistoryPage() {
  const [consultations, setConsultations] = useState<ConsultationPreview[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchHistory = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/history?page=${page}&limit=10`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }
      
      const data = await response.json();
      setConsultations(data.consultations);
      setPagination(data.pagination);
    } catch (error: any) {
      toast.error('Error', {
        description: error.message || 'Failed to load consultation history'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchHistory(newPage);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text: string, maxLength = 100) => {
    return text.length > maxLength 
      ? `${text.substring(0, maxLength)}...` 
      : text;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 px-4 py-16">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2"
            onClick={() => router.push('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Consultation History</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : consultations.length === 0 ? (
            <div className="text-center py-8">
              <p className="mb-4">No consultation history found.</p>
              <Button onClick={() => router.push('/')}>
                Create your first consultation
              </Button>
            </div>
          ) : (
            consultations.map((consultation) => (
              <Card key={consultation.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{consultation.productName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <p><strong>Category:</strong> <span className="text-muted-foreground">{consultation.productCategory}</span></p>
                    <p><strong>Description:</strong> <span className="text-muted-foreground">{truncateText(consultation.productDescription)}</span></p>
                    <p><strong>Style:</strong> <span className="text-muted-foreground">{consultation.expression}</span>, <strong>Language:</strong> <span className="text-muted-foreground">{consultation.language}</span></p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(consultation.createdAt)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatTime(consultation.createdAt)}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    variant="outline" 
                    onClick={() => router.push(`/history/${consultation.id}`)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
        
        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <Button 
              variant="outline" 
              size="sm"
              disabled={pagination.page === 1}
              onClick={() => handlePageChange(pagination.page - 1)}
            >
              Previous
            </Button>
            <span className="mx-2">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button 
              variant="outline" 
              size="sm"
              disabled={pagination.page === pagination.totalPages}
              onClick={() => handlePageChange(pagination.page + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}