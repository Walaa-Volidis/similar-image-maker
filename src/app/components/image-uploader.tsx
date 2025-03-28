interface ImageUploaderProps {
  onImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
}: ImageUploaderProps) => {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-gray-400 transition-colors">
      <input
        type="file"
        accept="image/*"
        onChange={onImageSelect}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload" className="flex flex-col items-center">
        <p className="text-sm text-gray-500 text-center mb-2">
          select image to upload
        </p>
        <p className="text-xs text-gray-400">Supports JPG, PNG • Max 5MB</p>
      </label>
    </div>
  );
};
