const { Schema,mongoose } = require("mongoose")
const moment = require("moment")

const topicSchema = Schema({

    topic: { type: String, required: true, trim: true, maxLength :20 },

    description: { type: String, required: true, trim: true, unique: true ,maxLength :100},

    date: { type: String, default: moment().format('LLLL') }

})

module.exports =mongoose.model("Topic",topicSchema) //topics