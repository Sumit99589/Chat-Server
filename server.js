const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const port = 3000;

app.use(express.json());
app.use(cors());

const controlRooms = require("./routes/rooms")

app.use("/rooms", controlRooms)


app.get("/", (req,res)=>{
    res.send("Home page")
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
}); 