const rooms = new Map()
const express = require('express');
const router = express.Router()

router.get("/joinRoom/:name", getRoom)
router.post("/createRoom", createRoom)

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

    rooms.set(name,room)
    
    console.log(rooms)

    res.status(201).json({
        "Value" : rooms.get(name)
  });
}

function getRoom(req, res) {
    const { name } = req.params;
    const room = rooms.get(name);

    if (!room) {
        return res.status(404).json({ error: "Room not found" });
    }

    res.json(room);
}


module.exports = router;
