import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;
    
    // Get the total count of consultations
    const totalCount = await prisma.consultation.count();
    
    // Get the consultations with pagination
    const consultations = await prisma.consultation.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        productCategory: true,
        productName: true,
        productDescription: true,
        expression: true,
        language: true,
        createdAt: true,
        // Exclude the large text fields for the list view
      }
    });
    
    return NextResponse.json({
      consultations,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error: Error | unknown) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch consultation history' },
      { status: 500 }
    );
  }
}