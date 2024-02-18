import React, { useEffect, useState } from 'react'
import { fetchCampaignList } from '~/lib/apis/campaign';

export default function CampaignListPage() {
  const [campaignList, setCampaignList] = useState([]);

  useEffect(()=>{
    fetchCampaignList().then(campaigns => {
        console.log(campaigns);
        setCampaignList(campaigns);
    }).catch(err => {
        console.log(err);
    })
  },[])

  return (
    <div style={{padding:"5px"}}>
        <h1>Campaign List</h1>
    </div>
  )
}
