'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ImageUploader } from '../app/components/image-uploader';
import { ImagePreview } from '../app/components/image-preview';
import { ProgressBar } from '../app/components/progress-bar';
import { Header } from '../app/components/Header';
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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-6 max-w-5xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-2">Transform Your Images</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Upload an image and our AI will create a stylistically similar version with its own unique characteristics.
          </p>
        </div>
        
        <Card className="shadow-lg border-2 border-border overflow-hidden">
          <CardHeader className="bg-secondary/20 border-b border-border">
            <CardTitle className="text-2xl font-bold text-primary">Create Similar Image</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8">
              <ImageUploader onImageSelect={handleImageSelect} />

              {(uploadError || generationError) && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {uploadError || generationError}
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid md:grid-cols-2 gap-6">
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
                className="w-full py-6 text-lg font-semibold"
              >
                {loading ? 'Creating Similar Image...' : 'Create Similar Image'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
