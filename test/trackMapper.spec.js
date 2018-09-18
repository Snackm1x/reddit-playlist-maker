import Track from "Models/track";
import Comment from "Models/comment";
import { generateTrack, generateTracks } from "../src/trackMapper";

describe("trackMapper", () => {
    let title;
    let artist;
    let expectedTrack;
    beforeEach(() => {
        title = "It's all over your face";
        artist = "Cazwell";
        expectedTrack = new Track({
            title,
            artist
        });
    });
    it("should create a track given a comment with hyphen", () => {
        const content = `${title} - ${artist}`;
        const comment = createComment(content);
        const track = generateTrack(comment);
        expect(track).to.eql(expectedTrack);
    });

    it("should create a track given comment with by keyword", () => {
        const content = `${title} by ${artist}`;
        const comment = createComment(content);
        const track = generateTrack(comment);
        expect(track).to.eql(expectedTrack);
    });

    it("should create a track given comment with hyperlink", () => {
        const content = `[${title} - ${artist}](${chance.url()})`;
        const comment = createComment(content);
        const track = generateTrack(comment);
        expect(track).to.eql(expectedTrack);
    });

    it("should create a track if song is in middle of sentence with punctuation", () => {
        const content = `My current favourite is "${title} - ${artist}" because this song rocks!`;
        const comment = createComment(content);
        const track = generateTrack(comment);
        expect(track).to.eql(expectedTrack);
    });

    it("should not create duplicate tracks", () => {
        const hyphenContent = `${title} - ${artist}`;
        const hyphenComment = createComment(hyphenContent);
        const byContent = `${title} by ${artist}`;
        const byComment = createComment(byContent);
        const comments = [hyphenComment, byComment];
        const tracks = generateTracks(comments);
        expect(tracks).to.eql([expectedTrack]);
    });

    it("should not create a track if no expression found", () => {
        const content = `I'm having a conversation but I'm not listing a song`;
        const comment = createComment(content);
        const track = generateTrack(comment);
        expect(track).to.eql(undefined);
    });

    it("should not checkForDuplicates if track was not created", () => {
        const content = "la la la";
        const comment = createComment(content);
        const tracks = generateTracks([comment]);
        expect(tracks).to.eql([]);
    });

    const createComment = content => {
        return new Comment({
            body: content,
            author: chance.name(),
            id: chance.integer()
        });
    };
});
