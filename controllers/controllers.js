rooms = []

function createRoom(req, res){
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
        const hash = bcrypt.hash(password, 10);
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
    for (const room of rooms){
        if(room[id] == id){
            return room
        }
    }
    return "No such room exists."
}

async function joinRoom(req, res){
    const {id} = req.params.id
    const room = getRoomById(id)
    console.log(room)
    res.json()
}