import React, { useState } from 'react';
import ImageUploader from "react-images-upload";

export default function StepThree(props){
  const [pictures, setPictures] = useState([]);

  const onDrop = picture => {
    setPictures([...pictures, picture]);
    
  };
  return (
    <ImageUploader
      {...props}
      withIcon={true}
      onChange={onDrop}
      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
      maxFileSize={5242880}
      style={{width:"30rem"}}
    />
  );
}
