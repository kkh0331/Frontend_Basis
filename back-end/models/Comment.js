const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    body: {
        type : String,
        required : true
    },
    Campaign: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Campaign",
        required : true
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
        ref : "Comment",
        default : null
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
},{
    toJSON: { virtuals: true },
    toObject: {virtuals: true}
})

CommentSchema.virtual('commentReplys', {
    ref : "Comment",
    localField : '_id',
    foreignField : "parentComment"
})

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = {Comment};