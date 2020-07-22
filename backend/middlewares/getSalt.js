const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);

module.exports = salt;