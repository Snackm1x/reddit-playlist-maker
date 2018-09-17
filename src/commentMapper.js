import { flattenDeep } from "lodash";
import Comment from "./models/comment";

export const generateComments = json => {
    const comments = json.data.children.map(generateComment);
    return flattenDeep(comments);
};

export const generateComment = json => {
    if (!json.data.body) return;
    if (json.data.replies) {
        return generateReplies(json.data);
    }
    return new Comment(json.data);
};

const generateReplies = data => {
    const comments = [];
    comments.push(new Comment(data));
    data.replies.data.children.map(reply => {
        const childComment = generateComment(reply);
        comments.push(childComment);
    });
    return comments;
};
