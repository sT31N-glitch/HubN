// Variables storing data for all posts/messages
let mAuthor = [];
let mCode = [];
let mSummary = [];

// Store data for a post/message
function Push(author, code, summary) {
    mAuthor.push(author);
    mCode.push(code);
    mSummary.push(summary);
}

// Get data on all posts/messages
function GetMessages(){
    return [mAuthor, mCode, mSummary];
}

// Export functions to module
module.exports.Push = Push;
module.exports.GetMessages = GetMessages;