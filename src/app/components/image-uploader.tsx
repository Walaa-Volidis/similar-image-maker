import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
}: ImageUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) {
        onImageSelect(acceptedFiles[0]);
      }
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-gray-400 transition-colors"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        <Upload className="w-10 h-10 text-gray-400 mb-2" />
        <p className="text-sm text-gray-500 text-center mb-2">
          {isDragActive
            ? 'Drop the image here'
            : 'Drag and drop your image here, or click to select'}
        </p>
        <p className="text-xs text-gray-400">Supports JPG, PNG • Max 5MB</p>
      </div>
    </div>
  );
};
