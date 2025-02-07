import { useState } from 'react';

interface UseImageGenerationReturn {
  generatedImage: string;
  loading: boolean;
  progress: number;
  error: string;
  generateImage: (file: File) => Promise<void>;
  resetGeneration: () => void;
}

export function useImageGeneration(): UseImageGenerationReturn {
  const [generatedImage, setGeneratedImage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string>('');

  const generateImage = async (file: File) => {
    setLoading(true);
    setError('');
    setProgress(0);

    try {
      const base64Image = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 1000);

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        throw new Error('Failed to generate similar image');
      }

      const data = await response.json();
      setGeneratedImage(data.image);
      setProgress(100);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to generate similar image'
      );
    } finally {
      setLoading(false);
    }
  };

  const resetGeneration = () => {
    setGeneratedImage('');
    setLoading(false);
    setProgress(0);
    setError('');
  };

  return {
    generatedImage,
    loading,
    progress,
    error,
    generateImage,
    resetGeneration,
  };
}
