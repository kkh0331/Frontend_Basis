const fs = require("fs");
const { Campaign } = require("./models/Campaign");
const { Comment } = require("./models/Comment");

function changeCommentFormat(comment, campaignMongoId, parentCommentId = null) {
    const changeComment = {
        body: comment.body,
        Campaign: campaignMongoId,
        commentType: comment.commentType,
        userNickname: comment.nickName,
        whenCreated: comment.whenCreated,
        depth: comment.depth,
        parentComment: parentCommentId,
        isDeleted : comment.del
    }
    return changeComment;
}

function saveComment(comment, campaignMongoId, parentCommentId = null) {
    const changeComment = changeCommentFormat(comment, campaignMongoId, parentCommentId)
    Comment.create(changeComment).then(savedComment => {
        if (comment.commentReplys.length === 0) {
            return
        } else {
            // 대댓글
            comment.commentReplys.map(commentReply => {
                saveComment(commentReply, campaignMongoId, savedComment._id);
            })
        }
    }).catch(err => {
        return;
    })
}

function fetchCommentData() {
    const commentFile = fs.readFileSync("data-collection/data/comment.json");
    const commentData = JSON.parse(commentFile); //commentData가 저장된 형태는 [[campaign에 대한 댓글], [campaign에 대한 댓글], [campaign에 대한 댓글], ~~]
    commentData.map(campaignComments => { //[campaign에 대한 댓글]
        Campaign.findOne({ campaignId: campaignComments[0]?.commonId }).then(campaign => {
            const campaignMongoId = campaign._id
            campaignComments.map(comment => { //댓글
                saveComment(comment, campaignMongoId)
            })
        }).catch(err => {
            return; // 댓글이 0인 경우
        });
    })
}

fetchCommentData();