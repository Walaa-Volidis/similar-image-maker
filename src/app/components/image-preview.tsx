interface ImagePreviewProps {
  imageUrl: string;
  title: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  title,
}: ImagePreviewProps) => {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg text-primary">{title}</h3>
      <div className="aspect-square bg-secondary/20 rounded-xl overflow-hidden border-2 border-border shadow-md transition-all duration-300 hover:shadow-lg">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/50 mb-3">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
              <circle cx="9" cy="9" r="2"></circle>
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
            </svg>
            <p className="text-sm text-muted-foreground text-center">
              Image preview will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
