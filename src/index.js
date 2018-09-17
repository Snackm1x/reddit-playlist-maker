import { loadPostComments } from "./utilities/fileLoader";
import { generateComments } from "./commentMapper";

const run = () => {
    const jsonComments = loadPostComments();
    const comments = generateComments(jsonComments);
};

run();
