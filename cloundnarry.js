
// import { v2 as cloudinary } from cloudinary;
// import fs from 'fs';

// cloudinary.config({
//     cloud_name: process.env.COLUNDINARY_CLOUD_NAME,
//     api_key: process.env.COLUNDINARY_API_KEY,
//     api_secret: process.env.COLUNDINARY_API_SECRET
// });

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) {
//             return null;
//         }
//         else {
//             const response = await cloudinary.uploader.upload(localFilePath, {
//                 resource_type: "auto",
//             });
//             console.log("File uploaded successfully", response.url);
//             return response;
//         }
//     } catch (error) {
//         fs.unlinkSync(localFilePath); // remove the locally saved file if upload failed
//         return null;
//     }
// }

// export { uploadOnCloudinary }

