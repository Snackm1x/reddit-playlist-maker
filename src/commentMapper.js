import Comment from "./models/comment";

export const generateComments = json => {
    return json.data.children.map(generateComment);
};

export const generateComment = json => {
    if (!json.data.body) return;
    if (json.data.replies) {
        json.data.replies.data.children.map(generateComment);
    }
    return new Comment(json.data);
};
