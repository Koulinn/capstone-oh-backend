import { Server } from 'socket.io'
import { httpServer } from '../index.js'
import socketHandlers from './socket-handlers.js'



const { newUserConnection, dcUser, saveRoom, isExistentRoom, saveMessage } = socketHandlers

let waitingUsers = []
let assistants = []
const assistantsRoom = 'assistRoom'

export const connectSocket = (server) => {
    try {

        const io = new Server(httpServer, { allowEIO3: true })

        io.on('connection', socket => {
            console.log(waitingUsers.length, ' number of waiting users from forceDC')
            socket.on('newUser', async (payload) => {


                await newUserConnection(payload, waitingUsers, socket.id)
                assistants.forEach(a => {
                    console.log(assistants.length, 'Number of online assistants')
                    socket.to(a.assistant._id).emit('waitingUsers', waitingUsers)
                })

                socket.join(payload._id)
            })
            socket.on('newAssistant', async (payload) => {
                const newAssistant = {
                    assistant: payload,
                    socketID: socket.id
                }
                const isAssistantOn = assistants.find(a => a.assistant._id === payload._id)
                if (isAssistantOn) {

                } else {
                    assistants.push(newAssistant)
                }

                socket.join(payload._id)
                socket.emit('waitingUsers', waitingUsers)
            })
            socket.on('openRoomWithUser', async (payload) => {
                const userID = payload.user._id
                const { user, assistant } = payload
                waitingUsers = waitingUsers.filter(u => u._id !== userID)
                const roomID = await isExistentRoom(userID, assistant._id)
                if (roomID) {
                    console.log(roomID)
                    socket.join(roomID)
                    socket.emit("onUserChat", {user, roomID})
                    socket.to(userID).emit('joinChat', roomID)
                } else {
                    const roomID = await saveRoom(userID, assistant._id)
                    socket.join(roomID)
                    socket.emit("onUserChat", {user, roomID})
                    socket.to(userID).emit('joinChat', roomID)
                }
            })
            socket.on('joinSupportAssistant', payload=>{
       
                socket.join(payload)
            })
            socket.on('newMessage', async (payload) => {
                console.log('=============== new Message ===============')
                const { roomID } = payload
                const { message } = payload
                const newMessage = await saveMessage(message, roomID)
                
                console.log('-------------------------------------')
              
                // save message to the DB
                // message can have multiples files
                socket.emit('recipientMessage', newMessage)
                socket.to(roomID).emit('recipientMessage', newMessage)
                // EMIT to the assistant the user message
                // EMIT to the user that the assistant has received a message
            })

            socket.on('forceUserDisconnect', () => {
                dcUser(waitingUsers, socket)
                socket.emit('updateWaitingUser', waitingUsers)
                console.log(waitingUsers.length,  'number of waiting users after forceDC')

            })
            socket.on("disconnect", () => {
                dcUser(waitingUsers, socket)
                socket.emit('updateWaitingUser', waitingUsers)
                console.log(waitingUsers.length, 'number of user after disconnect')
            })
        })
    } catch (error) {
        console.log(error)
    }
}