import fs from "fs";
import { loadPostComments } from "Utilities/fileLoader";

describe("fileLoader", () => {
    it("should parse the json file and return the comments", () => {
        const comments = { test: chance.name() };
        const file = [
            {
                data: {
                    children: { test: chance.name() }
                }
            },
            {
                data: {
                    children: comments
                }
            }
        ];
        const fsStub = stub(fs, "readFileSync");
        stub(JSON, "parse").returns(file);

        const jsonComments = loadPostComments();
        expect(fsStub)
            .calledOnce()
            .calledWith("./data/data.json");
        expect(jsonComments).to.eql(comments);
    });
});
