rooms = {}

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

async function createRoom(req, res){
    const {name, isPrivate, password} = req.body;

    const roomId = uuidv4();

    const room = {
        id : roomId,
        name : name,
        isPrivate : isPrivate || false,
        password : null
    }

    if (isPrivate){
        if (password != null){
        const hash =await bcrypt.hash(password, 10);
        room.password = hash
    }else {
        res.status(400).json({error: "Password required."})
    }
    }

    rooms[roomId] = room;
    
    console.log(rooms)

    res.status(201).json({
        id: room.id,
        name: room.name,
        isPrivate: room.isPrivate,
        password: room.password
  });
}

function getRoomById(id){
    return rooms[id] || null;
}

function joinRoom(req, res) {
    const { id } = req.params;
    const room = getRoomById(id);

    if (!room) {
        return res.status(404).json({ error: 'Room not found' });
    }

    res.json({ room });
}


module.exports = { createRoom, joinRoom };
