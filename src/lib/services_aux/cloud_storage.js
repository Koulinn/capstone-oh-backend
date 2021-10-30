import pkg from 'cloudinary'
import multerStorageCloudinary from 'multer-storage-cloudinary'
const {v2:cloudinary} = pkg
const {CloudinaryStorage} = multerStorageCloudinary

export const saveUserMedicalRequestFiles = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: 'OneHealth/patient/requests'
    }
})
export const saveUserAvatar = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: 'OneHealth/patient/avatar'
    }
})

export const saveHospitalFiles = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: 'OneHealth/hospital'
    }
})