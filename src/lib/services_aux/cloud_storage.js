import pkg from 'cloudinary'
import multerStorageCloudinary from 'multer-storage-cloudinary'
const {v2:cloudinary} = pkg
const {CloudinaryStorage} = multerStorageCloudinary

export const saveToPersonFiles = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: 'OneHealth/patient'
    }
})
export const saveHospitalFiles = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: 'OneHealth/hospital'
    }
})