import Chance from "chance";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import dirtyChai from "dirty-chai";

chai.use(sinonChai);
chai.use(dirtyChai);

global.stub = sinon.stub;
global.sandbox = sinon.createSandbox();
global.chance = new Chance();
global.expect = chai.expect;

chance.mixin({
    jsonComment: function() {
        return {
            body: chance.string(),
            author: chance.name(),
            id: chance.integer()
        };
    }
});

process.on("unhandledRejection", e => {
    /* eslint-disable */
    console.log("unhandled rejection", e);

    if (!process.env.WATCHING) {
        process.exit(1);
    }
    /* eslint-enable */
});
