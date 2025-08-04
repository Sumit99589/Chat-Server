const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const port = 3000;

app.use(express.json());
app.use(cors());

const rooms = {};

app.post("/room",(req, res)=>{
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

})

app.get("/", (req,res)=>{
    res.send("Home page")
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
}); 