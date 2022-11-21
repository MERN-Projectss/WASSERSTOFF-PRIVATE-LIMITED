const express = require('express')
const router = express.Router();

const {regUser ,getTopicByUser} = require("../controller/userController")
const {addTopic} = require("../controller/topicController")

router.post("/regUser", regUser)
router.post("/addTopic/", addTopic)

router.get("/getTopicByUser",getTopicByUser)

module.exports = router