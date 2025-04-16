interface ImageUploaderProps {
  onImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
}: ImageUploaderProps) => {
  return (
    <div className="border-2 border-dashed border-primary/30 bg-primary/5 rounded-xl p-10 cursor-pointer hover:border-primary hover:bg-primary/10 transition-all duration-300">
      <input
        type="file"
        accept="image/*"
        onChange={onImageSelect}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload" className="flex flex-col items-center">
        <div className="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
            <line x1="16" x2="22" y1="5" y2="5"></line>
            <line x1="19" x2="19" y1="2" y2="8"></line>
            <circle cx="9" cy="9" r="2"></circle>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
          </svg>
        </div>
        <p className="text-lg font-medium text-primary text-center mb-2">
          Click to upload your image
        </p>
        <p className="text-sm text-gray-500">Supports JPG, PNG • Max 5MB</p>
      </label>
    </div>
  );
};
