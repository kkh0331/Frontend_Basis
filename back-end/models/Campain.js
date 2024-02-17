const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema({
    campaignId : {
        type : Number,
        required : true,
        unique : true
    },
    categoryName : String,
    title : {
        type : String,
        required : true
    },
    totalBackedAmount : {
        type : Number,
        default : 0
    },
    photoUrl : String,
    nickName : {
        type : String,
        required : true
    },
    coreMessage : String,
    whenOpen : {
        type : Date,
        default : Date.now()
    },
    achievementRate : {
        type : Number,
        default : 0
    }
})

const Campaign = mongoose.model("Campaign", CampaignSchema);

module.exports = {Campaign};