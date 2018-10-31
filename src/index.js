import { loadPostComments } from "./utilities/fileLoader";
import { generateComments } from "./commentMapper";
import { generateTracks } from "./trackMapper";
import fs from "fs";

const run = () => {
    const jsonComments = loadPostComments();
    const comments = generateComments(jsonComments);
    fs.writeFileSync("./data/comments.json", JSON.stringify(comments));
    const tracks = generateTracks(comments);
    fs.writeFileSync("./data/tracks.json", JSON.stringify(tracks));
    
};

run();
