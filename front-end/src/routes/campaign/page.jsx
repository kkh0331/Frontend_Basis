import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, CardImg, CardSubtitle, CardText, CardTitle, Col, Container, Row } from 'react-bootstrap';
import { fetchCampaignList } from '~/lib/apis/campaign';

export default function CampaignListPage() {
  const [campaignList, setCampaignList] = useState([]);

  useEffect(()=>{
    fetchCampaignList().then(campaigns => {
        setCampaignList(campaigns);
    }).catch(err => {
        console.log(err);
    })
  },[])

  return (
    <div style={{padding:"20px"}}>
      <h1 style={{marginBottom:"30px"}}>Campaign List</h1>
      <Container fluid>
        <Row lg={4} md={3} sm={2}>
          {
            campaignList.map(campaign => (
              <Card key={campaign._id} style={{border:"none"}}>
                <CardImg variant='top' src={campaign.photoUrl}></CardImg>
                <CardBody>
                  <CardTitle style={{marginBottom:"20px"}}>{campaign.title}</CardTitle>
                  <CardSubtitle style={{marginBottom:"20px", color:"gray"}}><small>{campaign.nickName}</small></CardSubtitle>
                  <CardText>{campaign.coreMessage}</CardText>
                </CardBody>
              </Card>
            ))
          }
        </Row>
      </Container>
    </div>
  )
}
