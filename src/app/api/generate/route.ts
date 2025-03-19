import { NextRequest, NextResponse } from 'next/server';
import { generateTikTokConsult } from '@/lib/openai';
import { TikTokConsultFormData } from '@/lib/utils';
import prisma from '@/lib/prisma';

export const runtime = 'edge';
export const maxDuration = 300; // Set maximum duration to 300 seconds (5 minutes)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    if (!body.productCategory || !body.productName || !body.productDescription || 
        !body.expression || !body.language) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const formData: TikTokConsultFormData = {
      productCategory: body.productCategory,
      productName: body.productName,
      productDescription: body.productDescription,
      expression: body.expression,
      language: body.language
    };

    // Generate the consultation content
    const result = await generateTikTokConsult(formData);

    // Save to database
    try {
      await prisma.consultation.create({
        data: {
          productCategory: formData.productCategory,
          productName: formData.productName,
          productDescription: formData.productDescription,
          expression: formData.expression,
          language: formData.language,
          videoStoryline: result.videoStoryline,
          dialogueParts: result.dialogueParts,
          captions: result.captions,
          soundType: result.soundType,
          uploadTime: result.uploadTime,
          dos: result.dosDonts.dos,
          donts: result.dosDonts.donts
        }
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue with the response even if database save fails
      // We don't want to block the user from getting their result
    }

    return NextResponse.json(result);
  } catch (error: Error | unknown) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate TikTok consultation' },
      { status: 500 }
    );
  }
}