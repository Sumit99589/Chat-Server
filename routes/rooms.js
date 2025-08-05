const express = require('express');
const router = express.Router()


const {createRoom, joinRoom} = require("../controllers/controllers")

router.post("/createRoom", createRoom);
router.post("/joinRoom/:id", joinRoom);

module.exports = router;
