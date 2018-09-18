import { loadPostComments } from "./utilities/fileLoader";
import { generateComments } from "./commentMapper";
import fs from 'fs';

const run = () => {
    const jsonComments = loadPostComments();
    const comments = generateComments(jsonComments);
    fs.writeFileSync('./comments.json',JSON.stringify(comments));
};

run();
