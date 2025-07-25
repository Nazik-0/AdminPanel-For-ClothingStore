import React, { useCallback, useState } from 'react';
import { UploadCloud, X } from 'lucide-react';

interface BrandLogoUploaderProps {
  onFileChange: (file: File | null) => void;
  initialPreview?: string;
}

export const BrandLogoUploader: React.FC<BrandLogoUploaderProps> = ({ 
  onFileChange, 
  initialPreview 
}) => {
  const [preview, setPreview] = useState<string | null>(initialPreview || null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Validate file type
      if (!file.type.match('image.*')) {
        setError('Only image files are allowed');
        onFileChange(null);
        return;
      }
      
      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        setError('File size exceeds 2MB limit');
        onFileChange(null);
        return;
      }
      
      setError(null);
      onFileChange(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onFileChange]);

  const handleRemove = useCallback(() => {
    setPreview(null);
    onFileChange(null);
    setError(null);
  }, [onFileChange]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center">
        {preview ? (
          <div className="relative">
            <img 
              src={preview} 
              alt="Brand logo preview" 
              className="w-32 h-32 object-contain border rounded-lg"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG up to 2MB
              </p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}
    </div>
  );
};