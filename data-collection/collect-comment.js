const axios = require("axios");
const fs = require("fs");

require("dotenv").config();
const {COMMENT_BASE_URL} = process.env;

const pageNo = 0;
const size = 40;

async function fetchCommentData(campaignId){
    const commentUrl = `${COMMENT_BASE_URL}/${campaignId}?page=${pageNo}&size=${size}&commentGroupType=CAMPAIGN&rewardCommentType=`
    const response = await axios.get(commentUrl);
    const resData = response.data.data.content;
    return resData;
}

async function fetchCommentsData(){
    const campaignFile = fs.readFileSync("data-collection/data/campaign.json");
    const campaignData = JSON.parse(campaignFile);
    const commentList = Promise.all(campaignData.map(async campaign => {
        const commentData = await fetchCommentData(campaign.campaignId);
        return commentData;
    }))
    const writeJsonFilePath = "data-collection/data/comment.json"
    fs.writeFileSync(writeJsonFilePath, JSON.stringify(await commentList))
}

fetchCommentsData();