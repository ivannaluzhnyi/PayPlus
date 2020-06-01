const prettifyErrors = (errors) => {
    return errors.reduce((acc, item) => {
        acc[item.path] = [...(acc[item.path] || []), item.message];

        return acc;
    }, {});
};

const isSequelizeError = (name) =>
    name === "SequelizeValidationError" ||
    name === "SequelizeUniqueConstraintError";

module.exports = {
    prettifyErrors,
    isSequelizeError,
};
