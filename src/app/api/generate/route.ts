import { NextRequest, NextResponse } from 'next/server';
import { uploadToS3 } from '../../../lib/uploadToS3';
import { generateImage } from '../../../lib/generateImage';

export async function POST(request: NextRequest) {
  try {
    const { image: base64Image } = await request.json();
    const buffer = Buffer.from(base64Image.split(',')[1], 'base64');
    const imageUrl = await uploadToS3(buffer);
    const imageBuffer = await generateImage(imageUrl);
    const image = await uploadToS3(imageBuffer);
    return NextResponse.json({
      message: 'Images generated and saved successfully',
      image: image,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to generate image' });
  }
}
