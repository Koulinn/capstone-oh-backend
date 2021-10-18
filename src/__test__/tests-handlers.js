import supertest from "supertest"
import testServer from "../server"

const request = supertest(testServer)

const registerNewUser = async () => {
    const validUser = {
        name: 'Karla',
        surname: 'Oliveira',
        email: 'karla@mail.com',
        password: '132',
        birth_date: '03-25-1995'
    }
    const res = await request.post('/user').send(validUser)
    console.log(res)
    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)

}


const tests = {
    registerNewUser: registerNewUser

}

export default tests