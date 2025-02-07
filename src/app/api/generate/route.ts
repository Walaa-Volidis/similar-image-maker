import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';
import { uploadToS3 } from '../../../lib/uploadToS3';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function streamToBuffer(stream: ReadableStream): Promise<Buffer> {
  const reader = stream.getReader();
  const chunks = [];
  let done, value;
  while ((({ done, value } = await reader.read()), !done)) {
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}

export async function POST(request: NextRequest) {
  try {
    const { image: base64Image } = await request.json();
    const buffer = Buffer.from(base64Image.split(',')[1], 'base64');
    const imageUrl = await uploadToS3(buffer);
    const output = await replicate.run(
      'stability-ai/stable-diffusion-img2img:15a3689ee13b0d2616e98820eca31d4c3abcd36672df6afce5cb6feb1d66087d',
      {
        input: {
          image: imageUrl,
          prompt: 'A fantasy landscape, trending on artstation',
          scheduler: 'DPMSolverMultistep',
          num_outputs: 1,
          guidance_scale: 7.5,
          prompt_strength: 0.8,
          num_inference_steps: 25,
        },
      }
    );
    let image: string = '';
    console.log('output', output);
    const item = output[0];
    const imageBuffer = await streamToBuffer(item);
    image = await uploadToS3(imageBuffer);
    return NextResponse.json({
      message: 'Images generated and saved successfully',
      image: image,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to generate image' });
  }
}
