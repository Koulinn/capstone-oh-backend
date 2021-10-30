import supertest from "supertest"
import testServer from "../server"


const request = supertest(testServer)

const validUser = {
    name: 'Karla',
    surname: 'Oliveira',
    email: 'karla@mail.com',
    password: '13rewr435432',
    birth_date: '03-25-1995'
}

let validAccessToken = ''
let validRefreshToken = ''

const registerValidUser = async () => {
    const res = await request.post('/user').send(validUser)
    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)

}

const inValidUser = {
    name: 'Karla',
    surname: 'Oliveira',
    email: 'karla@mail.com',
    password: '132',
    birth_date: '03-25-1995'
}

const registerInvalidUser = async () => {
    const res = await request.post('/user').send(inValidUser)
    expect(res.status).toBe(400)
    expect(res.body.success).toBe(false)

}

const login = async () => {
    const { password, email } = validUser
    const res = await request.post('/user/login').send({ password, email })
    validAccessToken = res.body.accessToken
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.accessToken).toBeDefined()
    expect(res.body.refreshToken).toBeDefined()

}

const getMe = async () => {
    const res = await request.get('/user/me').set('Authorization', `Bearer ${validAccessToken}`)
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)

}



const tests = {
    registerValidUser: registerValidUser,
    registerInvalidUser: registerInvalidUser,
    getMe: getMe,
    login: login

}

export default tests