interface ImagePreviewProps {
  imageUrl: string;
  title: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  title,
}: ImagePreviewProps) => {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">{title}</h3>
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-sm text-gray-400">
              Image preview will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
