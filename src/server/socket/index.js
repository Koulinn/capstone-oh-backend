import { Server } from 'socket.io'
import { httpServer } from '../index.js'
import socketHandlers from './socket-handlers.js'


const {newUserConnection} = socketHandlers

let waitingUsers = []
let assistants = []
const assistantsRoom = 'assistRoom'

export const connectSocket = (server) => {
    try {

        const io = new Server(httpServer, { allowEIO3: true })

        io.on('connection', socket => {
            console.log('inside connection')

            socket.on('newUser', async (payload) => {
                await newUserConnection(payload)
                socket.to(assistantsRoom).emit('newUserOn', payload.user)
                console.log('inside NEW user')                
            })
            socket.on('newAssistant', async (payload) => {
                //    add to list of online assistants
                //    EMIT waitingUsers: send the list of online users
            })
            socket.on('openRoomWithUser', async (payload) => {
                //    assistant get the first index with flag isWaiting = true
                // create room to the DB
                // open JOIN room with this user
                // open EMIT notification to the user and assistant that hey are in the same room
                // User is sent from waiting interface to the chat interface
            })
            socket.on('newMessage', async (payload) => {
                // save message to the DB
                // message can have multiples files
                // EMIT to the assistant the user message
                // EMIT to the user that the assistant has received a message
            })

            socket.on('forceDisconnect', () => {
                // onlineUsers = onlineUsers.filter(onlineUser => onlineUser.socketId !== socket.id)
                console.log(waitingUsers.length, 'from forceDC')

            })
            socket.on("disconnect", () => {
                // onlineUsers = onlineUsers.filter(onlineUser => onlineUser.socketId !== socket.id)
                console.log(waitingUsers.length, 'from disconnect')
            })
        })
    } catch (error) {
        console.log(error)
    }
}