const fs = require("fs");
const mongoose = require("mongoose");

require("dotenv").config();
const {MONGO_HOST} = process.env;

function fetchCampaignData(){
    const campaignFile = fs.readFileSync("data-collection/data/campaign.json");
    const campaignData = JSON.parse(campaignFile);
    const campaignList = campaignData.map(campaign => {
        const {campaignId, categoryName, title, totalBackedAmount, photoUrl, nickName, coreMessage, whenOpen, achievementRate} = campaign
        return {
            campaignId:campaignId,
            categoryName:categoryName,
            title:title,
            totalBackedAmount:totalBackedAmount,
            photoUrl:photoUrl,
            nickName:nickName,
            coreMessage:coreMessage,
            whenOpen:whenOpen,
            achievementRate:achievementRate,
        };
    })
    return campaignList;
}

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

const campaignData = fetchCampaignData();

Campaign.insertMany(campaignData).then(data => {
    console.log(data);
    console.log(`${data.length}개 데이터 저장 성공`);
})