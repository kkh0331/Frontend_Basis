require("dotenv").config();
const {MONGO_HOST} = process.env;

const mongoose = require("mongoose");

mongoose.connect(MONGO_HOST, {
    retryWrites:true,
    w: "majority"
}).then(res => {
    console.log("DB 연결 성공")
}).catch(err=>{})

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
    totalBackedAmount : Number,
    photoUrl : String,
    nickName : String,
    coreMessage : String,
    whenOpen : Date,
    achievementRate : Number
})

const Campaign = mongoose.model("Campaign", CampaignSchema);

module.exports = {Campaign};