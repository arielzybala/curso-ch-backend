const { cpus } = require("node:os");

module.exports = {
  ArgumentsInput: process.argv,
  NamePlatform: process.platform,
  VersionNodeJS: process.version,
  TotalReservedMemory: process.memoryUsage().rss,
  PathExecution: process.execPath,
  ProcessID: process.pid,
  ProjectFolder: process.cwd(),
  NumberCPUs: cpus().length,
  }