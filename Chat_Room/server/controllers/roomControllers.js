const Room = require('../models/userRooms');
const { v4 : uuidv4 } = require('uuid');
const User = require('../models/user.model');


// create a new Room
const createRoom = async(req, res) => {
    try{
        const { roomName, isPrivate, members } = req.body;

        if(!roomName){
            return res.status(400).json({ error: "Room name is required"});
        }

        const Roomexists = await Room.findOne({ roomName});
        if(Roomexists){
            return res.status(409).json({ error: "Room already taken"})
        }

        const newRoom = new Room({
            roomId: uuidv4(),
            roomName,
            isPrivate: isPrivate || false,
            members: members || []
        });

        await newRoom.save();
        res.status(200).json({messge: "Room created successfully", room: newRoom });
    } catch(error){
        res.status(500).json({error: "server error"})
    }
}

// Join A room
const joinRoom = async(req, res) =>{
    const { roomId, userId } = req.body;

    try{
        const room = await Room.findOne({roomId});

        if(!room){
            return res.status(404).json({error: "Room not found"});
        }

        if(room.members.includes(userId)){
            return res.status(400).json({
                error: "User is in the room already find another one"
            })

        // add new user to the members array
        room.members.push(userId);
        await room.save();
        } catch(error){
            
        }
    }
}

module.exports = { createRoom }