import Comment from "Models/comment";
describe("comment mode", () => {
    it("should map fields", () => {
        const data = {
            body: chance.string(),
            author: chance.name(),
            id: chance.integer()
        };
        const expectedComment = new Comment(data);
        expect(expectedComment.author).to.eql(data.author);
        expect(expectedComment.content).to.eql(data.body);
        expect(expectedComment.id).to.eql(data.id);
    });
});
