import dotenv from "dotenv"
import mongoose from "mongoose"
import tests from './tests-handlers.js'



dotenv.config()



describe("Testing the testing environment", () => {
    it("should test that true is true", () => {
        expect(true).toBe(true);
    })
})

describe("Testing the user route", () => {

    beforeAll(done => {
        mongoose.connect(process.env.MONGO_TEST_URL)
            .then(() => {
                console.log("Connected to Atlas")
                done()
            }).catch(err => console.log(err))
    })


    

    it("should test that a POST /user is  creating a valid user", tests.registerValidUser)
    it("should test POST  /user error message and status for invalid user", tests.registerInvalidUser)
    it("should test POST /login send correct tokens", tests.login)
    it("should test GET /me send user data", tests.getMe)

    afterAll(done => {
        mongoose.connection.dropDatabase()
            .then(() => {
                console.log("DB dropped, removed testing DB")

                mongoose.connection.close().then(() => {
                    done()
                })
            })
    })


})


