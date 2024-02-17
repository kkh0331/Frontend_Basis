var express = require('express');
const { Campaign } = require('../models/Campain');
var router = express.Router();

//Campagin에 대한 리스트를 조회할 것
router.get('/campaign', function(req, res, next) {
  Campaign.find({}).then(campaigns => {
    res.json(campaigns);
  }).catch(err => {
    res.send(err);
  })
});

module.exports = router;