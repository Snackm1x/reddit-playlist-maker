import Comment from "Models/comment";
import {
    generateComment,
    generateComments
} from "Services/comment-service";

describe("mapper", () => {
    let json;
    let jsonComment;
    let jsonComment2;
    let jsonComment3;
    let file;

    beforeEach(() => {
        jsonComment = chance.jsonComment();
        jsonComment2 = chance.jsonComment();
        jsonComment3 = chance.jsonComment();
        json = {
            data: jsonComment
        };
        file = {
            data: {
                children: [json, { data: { notBody: "derp" } }]
            }
        };
    });

    it("should map json to a comment", () => {
        const comment = generateComment(json);
        const expectedComment = new Comment(json.data);
        expect(comment).to.eql(expectedComment);
    });

    it("should not build a comment if no body exists", () => {
        json.data.body = undefined;
        const comment = generateComment(json);
        expect(comment).to.eql(undefined);
    });

    it("should build a comment for each child and parent", () => {
        addCommentAsReply(jsonComment, jsonComment2);
        addCommentAsReply(jsonComment2, jsonComment3);

        const comments = generateComments(file.data.children);
        const expectedComments = [
            new Comment(jsonComment),
            new Comment(jsonComment2),
            new Comment(jsonComment3)
        ];
        expect(comments).to.eql(expectedComments);
    });

    function addCommentAsReply(comment, reply) {
        comment.replies = {
            data: {
                children: [
                    {
                        data: reply
                    }
                ]
            }
        };
    }
});
