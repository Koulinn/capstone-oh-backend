import { saveHospitalFiles, saveToPersonFiles } from "./cloud_storage.js"

const servicesAux ={
    saveToPersonFiles:saveToPersonFiles,
    saveHospitalFiles:saveHospitalFiles
}

export default servicesAux