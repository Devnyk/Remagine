import axios from "axios";


const API_KEY  = "wx2qzdulkpsg72bog"
const BASE_URL = "https://techhk.aoscdn.com/"

export const enhancedImageAPI = async (file) => {
  //code to call API & get image URL

  try {
    const taskId = await uploadOriginalImage(file)
    console.log("Image Uploaded Successfully, Task ID:", taskId);
    

    const enhancedImageData = await pollEnhancedImage(taskId);
    console.log("Enhanced Image Data:", enhancedImageData);
    
    return enhancedImageData;
    
  } catch (error) {
    console.log("Error enhancing image:", error.message);
  }
}

const uploadOriginalImage = async (file) => {
  const formData = new FormData()
  formData.append("image_file", file);

  const {data} = await axios.post(`${BASE_URL}/api/tasks/visual/scale`, formData, {
    headers: {
      "Content-Type": "Multipart/form-data",
      "X-API-KEY": API_KEY,
    }
  })

    //code to upload image
    // /api/tasks/visual/scale ---post

    if(!data?.data?.task_id){
      throw new Error("failed to upload image! Task ID not found")
    }

    // console.log(data);
    
    return data.data.task_id;
}

const fetchEnhancedImage = async (taskId) => {

  const {data} = await axios.get(`${BASE_URL}/api/tasks/visual/scale/${taskId}`, {
    headers: {
      "X-API-KEY": API_KEY,
    }
  })

  if(!data?.data){
    throw new Error("failed to fetch enhanced image! Image not found")
  }

  return data.data
  


    //fetch enhanced image
    // /api/tasks/visual/scale/{task_id} ---get
}

const pollEnhancedImage = async (taskId, retries = 0) =>{
  const result = await fetchEnhancedImage(taskId);

  if(result.state == 4){
    console.log("processing...");

    if(retries >= 20){
      throw new Error("Max retries reached. Please try again later.")
    }

    //wait for 2 second
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return pollEnhancedImage(taskId, retries + 1);

  }
  console.log("Enhanced Image URL:", result);
  return result;
}


// {data: {task_id: '08eb6eaf-5620-4b00-bfb7-71ebe9a853d3'}, message: "success", status: 200}

// Image Uploaded Successfully, Task ID: e4eb886f-d81c-4ee3-acbe-b50a6c9e2934