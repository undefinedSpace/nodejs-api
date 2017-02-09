const requireDirectory = require('require-directory');

module.exports = requireDirectory(module, {rename: name => name.replace('.handler','')});