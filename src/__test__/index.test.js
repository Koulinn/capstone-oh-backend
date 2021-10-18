import dotenv from "dotenv"
import mongoose from "mongoose"
import tests from './tests-handlers.js'



dotenv.config()



describe("Testing the testing environment", () => {
    it("should test that true is true", () => {
       expect(true).toBe(true);
    })
})

describe("Testing the server", () => {

    beforeAll(done => {
        mongoose.connect(process.env.MONGO_TEST_URL)
            .then(() => {
                console.log("Connected to Atlas")
                done()
            }).catch(err=>console.log(err))
    }) 
    
    it("should test that true is true", () => {
        expect(true).toBe(true);
     })

    afterAll(done => {
        mongoose.connection.dropDatabase()
             .then(() => {
                console.log("DB dropped, removed testing DB")
                
                mongoose.connection.close().then(() => {
                    done()
                })
            })
        })
    
    // it("should test that a POST /user/register is  creating a valid user", tests.userCreation)
    
})


