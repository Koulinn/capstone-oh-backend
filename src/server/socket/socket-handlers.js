const newUserConnection = async(payload, waitingList, socketID)=>{
    const {user} = payload
    const newUser ={
        user,
        isWaiting: true,
        socketID: socketID
    }
    waitingList.push(newUser)
}

const dcUser = (waitingUsers, socket) => waitingUsers = waitingUsers.filter(onlineUser => onlineUser.socketID !== socket.id)


const socketHandlers = {
    newUserConnection:newUserConnection,
    dcUser:dcUser
}

export default socketHandlers