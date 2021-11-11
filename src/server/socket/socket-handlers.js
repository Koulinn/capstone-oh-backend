import UserModel from '../../db/Schemas/User.js'
import RoomModel from '../../db/Schemas/Rooms.js'
import AssistantModel from '../../db/Schemas/Assistant.js'
import MessageModel from '../../db/Schemas/Message.js'


const newUserConnection = async (payload, waitingList, socketID) => {
    
    const newUser = {
        user: payload,
        isWaiting: true,
        socketID: socketID
    }
    const isUserAlreadyWaiting = waitingList.find(u => payload._id === u.user._id)
    if (isUserAlreadyWaiting) {

    } else {

        waitingList.push(newUser)
    }
}

const dcUser = (waitingUsers, socket) => waitingUsers = waitingUsers.filter(onlineUser => onlineUser.socketID !== socket.id)

const saveRoom = async(userID, assistantID)=>{
    const newRoom = {
        UserID: userID,
        AssistantID: assistantID,
    }
    const newRoomModel = new RoomModel(newRoom)
    const savedRoom = await newRoomModel.save()
  
    await UserModel.findByIdAndUpdate(userID, {$push:{rooms: savedRoom._id}})
    await AssistantModel.findByIdAndUpdate(assistantID, {$push:{rooms: savedRoom._id}})
    return savedRoom._id
}

const isExistentRoom = async(userID, assistantID)=>{
    const existentRoom = await RoomModel.findOne({UserID:userID, AssistantID:assistantID })
    if(existentRoom){
        return userID.toString()
    } else{
        return false
    }
}

const saveMessage = async (message, roomID) => { 
        const aux ={
            ...message,
            roomID
        }
        const newMessage = new MessageModel(aux)
        const savedMessage = await newMessage.save()
        await RoomModel.findOneAndUpdate({UserID :roomID}, {$push:{chatHistory:savedMessage._id}}, {new: true})
        return savedMessage
   
}

const socketHandlers = {
    newUserConnection: newUserConnection,
    dcUser: dcUser,
    saveRoom:saveRoom,
    isExistentRoom:isExistentRoom,
    saveMessage:saveMessage
}

export default socketHandlers