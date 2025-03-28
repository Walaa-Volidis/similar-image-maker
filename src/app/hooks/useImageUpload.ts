import { useState } from 'react';

interface UseImageUploadReturn {
  selectedImage: File | null;
  previewUrl: string;
  error: string;
  handleImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetImage: () => void;
}

export function useImageUpload(): UseImageUploadReturn {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      setSelectedImage(file);
      setError('');

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetImage = () => {
    setSelectedImage(null);
    setPreviewUrl('');
    setError('');
  };

  return {
    selectedImage,
    previewUrl,
    error,
    handleImageSelect,
    resetImage,
  };
}
