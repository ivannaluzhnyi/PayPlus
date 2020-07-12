const bcrypt = require("bcrypt");

/**
 * @param  {String}  [password]
 * @param  {String}  [original]
 */
const isValidPassword = async (password, original) => {
    return await bcrypt.compare(password, original);
};

/**
 *
 * @param {String} password
 * @return {String}
 */
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const passwordhash = await bcrypt.hash(password, salt);

    return passwordhash;
};

module.exports = {
    isValidPassword,
    hashPassword,
};
