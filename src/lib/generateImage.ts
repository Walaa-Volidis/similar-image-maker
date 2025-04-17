import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function streamToBuffer(
  stream: ReadableStream<Uint8Array>
): Promise<Buffer> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let done = false;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    if (value) chunks.push(value);
    done = readerDone;
  }

  return Buffer.concat(chunks);
}

export async function generateImage(imageUrl: string): Promise<Buffer> {
  const output= (await replicate.run(
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
  )) as string[];

  if (!output || output.length === 0) {
    throw new Error('No image was generated');
  }

  const imageUrlGenerated = output[0]; 
  const response = await fetch(imageUrlGenerated);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }

  const imageStream = response.body as ReadableStream<Uint8Array>; 
  return streamToBuffer(imageStream); 
}
