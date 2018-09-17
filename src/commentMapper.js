import Comment from "./models/comment";

export const generateComments = json => {
    const comments =  json.data.children.map(generateComment);
    return comments[0]; //Need to remove this extra array wrapping in a pretty way
};

export const generateComment = json => {
    const comments = [];
    if (!json.data.body) return;
    if (json.data.replies) {
        comments.push(new Comment(json.data));
        json.data.replies.data.children.map(reply => {
            const childComment = generateComment(reply);
            comments.push(childComment);
        });ß
        return comments;
    }
    return new Comment(json.data);
};
