import {getAge} from "get-complete-age"


// date must be mm-dd-yyyy
const getPreciseAge = (date) =>{
    return getAge.getAge(date)

}


const tools ={
    getPreciseAge:getPreciseAge
}

export default tools