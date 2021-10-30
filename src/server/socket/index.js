import { Server } from 'socket.io'
import { httpServer } from '../index.js'
import socketHandlers from './socket-handlers.js'


const {newUserConnection, dcUser} = socketHandlers

let waitingUsers = []
let assistants = []
const assistantsRoom = 'assistRoom'

export const connectSocket = (server) => {
    try {

        const io = new Server(httpServer, { allowEIO3: true })

        io.on('connection', socket => {
            console.log('Coon established')
            console.log(waitingUsers.length, 'from forceDC')
            socket.on('newUser', async (payload) => {
                const user = payload.user
                await newUserConnection(payload, waitingUsers, socket.id)
                socket.emit('newUserOn', user)
                socket.join(user._id)            
            })
            socket.on('newAssistant', async (payload) => {
                const newAssistant ={
                    assistant: payload.assistant,
                    socketID: socket.id
                }
                assistants.push(newAssistant)
                socket.emit('waitingUsers', waitingUsers)
            })
            socket.on('openRoomWithUser', async (payload) => {
                const assistant = payload
                const {user} = waitingUsers.shift()
                console.log(payload, 'user id from openroom')
                socket.join(user._id)
                socket.emit("onUserChat", user)
                socket.to(user._id).emit('onChat',assistant)

                // save room in DB
                
                // open EMIT notification to the user and assistant that hey are in the same room
                // User is sent from waiting interface to the chat interface
            })
            socket.on('newMessage', async (payload) => {
                console.log('inside new message >>>room ID', payload.roomID)
                const {roomID} = payload
                // save message to the DB
                // message can have multiples files
                socket.to(roomID).emit('recipientMessage', payload)
                // EMIT to the assistant the user message
                // EMIT to the user that the assistant has received a message
            })

            socket.on('forceUserDisconnect', () => {
               dcUser(waitingUsers, socket) 
               socket.emit('updateWaitingUser', waitingUsers)
                console.log(waitingUsers.length, 'from forceDC')

            })
            socket.on("disconnect", () => {
                dcUser(waitingUsers, socket) 
                socket.emit('updateWaitingUser', waitingUsers)
                console.log(waitingUsers.length, 'from disconnect')
            })
        })
    } catch (error) {
        console.log(error)
    }
}