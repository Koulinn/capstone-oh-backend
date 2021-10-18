import mongoose from 'mongoose'


const mongoUrl = process.env.MONGO_DEV_URL ? process.env.MONGO_DEV_URL : process.env.MONGO_PROD_URL

const connectDB = ()=>{
    mongoose.connect(mongoUrl)
    mongoose.connection.on('connected', () => {
        console.log('Mongo connected') 
        mongoose.connection.on('error', error => {
            console.log('Mongo error: ', error)
        })
    })
}


export default connectDB


