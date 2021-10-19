import { saveHospitalFiles, saveUserMedicalRequestFiles } from "./cloud_storage.js"

const servicesAux ={
    saveUserMedicalRequestFiles:saveUserMedicalRequestFiles,
    saveHospitalFiles:saveHospitalFiles
}

export default servicesAux