// Variables storing data for all posts
let mAuthor = [];
let mCode = [];
let mSummary = [];

function Push(author, code, summary) {
    mAuthor.push(author);
    mCode.push(code);
    mSummary.push(summary);
}

function GetMessages(){
    return [mAuthor, mCode, mSummary];
}

module.exports.Push = Push;
module.exports.GetMessages = GetMessages;