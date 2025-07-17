import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      if (setPreview) {
        setPreview(preview);
      }
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) {
      setPreview(null);
    }
  };

  return (
    <div className="profile-photo-selector">
      <label className="block mb-2 font-medium">Profile Photo</label>
      <div className="flex items-center gap-4">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Profile Preview"
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
            <LuUser size={24} />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImageChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => inputRef.current.click()}
          className="text-blue-600 flex items-center gap-1"
        >
          <LuUpload /> Upload
        </button>
        {image && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="text-red-600 flex items-center gap-1"
          >
            <LuTrash /> Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
