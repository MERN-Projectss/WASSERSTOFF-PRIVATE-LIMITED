const topicModel = require("../models/topicModel")
const userModel = require("../models/userModel")

const { isValidName, isValidValue } = require("../validators/validators")



//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const addTopic = async (req, res) => {

    try {

        const data = req.body,
        {userName,topic ,description} = data

        
        //================================================userName VALIDATION====================================================================================

        if (!userName) {

            return res.status(400).send({ status: false, message: "Provde userName field" })
        }
        

        //================================================PRICE VALIDATION====================================================================================


        if (!isValidValue(userName)) {

            return res.status(400).send({ status: false, message: "User Name is not Valid" })
        }


        //================================================topic VALIDATION====================================================================================

        if (!topic) {

            return res.status(400).send({ status: false, message: "Provde topic field" })
        }
        

        //================================================PRICE VALIDATION====================================================================================


        if (!isValidValue(topic)) {

            return res.status(400).send({ status: false, message: "topic field field can't be empoty" })
        }



        //================================================topic VALIDATION====================================================================================

        if (!description) {

            return res.status(400).send({ status: false, message: "Provde description field" })
        }
        

        //================================================discription VALIDATION====================================================================================


        if (!isValidValue(description)) {

            return res.status(400).send({ status: false, message: "Description field can't be empoty" })
        }

        //================================================UNIQUE name VALIDATION====================================================================================

        const isuserNamePresent = await userModel.findOne({ userName: userName });
        console.log(isuserNamePresent.topicList.length)

        if (!isuserNamePresent) {
     
            return res.status(404).send({status : false, message :"go to home page and create user"})
        }
        


        //================================================UNIQUE name VALIDATION====================================================================================

        for(let i=0;i<isuserNamePresent.topicList.length;i++){

        if (isuserNamePresent.topicList.includes(isuserNamePresent.topicList[i])) {

          return  res.status(403).send({ status: false, message: `This topic ${topic} , is already exists in your list` })

        }
    }

        //================================================CREATE DATA====================================================================================


        // const addedTopic = await topicModel.create(data)


        const updateTopic =await userModel.findByIdAndUpdate({_id:isuserNamePresent._id},{$push:{topicList :{topic :topic , description : description}}})
        //console.log(addedTopic)

        return res.status(201).send({
            status: true,
            message: "Topic Added",
            data: updateTopic
        })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = {addTopic}