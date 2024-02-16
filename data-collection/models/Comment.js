const { Campaign } = require("./Campaign");
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    body: {
        type : String,
        required : true
    },
    Campaign: {
        type : mongoose.Schema.Types.ObjectId,
        ref : Campaign
    },
    commentType : String,
    userNickname : {
        type : String,
        required : true
    },
    whenCreated : Date,
    depth : {
        type : Number,
        required : true
    },
    parentComment : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
})

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = {Comment};