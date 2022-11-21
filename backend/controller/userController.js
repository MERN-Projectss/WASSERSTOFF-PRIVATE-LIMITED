const userModel = require("../models/userModel")

const { isValidName, isValidValue } = require("../validators/validators")

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const regUser = async (req, res,next) => {

    try {

        const userName = req.body.userName


        //================================================userName VALIDATION====================================================================================

        if (!userName) {

            return res.status(400).send({ status: false, message: "Provde userName field" })
        }
        

        //================================================PRICE VALIDATION====================================================================================


        if (!isValidValue(userName)) {

            return res.status(400).send({ status: false, message: "Provide userName field" })
        }

        //================================================UNIQUE name VALIDATION====================================================================================

        const isuserNamePresent = await userModel.findOne({ userName: userName });
        console.log(isuserNamePresent.topicList)

        if (isuserNamePresent) {
     
            return res.status(302).send({status : true, topicList :isuserNamePresent.topicList})
        }
        
        //================================================CREATE DATA====================================================================================


        const createUser = await userModel.create({userName:userName})

        return res.status(201).send({
            status: true,
            message: "User registered",
            data: createUser
        })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}




/////////////////////////////////////////////////////getTopicByUser////////////////////////////////////////////////

const getTopicByUser = async (req, res) => {
    try {
        let userName = req.body.userName
        if (!userName || userName.trim().length === 0) {
            return res.status(400).send({ status: false, message: "Please enter User's Name to find user's topic " })
        }
        let findUser = await userModel.findOne({ userName: userName })

        if (!findUser) {
            return res.status(404).send({ status: false, message: `${userName} not found` })
        }

    
            return res.status(200).send({ status: true, message: `${userName} your topics are......`, topics: findUser.topicList })
    
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}




module.exports = { regUser, getTopicByUser }