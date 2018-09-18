import fs from "fs";

export const loadPostComments = () => {
    const json = loadFileJSON("./data/data.json");
    return getComments(json);
};

const loadFileJSON = fileName => {
    const file = fs.readFileSync(fileName);
    return JSON.parse(file);
};

const getComments = file => {
    return file[1].data.children;
};
