const bcrypt = require("bcrypt");

/**
 * @param  {String}  [password]
 * @param  {String}  [original]
 * @return {Boolean}
 */
const isValidPassword = async (password, original) => {
    const isValid = await bcrypt.compare(password, original);
    return isValid;
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
