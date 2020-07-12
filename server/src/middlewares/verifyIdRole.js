const { ROLE } = require("../lib/constants");

const verifyIdRole = (req, res, next) => {
    console.log("req.user => ", req.user);
    if (
        String(req.user.id) === String(req.params.id) ||
        req.user.role === ROLE.ADMIN
    ) {
        next();
    } else {
        return res.status(401).json({
            error: "Not allowed",
        });
    }
};

module.exports = verifyIdRole;
