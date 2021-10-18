import supertest from "supertest"
import server from "../index.js"

const request = supertest(server)

const registerNewUser = async() => {
    const res = await request.post('/user/register').send(validUser)
    expect(res.status).toBe(201)
    expect(response.success).toBe(true)
    
}


const tests = {
    registerNewUser:registerNewUser
  
}

export default tests