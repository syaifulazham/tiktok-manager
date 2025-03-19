'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { PRODUCT_CATEGORIES, EXPRESSIONS, LANGUAGES } from '@/lib/constants';
import { TikTokConsultFormData, TikTokConsultResult } from '@/lib/utils';

interface FormGeneratorProps {
  onResult: (result: TikTokConsultResult) => void;
}

export function FormGenerator({ onResult }: FormGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<TikTokConsultFormData>({
    defaultValues: {
      productCategory: '',
      productName: '',
      productDescription: '',
      expression: '',
      language: 'english'
    }
  });

  const onSubmit = async (data: TikTokConsultFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate consultation');
      }

      const result = await response.json();
      onResult(result);
    } catch (error: any) {
      toast.error('Error', {
        description: error.message || 'Something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>TikTok Content Creator</CardTitle>
        <CardDescription>
          Fill in the details about your product to generate TikTok content ideas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productCategory">Product Category</Label>
            <Select 
              onValueChange={(value) => form.setValue('productCategory', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {PRODUCT_CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productName">Product Name</Label>
            <Input 
              id="productName"
              placeholder="Enter product name"
              {...form.register('productName', { required: true })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productDescription">Product Description</Label>
            <Textarea 
              id="productDescription"
              placeholder="Briefly describe your product..."
              className="min-h-24"
              {...form.register('productDescription', { required: true })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expression">Expression Style</Label>
            <Select 
              onValueChange={(value) => form.setValue('expression', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select expression style" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {EXPRESSIONS.map((expression) => (
                    <SelectItem key={expression.value} value={expression.value}>
                      {expression.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Content Language</Label>
            <Select 
              onValueChange={(value) => form.setValue('language', value)}
              defaultValue="english"
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {LANGUAGES.map((language) => (
                    <SelectItem key={language.value} value={language.value}>
                      {language.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Content Ideas'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}