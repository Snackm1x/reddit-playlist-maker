import Track from "Models/track";
describe("track model", () => {
    it("should map fields", () => {
        const expectedTrack = {
            title: chance.string(),
            artist: chance.name(),
        };
        const track = new Track(expectedTrack);
        expect(track.artist).to.eql(expectedTrack.artist);
        expect(track.title).to.eql(expectedTrack.title);
    });
});
