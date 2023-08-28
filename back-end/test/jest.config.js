const { TextEncoder, TextDecoder } = require("util");
Object.assign(global, { TextDecoder, TextEncoder });

module.exports = {
  testTimeout: 50000,
};
