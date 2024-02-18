var express = require('express');
const { Campaign } = require('../models/Campain');
const { Comment } = require('../models/Comment');
var router = express.Router();

//Campagin에 대한 리스트를 조회할 것
router.get('/campaign', function(req, res, next) {
  Campaign.find({}).then(campaigns => {
    res.json(campaigns);
  }).catch(err => {
    res.send(err);
  })
});

//Campagin 한 개에 대한 데이터와 댓글 전부를 함께 조회할 것
router.get('/:campaignId', function(req, res, next) {
    const {campaignId} = req.params
    Promise.all([
      Campaign.findById(campaignId),
      Comment.find({Campaign:campaignId}).sort({"whenCreated":1})
    ])
    .then(([campaign, comments]) => {
      return res.json({campaign, comments});
    })
    .catch((err) => {
      return res.json(err);
    })
})

module.exports = router;