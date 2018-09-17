import Comment from "Models/comment";
import { generateComment, generateComments } from "../src/commentMapper";

describe("mapper", () => {
    let json;
    let jsonComment;
    let jsonComment2;
    let file;
    beforeEach(() => {
        jsonComment = chance.jsonComment();
        jsonComment2 = chance.jsonComment();
        json = {
            data: jsonComment
        };
        file = {
            data: {
                children: [json]
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
        jsonComment.replies = {
            data: {
                children: [
                    {
                        data: jsonComment2
                    }
                ]
            }
        };
        const comments = generateComments(file);
        const expectedComments = [
            new Comment(jsonComment),
            new Comment(jsonComment2)
        ];
        expect(comments).to.eql(expectedComments);
    });
});
