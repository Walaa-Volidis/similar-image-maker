'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ImageUploader } from '../app/components/image-uploader';
import { ImagePreview } from '../app/components/image-preview';
import { ProgressBar } from '../app/components/progress-bar';
import { useImageUpload } from './hooks/useImageUpload';
import { useImageGeneration } from './hooks/useImageGeneration';

export default function Home() {
  const {
    selectedImage,
    previewUrl,
    error: uploadError,
    handleImageSelect,
  } = useImageUpload();

  const {
    generatedImage,
    loading,
    progress,
    error: generationError,
    generateImage,
  } = useImageGeneration();

  const handleGenerate = async () => {
    if (selectedImage) {
      await generateImage(selectedImage);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Create Similar Image</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <ImageUploader onImageSelect={handleImageSelect} />

            {(uploadError || generationError) && (
              <Alert variant="destructive">
                <AlertDescription>
                  {uploadError || generationError}
                </AlertDescription>
              </Alert>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <ImagePreview imageUrl={previewUrl} title="Original Image" />
              <ImagePreview
                imageUrl={generatedImage}
                title="Generated Similar Image"
              />
            </div>

            {loading && <ProgressBar progress={progress} />}

            <Button
              onClick={handleGenerate}
              disabled={!selectedImage || loading}
              className="w-full"
            >
              {loading ? 'Creating Similar Image...' : 'Create Similar Image'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
