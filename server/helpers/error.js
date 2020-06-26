const prettifyErrors = (errors) => {
    return errors.reduce((acc, item) => {
        acc[item.path] = [...(acc[item.path] || []), item.message];

        return acc;
    }, {});
};

const isSequelizeError = (name) =>
    name === "SequelizeValidationError" ||
    name === "SequelizeUniqueConstraintError";

const resCatchError = (res, err) =>
    isSequelizeError(err.name)
        ? res.status(400).json(prettifyErrors(Object.values(err.errors)))
        : res.sendStatus(500);

module.exports = {
    prettifyErrors,
    isSequelizeError,
    resCatchError,
};
