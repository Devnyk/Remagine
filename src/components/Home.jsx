import ImageUpload from "./ImageUpload";
import ImagePreview from "./ImagePreview";
import { useState } from "react";
import { enhancedImageAPI } from "../utils/enhancedImageApi";

const Home = () => {
  const [uploadImage, setUploadImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const UploadImageHandler = async(file)=>{

    setUploadImage(URL.createObjectURL(file))
    setLoading(true)
    
    //call the API to enhance the image

    try {
      const enhancedURL = await enhancedImageAPI(file)
      setEnhancedImage(enhancedURL)
      setLoading(false)

    } catch (error) {
      console.log(error);
      alert("Error while enhancing, please try again later")
      
    }
    
  }

  return (
    <>
      <ImageUpload UploadImageHandler={UploadImageHandler}></ImageUpload>
      <ImagePreview
        loading={loading}
        uploadImage={uploadImage}
        enhancedImage={enhancedImage?.image}
      ></ImagePreview>
    </>
  );
};

export default Home;
