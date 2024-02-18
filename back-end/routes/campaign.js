var express = require('express');
const { Campaign } = require('../models/Campain');
const { Comment } = require('../models/Comment');
const { convertToTrees } = require('../utils/convertToTrees');
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
      Comment.find({Campaign:campaignId, isDeleted:false}).sort({"whenCreated":1})
    ])
    .then(([campaign, comments]) => {
      const commentTrees = convertToTrees(comments, '_id', 'parentComment', 'commentReplys')
      return res.json({campaign, comments:commentTrees});
    })
    .catch((err) => {
      return res.json(err);
    })
})

// 해당 Campagin에 대한 댓글을 임의로 달 수 있도록 할 것
// 댓글 본문과 유저닉네임, 대댓글 깊이는 필수로 입력
router.post('/:campaignId/comment', function(req, res, next){
  console.log("댓글 추가")
  const {campaignId} = req.params;
  const {body, userNickname, commentType} = req.body;
  const inputData = {
    body : body,
    Campaign : campaignId,
    commentType : commentType || null,
    userNickname : userNickname,
    depth : 0
  }
  Comment.create(inputData).then(data => {
    res.json(data)
  }).catch(err => {
    res.send(err);
  })
})

router.post('/:campaignId/comment/:commentId', async function(req, res, next){
  const {campaignId, commentId} = req.params;
  const {body, userNickname, commentType} = req.body;
  const parentCommentDepth = await Comment.findById(commentId).then(data => {
    console.log(data);
    return data.depth
  }).catch(err => res.send(err))
  const inputData = {
    body : body,
    Campaign : campaignId,
    commentType : commentType || null,
    userNickname : userNickname,
    depth : parentCommentDepth+1,
    parentComment : commentId
  }
  Comment.create(inputData).then(data => {
    res.json(data)
  }).catch(err => {
    res.send(err);
  })
})


module.exports = router;