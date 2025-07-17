import { API_PATHS } from "./apiPath";
import axiosInstance from "./axiosInstance";
import toast from "react-hot-toast";        
const uploadImage = async (imagefile) => {
  try {
    const formData = new FormData();
    formData.append("image", imagefile);

    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data && response.data.url) {
      return response.data; // Return the full response object
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
    console.error("Image upload error:", error);
    toast.error("Image upload failed. Please try again.");
    throw error;
  }
}
export default uploadImage