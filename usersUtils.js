const RoomModel  = require("./schemas/rooms")


const saveUserInRoom = async ({roomName, username , id} )=>{
    console.log(RoomModel)
    // if (!username || !roomName) {
    //     return {
    //       error: "Username and room are required!",
    //     }
    //   }
    
    try {
        const user = await RoomModel.findOne({
            name: roomName,
            "members.username": username,
            })
        
        if(user){
            await RoomModel.findOneAndUpdate(
                {name: roomName, "members.username": username}, 
                {"members.$.id": id})
        }else{
            await RoomModel.findOneAndUpdate(
                { name: roomName },
                {
                  $addToSet: { members: { username, id } },
                }
              )
        }
        return { username, roomName }
    } catch (error) {
        console.log(error)
        return error
    }
}

// const removeUser = async (id, room) => {
//     try {
//       const foundRoom = await RoomModel.findOne({ name: room })
  
//       const username = foundRoom.members.find((member) => member.id === id)
  
//       await RoomModel.findOneAndUpdate(
//         { name: room },
//         {
//           $pull: { members: { id: id } },
//         }
//       )
  
//       return username
//     } catch (error) {
//       console.log(error)
//     }
//   }
  
  const getUser = async (roomName, id) => {
    try {
      const room = await RoomModel.findOne({ name: roomName })
      const user = room.members.find((member) => member.id === id)
  
      return user
    } catch (error) {
      console.log(error)
    }
  }
  
  const getUsersInRoom = async (roomName) => {
    const room = await RoomModel.findOne({ name: roomName })
    if(room)
        return room.members
    else 
        throw new Error("Cannot find room " + roomName)
  }
  
  module.exports = {
    saveUserInRoom,
    getUser,
    getUsersInRoom
    
   
  }