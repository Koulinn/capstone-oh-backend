import { saveHospitalFiles, saveUserFiles } from "./cloud_storage.js"

const servicesAux ={
    saveUserFiles:saveUserFiles,
    saveHospitalFiles:saveHospitalFiles
}

export default servicesAux