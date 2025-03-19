import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { TikTokConsultResult } from '@/lib/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }
    
    const idNumber = parseInt(id, 10);
    
    if (isNaN(idNumber)) {
      return NextResponse.json(
        { error: 'ID must be a valid number' },
        { status: 400 }
      );
    }
    
    const consultation = await prisma.consultation.findUnique({
      where: { id: idNumber }
    });
    
    if (!consultation) {
      return NextResponse.json(
        { error: 'Consultation not found' },
        { status: 404 }
      );
    }
    
    // Transform the data to match the TikTokConsultResult format
    const formattedResult: TikTokConsultResult = {
      videoStoryline: consultation.videoStoryline,
      dialogueParts: consultation.dialogueParts,
      captions: consultation.captions,
      soundType: consultation.soundType,
      uploadTime: consultation.uploadTime,
      dosDonts: {
        dos: consultation.dos as string[],
        donts: consultation.donts as string[]
      }
    };
    
    return NextResponse.json({
      id: consultation.id,
      formData: {
        productCategory: consultation.productCategory,
        productName: consultation.productName,
        productDescription: consultation.productDescription,
        expression: consultation.expression,
        language: consultation.language
      },
      result: formattedResult,
      createdAt: consultation.createdAt
    });
  } catch (error: Error | unknown) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch consultation' },
      { status: 500 }
    );
  }
}