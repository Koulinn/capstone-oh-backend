import UserModel from '../../db/Schemas/User.js'
import RoomModel from '../../db/Schemas/Rooms.js'
import AssistantModel from '../../db/Schemas/Assistant.js'


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
    console.log(savedRoom._id)
  
    await UserModel.findByIdAndUpdate(userID, {$push:{rooms: savedRoom._id}})
    await AssistantModel.findByIdAndUpdate(assistantID, {$push:{rooms: savedRoom._id}})
    return savedRoom._id
}

const isExistentRoom = async(userID, assistantID)=>{
    const existentRoom = await RoomModel.findOne({UserID:userID, AssistantID:assistantID })
    if(existentRoom){
        return existentRoom._id
    } else{
        return false
    }
}

const socketHandlers = {
    newUserConnection: newUserConnection,
    dcUser: dcUser,
    saveRoom:saveRoom,
    isExistentRoom:isExistentRoom
}

export default socketHandlers