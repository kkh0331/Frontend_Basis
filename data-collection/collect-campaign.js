require("dotenv").config();
const {CAMPAIGN_URL} = process.env;

const axios = require('axios');
const fs = require('fs');

async function fetchCampaignData() {
    const data = {
        startNum: 0, 
        order: "support", 
        limit: 50, 
        categoryCode: "", 
        endYn: ""
    }
    const response = await axios.post(CAMPAIGN_URL, data);
    const resData = response.data.data.list;
    const writeJsonFilePath = "data-collection/data/campaign.json"
    fs.writeFileSync(writeJsonFilePath, JSON.stringify(resData))
}

fetchCampaignData();