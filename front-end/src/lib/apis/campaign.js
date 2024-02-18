import instance from "./base";

export async function fetchCampaignList(){
    try{
        const data = await instance.get('/campaign');
        return data;
    } catch(err){
        return new Error(err);
    }
}