import OpenAI from 'openai';
import { TikTokConsultFormData, TikTokConsultResult } from './utils';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateTikTokConsult(
  formData: TikTokConsultFormData
): Promise<TikTokConsultResult> {
  try {
    const prompt = `
    Create a TikTok content workflow guideline for selling the following product:
    
    Product Category: ${formData.productCategory}
    Product Name: ${formData.productName}
    Product Description: ${formData.productDescription}
    Expression Style: ${formData.expression}
    Content Language: ${formData.language}
    
    Please provide a comprehensive TikTok content strategy including:
    1. Video storyline (beginning, middle, end)
    2. Dialogue parts or script (what to say and when)
    3. Captions and annotations to include in the video
    4. Recommended type of background sound/songs
    5. Optimal time to upload (occasions, time of day, day of week)
    6. List of important Dos and Don'ts for this specific product
    
    Format your response as a structured JSON object with the following keys:
    - videoStoryline (as a string with line breaks, not an object)
    - dialogueParts (as a string with line breaks, not an object)
    - captions (as a string)
    - soundType (as a string)
    - uploadTime (as a string)
    - dosDonts (with nested 'dos' and 'donts' arrays of strings)
    
    Make sure all response fields are properly formatted as described above.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert TikTok marketing consultant who specializes in creating viral content strategies for selling products. Your responses must match the exact format requested by the user.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' }
    });

    const resultContent = response.choices[0]?.message?.content;
    
    if (!resultContent) {
      throw new Error('Failed to generate TikTok consultation');
    }

    const rawResult = JSON.parse(resultContent);
    
    // Ensure the response has the correct format
    const formattedResult: TikTokConsultResult = {
      videoStoryline: ensureString(rawResult.videoStoryline),
      dialogueParts: ensureString(rawResult.dialogueParts),
      captions: ensureString(rawResult.captions),
      soundType: ensureString(rawResult.soundType),
      uploadTime: ensureString(rawResult.uploadTime),
      dosDonts: {
        dos: ensureStringArray(rawResult.dosDonts?.dos || []),
        donts: ensureStringArray(rawResult.dosDonts?.donts || [])
      }
    };

    return formattedResult;
  } catch (error) {
    console.error('Error generating TikTok consultation:', error);
    throw error;
  }
}

// Helper function to ensure a value is a string
function ensureString(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2);
  }
  return String(value);
}

// Helper function to ensure a value is an array of strings
function ensureStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(item => ensureString(item));
  }
  if (typeof value === 'string') {
    return [value];
  }
  if (value === null || value === undefined) {
    return [];
  }
  if (typeof value === 'object') {
    return Object.values(value).map(item => ensureString(item));
  }
  return [String(value)];
}