import Track from "./models/track";

export const generateTracks = comments => {
    const tracks = [];
    comments.map(comment => {
        const track = generateTrack(comment);
        if (!checkForDuplicates(track, tracks)) {
            tracks.push(track);
        }
    });
    return tracks;
};

export const generateTrack = comment => {
    const { content } = comment;
    let match = hyphenRegEx.exec(content);
    if (!match) {
        match = byRegEx.exec(content);
        if (!match) return;
        const split = match[0].split("by");
        return createTrack(split);
    }
    const split = match[0].split("-");
    return createTrack(split);
};

const createTrack = split => {
    return new Track({ title: split[0].trim(), artist: split[1].trim() });
};

const checkForDuplicates = (track, trackList) => {
    const found = trackList.filter(
        t => t.title == track.title && t.artist == track.artist
    );
    return found.length > 0;
};

const hyphenRegEx = new RegExp(
    `[A-Z | a-z | s | ' | 0-9]*-[A-Z | a-z | s | ' | 0-9]*`
);
const byRegEx = new RegExp(
    `[A-Z | a-z | s | ' | 0-9]*by[A-Z | a-z | s | ' | 0-9]*`
);
