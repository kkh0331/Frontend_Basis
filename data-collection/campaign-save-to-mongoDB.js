const fs = require("fs");
const { Campaign } = require("./models/Campaign");

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

const campaignData = fetchCampaignData();

Campaign.insertMany(campaignData).then(data => {
    console.log(data);
    console.log(`${data.length}개 데이터 저장 성공`);
})