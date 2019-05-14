const { assert } = require("chai");
const CommandRunner = require("../commandrunner");
const MemoryLogger = require("../memorylogger");
const tmp = require("tmp");
const fse = require("fs-extra");
const path = require("path");

describe("truffle deploy (alias for migrate)", () => {
  let config, sourcePath;
  const logger = new MemoryLogger();

  beforeEach("set up config for logger", () => {
    tempDir = tmp.dirSync({ unsafeCleanup: true });
    sourcePath = path.join(__dirname, "../../sources/migrations/init");
    fse.copySync(sourcePath, tempDir.name);
    config = { working_directory: tempDir.name };
    config.logger = logger;
  });

  afterEach("clear working_directory", () => {
    tempDir.removeCallback();
  });

  describe("when run on the most basic truffle project", () => {
    it("doesn't throw", done => {
      CommandRunner.run("deploy", config, error => {
        console.log(error);
        assert(error === undefined, "error should be undefined here");
        done();
      });
    }).timeout(20000);
  });
});
