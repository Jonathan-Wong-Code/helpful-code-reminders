  // Any state updater that uses prevState must be typed out as if the updater function is the argument.
  
  setImagePreviews: (fn: (prevState: ImagePreview) => ImagePreview) => void;

   setImagePreviews((prevState: ImagePreview) => ({
        ...prevState,
        selfie: URL.createObjectURL(file),
      }));
